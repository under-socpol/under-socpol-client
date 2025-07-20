"use client";

import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

export default function EditArticleButton({ id }: { id: string }) {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push(`/admin/edit_article/${id}`);
      }}
      className="rounded-none bg-app-background-color hover:bg-app-text-color border border-app-text-color text-sm text-app-text-color hover:text-app-background-color hover:cursor-pointer"
    >
      Edit Article
    </Button>
  );
}
