import z from "zod";

export const CreateArticleSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1, "Title cannot be empty"),
  excerpt: z.string({ required_error: "Please write something for your article" }).min(1, "Article content cannot be empty"),
  content: z.object({}).passthrough(),
  category_id: z.string({ required_error: "Category ID is required" }).uuid({ message: "Please select a valid category" }),
});

export type CreateArticleFormState =
  | {
      success: boolean;
      values: {
        title: string;
        excerpt: string;
        content: Object;
        category_id: string;
      };
      errors?: {
        title?: string[];
        excerpt?: string[];
        category_id?: string[];
      };
      message?: string;
    }
  | undefined;

export const EditArticleSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1, "Title cannot be empty"),
  excerpt: z.string({ required_error: "Please write something for your article" }).min(1, "Article content cannot be empty"),
  content: z.object({}).passthrough(),
  category_id: z.string({ required_error: "Category ID is required" }).uuid({ message: "Please select a valid category" }),
});

export type EditArticleFormState =
  | {
      success: boolean;
      values: {
        title: string;
        excerpt: string;
        content: Object;
        category_id: string;
      };
      errors?: {
        title?: string[];
        excerpt?: string[];
        category_id?: string[];
      };
      message?: string;
    }
  | undefined;

export type PublishArticleFormState =
  | {
      success: boolean;
      message?: string;
    }
  | undefined;

export type UnPublishArticleFormState =
  | {
      success: boolean;
      message?: string;
    }
  | undefined;

export type DeleteArticleFormState =
  | {
      success: boolean;
      message?: string;
    }
  | undefined;
