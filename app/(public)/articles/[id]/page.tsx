import { redirect } from "next/navigation";

import FailedToLoadContent from "@/components/FailedToLoadContent";

export default async function ArticleById({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/id/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (response.status === 500) {
    redirect("/internal_server_error");
  }

  if (response.status === 400) {
    redirect("/not-found");
  }

  if (!response.ok) {
    return <FailedToLoadContent />;
  }

  const json: ResponseJSON = await response.json();
  const data: FullArticle = json.data;

  return (
    <div className="py-12 px-4 mx-auto max-w-screen-lg min-h-[calc(100vh-(4.25rem+3.719rem))] md:min-h-[calc(100vh-(4.25rem+3.469rem))] flex flex-col gap-12">
      <div className="flex flex-col items-center gap-8">
        <img src="/images/logo.png" alt="logo" className="size-24" />

        <div className="flex flex-col gap-4">
          <p className="text-3xl font-bold text-app-text-color leading-14 text-center">{data.title}</p>

          <p className="text-base text-app-text-color text-center">
            By <span className="underline">{data.user.name}</span>
            <span>
              {" "}
              -{" "}
              {new Date(data.created_at).toLocaleDateString(undefined, {
                dateStyle: "medium",
              })}{" "}
            </span>
          </p>
        </div>
      </div>

      <ArticleContentRenderer blocks={data.content.blocks} />
    </div>
  );
}

function ArticleContentRenderer({ blocks }: { blocks: any[] }) {
  function enhanceLinks(html: string): string {
    return html.replace(/<a\s+href="([^"]+)"(.*?)>/g, `<a href="$1"$2 target="_blank" rel="noopener noreferrer" class="underline">`);
  }

  const firstHeaderIndex = blocks.findIndex((block) => block.type === "header");

  return (
    <div className="flex flex-col gap-8">
      {blocks.map((block, index) => {
        const key = block.id || index;

        switch (block.type) {
          case "header":
            if (index === firstHeaderIndex) return null;

            const text = block.data.text;

            return (
              <p key={key} className="text-2xl text-app-text-color font-bold text-justify">
                {enhanceLinks(text)}
              </p>
            );

          case "paragraph": {
            const text = block.data.text;

            return <p key={key} className="text-base text-app-text-color leading-10 text-justify" dangerouslySetInnerHTML={{ __html: enhanceLinks(text) }} />;
          }

          case "quote": {
            const text = block.data.text;
            const caption = block.data.caption;

            return (
              <blockquote key={key} className="pl-4 border-l-4 text-base text-gray-600 italic">
                <p className="text-app-text-color text-justify" dangerouslySetInnerHTML={{ __html: enhanceLinks(text) }} />

                {block.data.caption && <footer className="mt-2 text-sm text-right text-gray-500">— {enhanceLinks(caption)}</footer>}
              </blockquote>
            );
          }

          case "list": {
            const { style, items } = block.data;

            if (style === "checklist") {
              return (
                <ul key={key} className="ml-8 list-none flex flex-col gap-4">
                  {items.map((item: any, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <input type="checkbox" checked={item.meta.checked} readOnly className="mt-1 accent-brand" />

                      <span
                        className="text-base text-justify"
                        dangerouslySetInnerHTML={{
                          __html: typeof item.content === "string" ? enhanceLinks(item.content) : enhanceLinks(JSON.stringify(item.content)),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              );
            }

            const isOrdered = style === "ordered";
            const ListTag = isOrdered ? "ol" : "ul";
            const listClass = isOrdered ? "list-decimal" : "list-disc";
            const isSingleItem = items.length === 1;

            return (
              <ListTag key={key} className={`${listClass} list-inside ml-8 flex flex-col gap-4`}>
                {items.map((item: any, idx: number) => (
                  <li
                    key={idx}
                    className={isSingleItem ? "text-base text-justify" : "text-base text-justify"}
                    dangerouslySetInnerHTML={{
                      __html: typeof item.content === "string" ? enhanceLinks(item.content) : enhanceLinks(JSON.stringify(item.content)),
                    }}
                  />
                ))}
              </ListTag>
            );
          }

          case "table":
            return (
              <div key={key} className="overflow-auto">
                <table className="table-auto border border-collapse border-gray-300 w-full text-base">
                  <tbody>
                    {block.data.content.map((row: string[], rowIndex: number) => (
                      <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                          <td key={colIndex} className="py-1 px-2 border border-gray-300" dangerouslySetInnerHTML={{ __html: enhanceLinks(cell) }} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          default:
            return (
              <pre key={key} className="bg-gray-100 text-xs text-red-600 p-2 overflow-x-auto">
                Unsupported block type: {block.type}
              </pre>
            );
        }
      })}
    </div>
  );
}
