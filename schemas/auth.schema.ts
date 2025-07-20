import z from "zod";

export const SignUpFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export type SignUpFormState =
  | {
      success: boolean;
      values: {
        name: string;
        email: string;
        password: string;
      };
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const SignInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

export type SignInFormState =
  | {
      success: boolean;
      values: {
        email: string;
        password: string;
      };
      errors?: {
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

export type FrogotPasswordFormState =
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

export const ResetPasswordFormSchema = z
  .object({
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormState =
  | {
      success: boolean;
      values: {
        password: string;
        confirmPassword: string;
      };
      errors?: {
        password?: string[];
        confirmPassword?: string[];
      };
      message?: string;
    }
  | undefined;
