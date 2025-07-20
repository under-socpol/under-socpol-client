"use server";

import { cookies } from "next/headers";

import {
  CreateCategoryFormState,
  CreateCategoryFormSchema,
  UpdateCategoryFormState,
  UpdateCategoryFormSchema,
  DeleteCategoryFormState,
} from "@/schemas/categories.schema";

export async function createCategoryAction(prevState: CreateCategoryFormState, formData: FormData) {
  const name = formData.get("name")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const validatedFields = CreateCategoryFormSchema.safeParse({
    name,
    description,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      values: {
        name,
        description,
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
        description,
      },
      message: "Unauthorized. Token is missing",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      method: "POST",
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
          description,
        },
        message: json.message,
      };
    }

    return {
      success: true,
      values: {
        name,
        description,
      },
      message: json.message,
    };
  } catch (error) {
    return {
      success: false,
      values: {
        name,
        description,
      },
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function updateCategoryAction(id: string, prevState: UpdateCategoryFormState, formData: FormData) {
  const name = formData.get("name")?.toString() || "";
  const description = formData.get("description")?.toString() || "";
  const validatedFields = UpdateCategoryFormSchema.safeParse({
    name,
    description,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      values: {
        name,
        description,
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
        description,
      },
      message: "Unauthorized. Token is missing",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
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
          description,
        },
        message: json.message,
      };
    }

    return {
      success: true,
      values: {
        name,
        description,
      },
      message: json.message,
    };
  } catch (error) {
    return {
      success: false,
      values: {
        name,
        description,
      },
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function deleteCategoryAction(id: string, prevState: DeleteCategoryFormState) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      success: false,
      message: "Unauthorized. Token is missing",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const json: ResponseJSON = await response.json();

    if (!response.ok) {
      return {
        success: false,
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
