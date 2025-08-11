import { GoogleGenerativeAI } from "@google/generative-ai";
import { logger } from "../utils/logger";

export interface JobExtractionResult {
  role_name: string;
  title: string;
  description: string;
  skills_required: string[];
  work_type: string[];
  employment_type: string[];
  seniority_level: string[];
  location_details?: {
    location_country?: string;
    location_state?: string;
    location_city?: string;
    location_pin_code?: string;
  };
  salary_details?: {
    salary_currency: 'USD' | 'INR';
    salary_from?: number;
    salary_to?: number;
    salary_period?: 'per hour' | 'per month' | 'per annum';
  };
  experience_details: {
    experience_min: number;
    experience_max: number;
  };
  compensation?: string[];
  resume_threshold?: number;
  resume_score_weightage_details: {
    resume_section: string;
    resume_criteria: string;
    resume_weightage: number;
    reason: string;
  }[];
}

class AIService {
  private genAI: any;
  private model: any;

  constructor() {
    const apiKey = process.env.GOOGLE_AI_API_KEY;
    if (!apiKey) {
      logger.warn(
        "Google AI API key not provided, AI features will fail if called."
      );
      // do not throw here so local dev/test can still run; callers should handle missing key
      return;
    }

    // The actual constructor shape may vary by @google/generative-ai version.
    // This code uses the library's high-level helper. If your installed lib differs,
    // adapt the initialization accordingly.
    this.genAI = new GoogleGenerativeAI(apiKey);
    try {
      this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // adjust if needed
      logger.info("✅ Google Gemini AI service initialized");
    } catch (err) {
      logger.error("Failed to initialize Gemini model", String(err));
      this.model = null;
    }
  }

  async extractJobDetailsFromText(jobDescriptionText: string): Promise<JobExtractionResult> {
    if (!this.model) {
      throw new Error('AI model not initialized. Set GOOGLE_AI_API_KEY and verify @google/generative-ai usage.');
    }
    const prompt = `
You are an AI assistant that extracts structured job information from unstructured job descriptions.

Given the following job description text, extract and return ONLY a valid JSON object with the following structure:

{
  "role_name": "Senior Software Engineer",
  "title": "Senior Software Engineer - Full Stack Development",
  "description": "clean, formatted job description",
  "skills_required": ["React", "Node.js", "JavaScript", "TypeScript"],
  "work_type": ["remote", "hybrid"],
  "employment_type": ["full-time"],
  "seniority_level": ["senior"],
  "location_details": {
    "location_country": "India",
    "location_state": "Karnataka",
    "location_city": "Bangalore",
    "location_pin_code": "560001"
  },
  "salary_details": {
    "salary_currency": "INR",
    "salary_from": 800000,
    "salary_to": 1200000,
    "salary_period": "per annum"
  },
  "experience_details": {
    "experience_min": 2,
    "experience_max": 5
  },
  "compensation": ["Medical Insurance", "Provident Fund", "Performance Bonus"],
  "resume_threshold": 65,
  "resume_score_weightage_details": [
    {
      "resume_section": "Education",
      "resume_criteria": "Bachelor's degree in relevant field is required",
      "resume_weightage": 20,
      "reason": "Educational background validates foundational knowledge"
    },
    {
      "resume_section": "Experience",
      "resume_criteria": "2-5 years relevant work experience in software development",
      "resume_weightage": 40,
      "reason": "Practical experience is most critical for this role"
    },
    {
      "resume_section": "Skills",
      "resume_criteria": "Technical skills matching job requirements like React, Node.js",
      "resume_weightage": 25,
      "reason": "Technical skills directly impact job performance"
    },
    {
      "resume_section": "Projects",
      "resume_criteria": "Relevant portfolio or project experience demonstrating skills",
      "resume_weightage": 15,
      "reason": "Projects show practical application of skills"
    }
  ]
}

Rules:
1. role_name: Specific role title (e.g., "Senior Software Engineer", "Digital Marketing Manager")
2. title: Complete descriptive title combining role and specialization
3. description: Clean, well-formatted job description text
4. work_type: Array from ["remote", "hybrid", "onsite", "all"] -> this is the multiselect options
5. employment_type: Array from ["part-time", "full-time", "contract", "internship", "freelance", "temporary"] -> this is the multiselect options
6. seniority_level: Array from ["entry-level", "fresher", "junior", "senior", "manager", "director", "executive"] -> this is the multiselect options
7. location_details: Object with country, state, city, pin_code (omit if not specified make it empty if not specified)
8. salary_details: Object with currency ("USD" or "INR"), amount range, period, (default -> INR, and if only salary is specified in job description fill the salary from and to and period)
9. experience_details: Object with min/max experience in years (required)
10. compensation: null (no need to specifiy. Make it null)
11. resume_score_weightage_details: Array of objects with section, criteria, weightage, reason -> (auto matically name the resume_section, and criteria and weightage based on the job description and role)
12. resume_section values: ["Education", "Experience", "Projects", "Certifications", "Skills", "Achievements"]
13. resume_weightage must sum to exactly 100
14. skills_required: Specific technical/professional skills
15. experience_min <= experience_max
16. resume_threshold: 60-80 (default 65) -> based on the role and job description

Job Description Text:
${jobDescriptionText}

Return ONLY the JSON object, no additional text or explanations:
`;

   try {
      const response = await this.model.generateContent(prompt);
      // generateContent shape may vary; adjust accordingly
      const text = (await response.response).text();
      logger.info('AI extraction completed', { textLength: jobDescriptionText.length });

      // Extract the first JSON object found in the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }

      let extractedData: JobExtractionResult;
      try {
        extractedData = JSON.parse(jsonMatch[0]);
      } catch (parseErr) {
        logger.error('Failed to parse AI response JSON', String(parseErr));
        throw new Error('AI returned invalid JSON');
      }

      this.validateExtractionResult(extractedData);
      return extractedData;
    } catch (error: any) {
      logger.error('AI extraction failed', { message: error?.message || String(error) });
      throw new Error(`Failed to extract job details: ${error?.message || String(error)}`);
    }
  }

  private validateExtractionResult(data: JobExtractionResult): void {
    if (!data) throw new Error('Empty extraction result');

    const validWorkTypes = ['remote', 'hybrid', 'onsite', 'all'];
    if (!Array.isArray(data.work_type) || data.work_type.some(t => !validWorkTypes.includes(t))) {
      throw new Error('Invalid or missing work_type in AI extraction');
    }

    const validEmploymentTypes = ['part-time', 'full-time', 'contract', 'internship', 'freelance', 'temporary'];
    if (!Array.isArray(data.employment_type) || data.employment_type.some(t => !validEmploymentTypes.includes(t))) {
      throw new Error('Invalid or missing employment_type in AI extraction');
    }

    const validSeniorityLevels = ['entry-level', 'fresher', 'junior', 'senior', 'manager', 'director', 'executive'];
    if (!Array.isArray(data.seniority_level) || data.seniority_level.some(s => !validSeniorityLevels.includes(s))) {
      throw new Error('Invalid or missing seniority_level in AI extraction');
    }

    // Validate salary details if present
    if (data.salary_details) {
      const validCurrencies = ['INR', 'USD'];
      if (!validCurrencies.includes(data.salary_details.salary_currency)) {
        throw new Error('Invalid salary_currency in AI extraction');
      }

      const validSalaryPeriods = ['per annum', 'per month', 'per hour'];
      if (data.salary_details.salary_period && !validSalaryPeriods.includes(data.salary_details.salary_period)) {
        throw new Error('Invalid salary_period in AI extraction');
      }
    }

    // Validate resume scoring
    const validSections = ['Education', 'Experience', 'Projects', 'Certifications', 'Skills', 'Achievements'];
    if (!Array.isArray(data.resume_score_weightage_details)) throw new Error('Missing resume_score_weightage_details');
    
    const invalidSections = data.resume_score_weightage_details.filter(item => !validSections.includes(item.resume_section));
    if (invalidSections.length) {
      throw new Error(`Invalid resume scoring sections: ${invalidSections.map(s => s.resume_section).join(', ')}`);
    }

    const totalWeightage = data.resume_score_weightage_details.reduce((sum, item) => sum + (item.resume_weightage || 0), 0);
    if (totalWeightage !== 100) {
      throw new Error(`Resume scoring weightage must sum to 100, got ${totalWeightage}`);
    }

    // Validate experience details
    if (typeof data.experience_details?.experience_min !== 'number' || typeof data.experience_details?.experience_max !== 'number') {
      throw new Error('Invalid experience_details');
    }

    if (data.experience_details.experience_min > data.experience_details.experience_max) {
      throw new Error('Experience range min cannot be greater than max');
    }
  }
}

export const aiService = new AIService();
