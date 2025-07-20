"use server";

import { cookies } from "next/headers";

import {
  SignUpFormSchema,
  SignUpFormState,
  SignInFormState,
  SignInFormSchema,
  FrogotPasswordFormState,
  ForgotPasswordFormSchema,
  ResetPasswordFormState,
  ResetPasswordFormSchema,
} from "@/schemas/auth.schema";

export async function signUpAction(prevState: SignUpFormState, formData: FormData) {
  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const validatedFields = SignUpFormSchema.safeParse({
    name,
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      values: {
        name,
        email,
        password,
      },
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    const json: ResponseJSON = await response.json();

    if (!response.ok) {
      return {
        success: false,
        values: {
          name,
          email,
          password,
        },
        message: json.message,
      };
    }

    return {
      success: true,
      values: {
        name,
        email,
        password,
      },
      message: json.message,
    };
  } catch (error) {
    return {
      success: false,
      values: {
        name,
        email,
        password,
      },
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function signInAction(prevState: SignInFormState, formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";
  const validatedFields = SignInFormSchema.safeParse({
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      values: {
        email,
        password,
      },
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(validatedFields.data),
    });

    const json: ResponseJSON = await response.json();

    if (!response.ok) {
      return {
        success: false,
        values: {
          email,
          password,
        },
        message: json.message,
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("token", json.data.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 2 * 60 * 60,
      path: "/",
    });

    cookieStore.set("id", json.data.user.id, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 2 * 60 * 60,
      path: "/",
    });

    return {
      success: true,
      values: {
        email,
        password,
      },
      message: json.message,
    };
  } catch (error) {
    return {
      success: false,
      values: {
        email,
        password,
      },
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function signOutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function forgotPasswordAction(prevState: FrogotPasswordFormState, formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const validatedFields = ForgotPasswordFormSchema.safeParse({
    email,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      values: {
        email,
      },
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    const json: ResponseJSON = await response.json();

    if (!response.ok) {
      return {
        success: false,
        values: {
          email,
        },
        message: json.message,
      };
    }

    return {
      success: true,
      values: {
        email,
      },
      message: json.message,
    };
  } catch (error) {
    return {
      success: false,
      values: {
        email,
      },
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function resetPasswordAction(key: string, prevState: ResetPasswordFormState, formData: FormData) {
  const password = formData.get("password")?.toString() || "";
  const confirmPassword = formData.get("confirmPassword")?.toString() || "";
  const validatedFields = ResetPasswordFormSchema.safeParse({
    password,
    confirmPassword,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      values: {
        password,
        confirmPassword,
      },
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key,
        password: validatedFields.data.password,
      }),
    });
    const json: ResponseJSON = await response.json();

    if (!response.ok) {
      return {
        success: false,
        values: {
          password,
          confirmPassword,
        },
        message: json.message,
      };
    }

    return {
      success: true,
      values: {
        password,
        confirmPassword,
      },
      message: json.message,
    };
  } catch (error) {
    return {
      success: false,
      values: {
        password,
        confirmPassword,
      },
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
