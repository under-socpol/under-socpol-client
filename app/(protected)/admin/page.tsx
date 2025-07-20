import { redirect } from "next/navigation";

import FailedToLoadContent from "@/components/FailedToLoadContent";
import CreateArticleWrapper from "@/components/CreateArticleWrapper";

export default async function CreateArticle() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    method: "GET",
    cache: "no-store",
  });

  if (response.status === 500) {
    redirect("/internal_server_error");
  }

  if (!response.ok) {
    return <FailedToLoadContent />;
  }

  const json: ResponseJSON = await response.json();
  const data: Category[] = await json.data;

  return (
    <div className="py-12 px-6 min-h-[calc(100vh-(4.25rem+3.719rem))] md:h-[calc(100vh-(4.25rem+3.469rem))] flex flex-col items-center gap-8 overflow-y-scroll">
      <div className="max-w-screen-lg w-full flex items-center gap-4">
        <img src="/images/logo.png" alt="logo" className="size-8" />

        <p className="text-3xl text-primary font-bold">Create Article</p>
      </div>

      <CreateArticleWrapper categories={data} />
    </div>
  );
}
