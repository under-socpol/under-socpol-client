import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import FailedToLoadContent from "@/components/FailedToLoadContent";
import NoContentAvailable from "@/components/NoContentAvailable";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export default async function Users({ searchParams }: { searchParams: Promise<{ page: string }> }) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?take=20&page=${currentPage}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 500) {
    redirect("/internal_server_error");
  }

  if (!response.ok) {
    return <FailedToLoadContent />;
  }

  const usersJson: ResponseJSON = await response.json();
  const users: User[] = await usersJson.data;
  const meta = usersJson.pagination;

  return (
    <div className="py-12 px-6 min-h-[calc(100vh-(4.25rem+3.719rem))] md:h-[calc(100vh-(4.25rem+3.469rem))] flex flex-col items-center gap-8 overflow-y-scroll">
      <div className="max-w-screen-lg w-full flex items-center gap-4">
        <img src="/images/logo.png" alt="logo" className="size-8" />

        <p className="text-3xl font-bold">Users</p>
      </div>

      {users.length > 0 ? (
        <div className="max-w-screen-lg w-full flex flex-col gap-12">
          <div className="flex flex-col gap-12 overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-200 w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-200 text-sm text-left whitespace-nowrap w-0">No.</th>

                  <th className="px-4 py-2 border border-gray-200 text-sm text-left">Name</th>

                  <th className="px-4 py-2 border border-gray-200 text-sm text-left">Email</th>

                  <th className="px-4 py-2 border border-gray-200 text-sm text-left">Role</th>

                  <th className="px-4 py-2 border border-gray-200 text-sm text-left">Verified</th>

                  <th className="px-4 py-2 border border-gray-200 text-sm text-left">Joined At</th>

                  <th className="px-4 py-2 border border-gray-200 text-sm text-left whitespace-nowrap w-0">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User, index: number) => (
                  <tr key={user.id}>
                    <td className="px-4 py-2 border border-gray-200 text-sm text-center whitespace-nowrap">{index + 1}</td>

                    <td className="px-4 py-2 border border-gray-200 text-sm overflow-hidden text-ellipsis whitespace-nowrap">{user.name}</td>

                    <td className="px-4 py-2 border border-gray-200 text-sm overflow-hidden text-ellipsis whitespace-nowrap">{user.email}</td>

                    <td className="px-4 py-2 border border-gray-200 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                      {user.role === "SUPER_ADMIN" ? "SUPER ADMIN" : user.role}
                    </td>

                    <td className="px-4 py-2 border border-gray-200 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                      {user.email_is_verified ? "True" : "False"}
                    </td>

                    <td className="px-4 py-2 border border-gray-200 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                      {new Date(user.created_at).toLocaleDateString(undefined, {
                        dateStyle: "medium",
                      })}
                    </td>

                    <td
                      className={`px-4 py-2 border-t ${
                        index === 0 && "border-t-0"
                      } border-gray-200 text-sm text-center whitespace-nowrap flex justify-center items-center gap-4`}
                    ></td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      ) : (
        <NoContentAvailable />
      )}
    </div>
  );
}
