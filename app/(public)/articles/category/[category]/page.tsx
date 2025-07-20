import { redirect } from "next/navigation";

import FailedToLoadContent from "@/components/FailedToLoadContent";
import ArticleCard from "@/components/ArticleCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default async function ArticleByCategory({ params, searchParams }: { params: Promise<{ category: string }>; searchParams: Promise<{ page: string }> }) {
  const { category } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const articlesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${
      category === "Newest" ? `articles?take=20&page=${currentPage}` : `articles/categories?name=${category}&take=20&page=${currentPage}`
    }`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const categoryRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${category}`, {
    method: "GET",
    cache: "no-store",
  });

  if (categoryRes.status === 500 || articlesResponse.status === 500) {
    redirect("/internal_server_error");
  }

  if (category !== "Newest") {
    if (!categoryRes.ok || !articlesResponse.ok) {
      return <FailedToLoadContent />;
    }
  }

  const categoryJson: ResponseJSON = await categoryRes.json();
  const categoriesData: Category = categoryJson.data;
  const articlesJson: ResponseJSON = await articlesResponse.json();
  const articlesData: Article[] = articlesJson.data;
  const meta = articlesJson.pagination;

  return (
    <div className="py-12 mx-auto max-w-screen-lg min-h-[calc(100vh-(4.25rem+3.719rem))] md:min-h-[calc(100vh-(4.25rem+3.469rem))]">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="self-start flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <img src="/images/logo.png" alt="logo" className="size-8" />
            <p className="text-3xl text-app-text-color font-bold">{`${category} Article`}</p>
          </div>
          <p className="text-sm text-gray-500 leading-8">
            {category === "Newest"
              ? "Discover the latest insights, ideas, and perspectives in our most recent articles. Stay updated with fresh content from various categories, written by our contributors to inform, inspire, and spark meaningful conversations."
              : categoriesData.description}
          </p>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            {articlesData.map((item: Article) => (
              <ArticleCard key={item.id} href={`/articles/${item.id}`} title={item.title} excerpt={item.excerpt} />
            ))}
          </div>

          {meta && meta.totalPages > 0 && (
            <Pagination className="m-0 mt-auto ml-auto w-max">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    aria-disabled={currentPage <= 1}
                    href={`?page=${currentPage - 1}`}
                    className={currentPage <= 1 ? "rounded-none pointer-events-none opacity-50" : "rounded-none"}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationLink href={`?page=${currentPage}`} className="rounded-none">
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    aria-disabled={currentPage >= meta.totalPages}
                    href={`?page=${currentPage + 1}`}
                    className={currentPage >= meta.totalPages ? "rounded-none pointer-events-none opacity-50" : "rounded-none"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </section>
    </div>
  );
}
