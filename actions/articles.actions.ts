"use server";

import { cookies } from "next/headers";
import he from "he";

import {
  CreateArticleFormState,
  CreateArticleSchema,
  PublishArticleFormState,
  DeleteArticleFormState,
  UnPublishArticleFormState,
  EditArticleFormState,
} from "@/schemas/articles.schema";

function decodeHtmlEntities(text: string) {
  return he.decode(text);
}

export async function createArticleAction(content: any, categoryId: string, prevState: CreateArticleFormState) {
  const headerBlock = content?.blocks.find((block: any) => block.type === "header");
  const paragraphBlock = content?.blocks.find((block: any) => block.type === "paragraph");
  const title = headerBlock ? decodeHtmlEntities(headerBlock.data.text) : "";
  const excerpt = paragraphBlock ? decodeHtmlEntities(paragraphBlock.data.text) : "";
  const cleanedBlocks = content?.blocks.map((block: any) => {
    if (typeof block.data?.text === "string") {
      return {
        ...block,
        data: {
          ...block.data,
          text: decodeHtmlEntities(block.data.text),
        },
      };
    }
    return block;
  });

  const formData = {
    title,
    excerpt,
    content: {
      ...content,
      blocks: cleanedBlocks,
    },
    category_id: categoryId,
  };
  const validatedFields = CreateArticleSchema.safeParse(formData);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const firstError = Object.values(fieldErrors).flat()[0] || "Validation failed";

    return {
      success: false,
      values: {
        title,
        excerpt,
        content,
        category_id: formData.category_id,
      },
      message: firstError,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      success: false,
      values: {
        title,
        excerpt,
        content,
        category_id: formData.category_id,
      },
      message: "Unauthorized. Token is missing",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
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
          title,
          excerpt,
          content,
          category_id: formData.category_id,
        },
        message: json.message,
      };
    }

    return {
      success: true,
      values: {
        title,
        excerpt,
        content,
        category_id: formData.category_id,
      },
      message: json.message,
    };
  } catch (error) {
    return {
      success: false,
      values: {
        title,
        excerpt,
        content,
        category_id: formData.category_id,
      },
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function editArticleAction(id: string, content: any, categoryId: string, prevState: EditArticleFormState) {
  const headerBlock = content.blocks.find((block: any) => block.type === "header");
  const paragraphBlock = content.blocks.find((block: any) => block.type === "paragraph");
  const title = headerBlock ? decodeHtmlEntities(headerBlock.data.text) : "";
  const excerpt = paragraphBlock ? decodeHtmlEntities(paragraphBlock.data.text) : "";
  const cleanedBlocks = content.blocks.map((block: any) => {
    if (typeof block.data?.text === "string") {
      return {
        ...block,
        data: {
          ...block.data,
          text: decodeHtmlEntities(block.data.text),
        },
      };
    }
    return block;
  });
  const formData = {
    title,
    excerpt,
    content: {
      ...content,
      blocks: cleanedBlocks,
    },
    category_id: categoryId,
  };
  const validatedFields = CreateArticleSchema.safeParse(formData);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const firstError = Object.values(fieldErrors).flat()[0] || "Validation failed";

    return {
      success: false,
      values: {
        title,
        excerpt,
        content,
        category_id: formData.category_id,
      },
      message: firstError,
    };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      success: false,
      values: {
        title,
        excerpt,
        content,
        category_id: formData.category_id,
      },
      message: "Unauthorized. Token is missing",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`, {
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
          title,
          excerpt,
          content,
          category_id: formData.category_id,
        },
        message: json.message,
      };
    }

    return {
      success: true,
      values: {
        title,
        excerpt,
        content,
        category_id: formData.category_id,
      },
      message: json.message,
    };
  } catch (error) {
    return {
      success: false,
      values: {
        title,
        excerpt,
        content,
        category_id: formData.category_id,
      },
      message: error instanceof Error ? error.message : "Something went wrong",
    };
  }
}

export async function publishArticleAction(id: string, prevState: PublishArticleFormState) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      success: false,
      message: "Unauthorized. Token is missing",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/is_published/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_published: true }),
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

export async function unPublishArticleAction(id: string, prevState: UnPublishArticleFormState) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      success: false,
      message: "Unauthorized. Token is missing",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/is_published/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_published: false }),
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

export async function deleteArticleAction(id: string, prevState: DeleteArticleFormState) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      success: false,
      message: "Unauthorized. Token is missing",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`, {
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
