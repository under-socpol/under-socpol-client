import { redirect } from "next/navigation";
import Link from "next/link";

import FailedToLoadContent from "./FailedToLoadContent";
import ArticleCard from "./ArticleCard";

interface ArticleCategoryProps {
  href: string;
  category: string;
}

export default async function ArticleCategory({ href, category }: ArticleCategoryProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${category === "Newest" ? `articles?take=3&page=1` : `articles/categories?name=${category}&take=3&page=1`}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (response.status === 500) {
    redirect("/internal_server_error");
  }

  if (!response.ok) {
    return <FailedToLoadContent />;
  }

  const json: ResponseJSON = await response.json();
  const data: Article[] = json.data;

  return (
    <section className="flex flex-col gap-8">
      {data.length > 0 && (
        <Link href={href} className="w-max text-lg font-bold text-app-text-color">
          {category}
        </Link>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item: Article) => {
          return <ArticleCard key={item.id} title={item.title} excerpt={item.excerpt} href={`/articles/${item.id}`} />;
        })}
      </div>
    </section>
  );
}
