import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import FailedToLoadContent from "@/components/FailedToLoadContent";
import NoContentAvailable from "@/components/NoContentAvailable";
import ArticleCard from "@/components/ArticleCard";
import EditArticleButton from "@/components/EditArticleButton";
import PublishArticleButton from "@/components/PublishArticleButton";
import DeleteArticleButton from "@/components/DeleteArticleButton";
import UnPublishArticleButton from "@/components/UnPublishArticleButton";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default async function MyArticles({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const cookieStore = await cookies();
  const id = cookieStore.get("id")?.value;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/users/${id}?take=20&page=${currentPage}`, {
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
  const data: Article[] = json.data;
  const meta = json.pagination;

  return data.length > 0 ? (
    <div className="py-12 px-6 mx-auto max-w-screen-lg min-h-[calc(100vh-(4.25rem+3.719rem))] md:min-h-[calc(100vh-(4.25rem+3.469rem))]">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="self-start flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <img src="/images/logo.png" alt="logo" className="size-8" />

            <p className="text-3xl text-app-text-color font-bold">My Articles</p>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            {data.map((item: Article) => {
              return (
                <div key={item.id} className="flex flex-col gap-4">
                  <ArticleCard href={`/articles/${item.id}`} title={item.title} excerpt={item.excerpt} />

                  <div className="flex items-center gap-4">
                    <EditArticleButton id={item.id} />

                    <DeleteArticleButton id={item.id} />

                    {!item.is_published ? <PublishArticleButton id={item.id} /> : <UnPublishArticleButton id={item.id} />}
                  </div>
                </div>
              );
            })}
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
  ) : (
    <div className="py-12 px-6 mx-auto max-w-screen-lg min-h-[calc(100vh-(4.25rem+3.719rem))] md:min-h-[calc(100vh-(4.25rem+3.469rem))]">
      <section className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <div className="self-start flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <img src="/images/logo.png" alt="logo" className="size-8" />

            <p className="text-3xl text-app-text-color font-bold">My Articles</p>
          </div>
        </div>

        <NoContentAvailable />
      </section>
    </div>
  );
}
