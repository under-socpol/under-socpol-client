import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import FailedToLoadContent from "@/components/FailedToLoadContent";
import CreateCategoryButton from "@/components/CreateCategoryButton";
import UpdateCategoryButton from "@/components/UpdateCategoryButton";
import DeleteCategoryButton from "@/components/DeleteCategoryButton";
import NoContentAvailable from "@/components/NoContentAvailable";

export default async function Categories() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });
  const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
    method: "GET",
    cache: "no-store",
  });

  if (userResponse.status === 500 || categoriesResponse.status === 500) {
    redirect("/internal_server_error");
  }

  if (!userResponse.ok || !categoriesResponse.ok) {
    return <FailedToLoadContent />;
  }

  const userJson: ResponseJSON = await userResponse.json();
  const user: User = await userJson.data;
  const role = user.role as "USER" | "ADMIN" | "SUPER_ADMIN";
  const categoriesJson: ResponseJSON = await categoriesResponse.json();
  const categories: Category[] = await categoriesJson.data;

  return (
    <div className="py-12 px-6 min-h-[calc(100vh-(4.25rem+3.719rem))] md:h-[calc(100vh-(4.25rem+3.469rem))] flex flex-col items-center gap-8 overflow-y-scroll">
      <div className="max-w-screen-lg w-full flex items-center gap-4">
        <img src="/images/logo.png" alt="logo" className="size-8" />

        <p className="text-3xl font-bold">Categories</p>
      </div>

      {role !== "USER" && (
        <div className="max-w-screen-lg w-full">
          <CreateCategoryButton />
        </div>
      )}

      {categories.length > 0 ? (
        <div className="max-w-screen-lg w-full overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-200 w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-200 text-sm text-left whitespace-nowrap w-0">No.</th>

                <th className="px-4 py-2 border border-gray-200 text-sm text-left">Category Name</th>

                {role !== "USER" && <th className="px-4 py-2 border border-gray-200 text-sm text-left whitespace-nowrap w-0">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {categories.map((category: Category, index: number) => (
                <tr key={category.id}>
                  <td className="px-4 py-2 border border-gray-200 text-sm text-center whitespace-nowrap">{index + 1}</td>

                  <td className="px-4 py-2 border border-gray-200 text-sm overflow-hidden text-ellipsis whitespace-nowrap">{category.name}</td>

                  {role !== "USER" && (
                    <td
                      className={`px-4 py-2 border-t ${
                        index === 0 && "border-t-0"
                      } border-gray-200 text-sm text-center whitespace-nowrap flex justify-center items-center gap-4`}
                    >
                      {role === "ADMIN" && <UpdateCategoryButton id={category.id} name={category.name} description={category.description} />}

                      {role === "SUPER_ADMIN" && <UpdateCategoryButton id={category.id} name={category.name} description={category.description} />}

                      {role === "SUPER_ADMIN" && <DeleteCategoryButton id={category.id} />}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoContentAvailable />
      )}
    </div>
  );
}
