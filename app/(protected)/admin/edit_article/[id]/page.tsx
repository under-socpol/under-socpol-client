import { redirect } from "next/navigation";

import FailedToLoadContent from "@/components/FailedToLoadContent";
import EditArticleWrapper from "@/components/EditArticleWrapper";

export default async function EditArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    method: "GET",
    cache: "no-store",
  });
  const articleResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/id/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (categoriesResponse.status === 500 || articleResponse.status === 500) {
    redirect("/internal_server_error");
  }

  if (!categoriesResponse.ok || !articleResponse.ok) {
    return <FailedToLoadContent />;
  }

  const categoriesJson: ResponseJSON = await categoriesResponse.json();
  const categoriesData: Category[] = await categoriesJson.data;
  const articleJson: ResponseJSON = await articleResponse.json();
  const articleData: Article = await articleJson.data;

  return (
    <div className="py-12 px-6 min-h-[calc(100vh-(4.25rem+3.719rem))] md:h-[calc(100vh-(4.25rem+3.469rem))] flex flex-col items-center gap-8 overflow-y-scroll">
      <div className="max-w-screen-lg w-full flex items-center gap-4">
        <img src="/images/logo.png" alt="logo" className="size-8" />

        <p className="text-3xl text-primary font-bold">Edit Article</p>
      </div>

      <EditArticleWrapper id={id} categories={categoriesData} article={articleData} />
    </div>
  );
}
