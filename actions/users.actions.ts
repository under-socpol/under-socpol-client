"use server";

import {
  UpdateUserNameFormState,
  UpdateUserNameFormSchema,
  UpdateUserEmailFormState,
  UpdateUserEmailFormSchema,
  UpdateUserPasswordFormState,
  UpdateUserPasswordFormSchema,
} from "@/schemas/users.schema";
import { cookies } from "next/headers";

export async function updateCurrentUserNameAction(prevState: UpdateUserNameFormState, formData: FormData) {
  const name = formData.get("name")?.toString() || "";
  const validatedFields = UpdateUserNameFormSchema.safeParse({
    name,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      values: {
        name,
      },
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      success: false,
      values: {
        name,
      },
      message: "Unauthorized. Token is missing",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/name`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
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
        },
        message: json.message,
      };
    }

    return {
      success: true,
      values: {
        name,
      },
      message: json.message,
    };
  } catch (error) {
    return {
      success: false,
      values: {
        name,
      },
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function updateCurrentUserEmailAction(name: string, prevState: UpdateUserEmailFormState, formData: FormData) {
  const email = formData.get("email")?.toString() || "";
  const validatedFields = UpdateUserEmailFormSchema.safeParse({
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

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      success: false,
      values: {
        email,
      },
      message: "Unauthorized. Token is missing",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/email`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email: validatedFields.data.email,
      }),
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

export async function updateCurrentUserPasswordAction(prevState: UpdateUserPasswordFormState, formData: FormData) {
  const oldPassword = formData.get("oldPassword")?.toString() || "";
  const newPassword = formData.get("newPassword")?.toString() || "";
  const validatedFields = UpdateUserPasswordFormSchema.safeParse({
    oldPassword,
    newPassword,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      success: false,
      message: "Unauthorized. Token is missing",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/password`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    const json: ResponseJSON = await response.json();

    if (!response.ok) {
      return {
        success: false,
        values: {
          oldPassword,
          newPassword,
        },
        message: json.message,
      };
    }

    return {
      success: true,
      message: json.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}
