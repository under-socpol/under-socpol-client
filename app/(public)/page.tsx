import { redirect } from "next/navigation";
import Link from "next/link";

import FailedToLoadContent from "@/components/FailedToLoadContent";
import NoContentAvailable from "@/components/NoContentAvailable";
import ArticleCategory from "@/components/ArticleCategory";

export default async function Home() {
  const newestArticleResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles?take=1&page=1`, {
    method: "GET",
    cache: "no-store",
  });
  const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    method: "GET",
    cache: "no-store",
  });

  if (newestArticleResponse.status === 500 || categoriesResponse.status === 500) {
    redirect("/internal_server_error");
  }

  if (!newestArticleResponse.ok || !categoriesResponse.ok) {
    return <FailedToLoadContent />;
  }

  const newestArticleJson: ResponseJSON = await newestArticleResponse.json();
  const newestArticleData: Article[] = newestArticleJson.data;
  const categoriesJson: ResponseJSON = await categoriesResponse.json();
  const categoriesData: Category[] = categoriesJson.data;

  if (newestArticleData.length === 0 || categoriesData.length === 0) {
    return <NoContentAvailable />;
  }

  return (
    <div className="py-12 mx-auto max-w-screen-lg min-h-[calc(100vh-(4.25rem+3.719rem))] md:min-h-[calc(100vh-(4.25rem+3.469rem))] flex flex-col gap-12">
      <section className="pb-4 border-b border-gray-200 flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <img src="/images/logo.png" alt="logo" className="size-24" />

          <div className="flex flex-col gap-4">
            <Link
              href={`/articles/${newestArticleData[0].id}`}
              className="text-3xl font-bold text-app-text-color hover:text-app-primary-color leading-16 hover:underline"
            >
              {newestArticleData[0].title}
            </Link>

            <p className="text-sm text-app-text-color">
              By <span className="underline">{newestArticleData[0].user.name}</span>
              <span>
                {" "}
                -{" "}
                {new Date(newestArticleData[0].created_at).toLocaleDateString(undefined, {
                  dateStyle: "medium",
                })}{" "}
              </span>
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-500 leading-8 line-clamp-2">{newestArticleData[0].excerpt}</p>
      </section>

      <ArticleCategory href={`/articles/category/Newest`} category="Newest" />

      {categoriesData.map((item: Category) => {
        return <ArticleCategory key={item.id} href={`/articles/category/${item.name}`} category={item.name} />;
      })}
    </div>
  );
}
