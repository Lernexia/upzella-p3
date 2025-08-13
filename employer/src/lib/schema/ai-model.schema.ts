import { z } from "zod";

// AI Model providers enum
export const AI_PROVIDERS = [
  "google",
  "openai", 
  "anthropic",
  "cohere",
  "huggingface"
] as const;

export const AIProviderEnum = z.enum(AI_PROVIDERS);

// AI Model configuration schema
export const AIModelConfigSchema = z.object({
  api_key: z.string().optional(),
  model_version: z.string().optional(),
  max_tokens: z.number().positive().optional(),
  temperature: z.number().min(0).max(2).optional(),
  top_p: z.number().min(0).max(1).optional(),
  frequency_penalty: z.number().min(-2).max(2).optional(),
  presence_penalty: z.number().min(-2).max(2).optional(),
  custom_instructions: z.string().optional(),
  parameters: z.record(z.string(), z.unknown()).optional()
});

// Main AI Model schema for database operations
export const AIModelSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  model_name: z.string().min(1, "Model name is required"),
  provider: AIProviderEnum,
  configs: AIModelConfigSchema,
  created_at: z.string().datetime()
});

// Create AI Model schema for new model creation
export const CreateAIModelSchema = z.object({
  user_id: z.string().uuid(),
  model_name: z.string().min(1, "Model name is required").max(100),
  provider: AIProviderEnum,
  configs: AIModelConfigSchema
});

// Update AI Model schema for model updates
export const UpdateAIModelSchema = z.object({
  model_name: z.string().min(1, "Model name is required").max(100).optional(),
  provider: AIProviderEnum.optional(),
  configs: AIModelConfigSchema.optional()
});

// Type exports
export type AIModel = z.infer<typeof AIModelSchema>;
export type CreateAIModel = z.infer<typeof CreateAIModelSchema>;
export type UpdateAIModel = z.infer<typeof UpdateAIModelSchema>;
export type AIModelConfig = z.infer<typeof AIModelConfigSchema>;
export type AIProvider = z.infer<typeof AIProviderEnum>;

// Provider options for form dropdowns
export const AI_PROVIDER_FORM_OPTIONS = AI_PROVIDERS.map(value => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1)
}));

// Common model names by provider
export const COMMON_MODELS = {
  google: ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-pro"],
  openai: ["gpt-4", "gpt-4-turbo", "gpt-3.5-turbo"],
  anthropic: ["claude-3-opus", "claude-3-sonnet", "claude-3-haiku"],
  cohere: ["command", "command-light", "command-nightly"],
  huggingface: ["mistral-7b", "llama-2-7b", "code-llama-7b"]
} as const;
