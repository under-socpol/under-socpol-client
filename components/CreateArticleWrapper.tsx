"use client";

import { useRef, useState, useActionState, useEffect } from "react";
import dynamic from "next/dynamic";
import EditorJS from "@editorjs/editorjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { createArticleAction } from "@/actions/articles.actions";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Button } from "./ui/button";

const CreateArticleEditor = dynamic(() => import("./CreateArticleEditor"), { ssr: false });

export default function CreateArticleWrapper({ categories }: { categories: Category[] }) {
  const editorRef = useRef<EditorJS | null>(null);
  const [categoryId, setCategoryId] = useState<string>("");
  const [content, setContent] = useState<any>(null);
  const [state, action, pending] = useActionState(createArticleAction.bind(null, content, categoryId), undefined);
  const router = useRouter();

  useEffect(() => {
    if (!pending && state?.success && state.message) {
      toast.success(state.message, {
        style: {
          backgroundColor: "#ecfdf3",
          borderColor: "#bffcd9",
          borderRadius: 0,
          fontFamily: "Merriweather",
          color: "#008a2e",
        },
      });

      router.push("/admin/my_articles");
    }

    if (!pending && !state?.success && state?.message) {
      toast.error(state.message, {
        style: {
          backgroundColor: "#fff0f0",
          borderColor: "#ffe0e1",
          borderRadius: 0,
          fontFamily: "Merriweather",
          color: "#e60000",
        },
      });
    }
  }, [pending, state]);

  return (
    <div className="max-w-screen-lg w-full flex flex-col gap-8">
      <Select onValueChange={(value) => setCategoryId(value)}>
        <SelectTrigger className="border-gray-200 rounded-none w-full md:w-1/2">
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        {categories.length > 0 ? (
          <SelectContent className="bg-app-background-color border-gray-200 rounded-none">
            {categories.map((category: any) => (
              <SelectItem key={category.id} value={category.id} className="rounded-none">
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        ) : (
          <SelectContent className="border-gray-200 rounded-none">
            <SelectItem disabled value="No categories available" className="text-gray-400">
              No categories available
            </SelectItem>
          </SelectContent>
        )}
      </Select>

      <CreateArticleEditor editorRef={editorRef} setContent={setContent} />

      <form action={action}>
        <Button disabled={pending} type="submit" className="rounded-none w-full md:w-max text-sm text-app-background-color hover:cursor-pointer">
          {pending ? "Saving..." : "Save"}
        </Button>
      </form>
    </div>
  );
}
