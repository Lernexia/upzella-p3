import { GoogleGenerativeAI } from "@google/generative-ai";
import { logger } from "../utils/logger";

export interface JobExtractionResult {
  job_title: string;
  job_description: string;
  skills_required: string[];
  work_type: string[];
  employment_type: string;
  experience_range: {
    min: number;
    max: number;
  };
  resume_threshold: number;
  resume_scoring: {
    section: string;
    criteria: string;
    weightage: number;
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
  "job_title": "extracted job title",
  "job_description": "clean, formatted job description",
  "skills_required": ["skill1", "skill2", "skill3"],
  "work_type": ["Full-time", "Remote", "Hybrid"],
  "employment_type": "Permanent",
  "experience_range": {
    "min": 2,
    "max": 5
  },
  "resume_threshold": 65,
  "resume_scoring": [
    {
      "section": "Education",
      "criteria": "Bachelor's degree in relevant field",
      "weightage": 20
    },
    {
      "section": "Experience",
      "criteria": "2-5 years relevant work experience",
      "weightage": 40
    },
    {
      "section": "Skills",
      "criteria": "Technical skills matching job requirements",
      "weightage": 25
    },
    {
      "section": "Projects",
      "criteria": "Relevant portfolio or project experience",
      "weightage": 15
    }
  ]
}

Rules:
1. work_type must be from: ["Full-time", "Part-time", "Remote", "Hybrid", "On-site"]
2. employment_type must be from: ["Permanent", "Contract", "Internship", "Freelance"]
3. resume_scoring sections must be from: ["Education", "Experience", "Projects", "Certifications", "Skills", "Achievements"]
4. resume_scoring weightage must sum to exactly 100
5. skills_required should be an array of specific technical/professional skills
6. experience_range min should be <= max
7. resume_threshold should be between 60-80 (default 65)

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

    const validWorkTypes = ['Full-time', 'Part-time', 'Remote', 'Hybrid', 'On-site'];
    if (!Array.isArray(data.work_type) || data.work_type.some(t => !validWorkTypes.includes(t))) {
      throw new Error('Invalid or missing work_type in AI extraction');
    }

    const validEmploymentTypes = ['Permanent', 'Contract', 'Internship', 'Freelance'];
    if (!validEmploymentTypes.includes(data.employment_type)) {
      throw new Error('Invalid employment_type in AI extraction');
    }

    const validSections = ['Education', 'Experience', 'Projects', 'Certifications', 'Skills', 'Achievements'];
    if (!Array.isArray(data.resume_scoring)) throw new Error('Missing resume_scoring');
    const invalidSections = data.resume_scoring.filter(item => !validSections.includes(item.section));
    if (invalidSections.length) {
      throw new Error(`Invalid resume scoring sections: ${invalidSections.map(s => s.section).join(', ')}`);
    }

    const totalWeightage = data.resume_scoring.reduce((s, it) => s + (it.weightage || 0), 0);
    if (totalWeightage !== 100) {
      throw new Error(`Resume scoring weightage must sum to 100, got ${totalWeightage}`);
    }

    if (typeof data.experience_range?.min !== 'number' || typeof data.experience_range?.max !== 'number') {
      throw new Error('Invalid experience_range');
    }

    if (data.experience_range.min > data.experience_range.max) {
      throw new Error('Experience range min cannot be greater than max');
    }
  }
}

export const aiService = new AIService();
