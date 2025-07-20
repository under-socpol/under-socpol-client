import z from "zod";

export const UpdateUserNameFormSchema = z.object({
  name: z.string().min(1, { message: "Name must be at least 1 characters long" }),
});

export type UpdateUserNameFormState =
  | {
      success: boolean;
      values: {
        name: string;
      };
      errors?: {
        name?: string[];
      };
      message?: string;
    }
  | undefined;

export const UpdateUserEmailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type UpdateUserEmailFormState =
  | {
      success: boolean;
      values: {
        email: string;
      };
      errors?: {
        email?: string[];
      };
      message?: string;
    }
  | undefined;

export const UpdateUserPasswordFormSchema = z.object({
  oldPassword: z.string().min(8, { message: "Old Password must be at least 8 characters long" }),
  newPassword: z.string().min(8, { message: "New Password must be at least 8 characters long" }),
});

export type UpdateUserPasswordFormState =
  | {
      success: boolean;
      errors?: {
        oldPassword?: string[];
        newPassword?: string[];
      };
      message?: string;
    }
  | undefined;
