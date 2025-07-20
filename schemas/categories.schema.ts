import z from "zod";

export const CreateCategoryFormSchema = z.object({
  name: z.string().min(1, { message: "Name must be at least 1 characters long" }),
  description: z.string().min(1, { message: "Description must be at least 1 characters long" }),
});

export type CreateCategoryFormState =
  | {
      success: boolean;
      values: {
        name: string;
        description: string;
      };
      errors?: {
        name?: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;

export const UpdateCategoryFormSchema = z.object({
  name: z.string().min(1, { message: "Name must be at least 1 characters long" }),
  description: z.string().min(1, { message: "Description must be at least 1 characters long" }),
});

export type UpdateCategoryFormState =
  | {
      success: boolean;
      values: {
        name: string;
        description: string;
      };
      errors?: {
        name?: string[];
        description?: string[];
      };
      message?: string;
    }
  | undefined;

export type DeleteCategoryFormState =
  | {
      success: boolean;
      message?: string;
    }
  | undefined;
