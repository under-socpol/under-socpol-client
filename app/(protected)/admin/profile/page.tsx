import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import FailedToLoadContent from "@/components/FailedToLoadContent";
import UpdateProfileNameButton from "@/components/UpdateProfileNameButton";
import UpdateProfileEMailButton from "@/components/UpdateProfileEMailButton";
import SignOutButton from "@/components/SignOutButton";
import UpdateProfilePasswordButton from "@/components/UpdateProfilePasswordButton";

export default async function Profile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
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

  const json: ResponseJSON = await response.json();
  const data: User = json.data;

  return (
    <div className="py-12 px-6 min-h-[calc(100vh-(4.25rem+3.719rem))] md:h-[calc(100vh-(4.25rem+3.469rem))] flex flex-col items-center gap-8 overflow-y-scroll">
      <div className="max-w-screen-lg w-full flex items-center gap-4">
        <img src="/images/logo.png" alt="logo" className="size-8" />

        <p className="text-3xl font-bold text-primary">Profile</p>
      </div>

      <div className="max-w-screen-lg w-full flex flex-col gap-12">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="bg-primary rounded-full size-20 flex justify-center items-center">
            <p className="text-4xl font-bold text-white">{data.name.charAt(0)}</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-1">
            <p className="text-lg font-bold text-center">{data.name}</p>

            <p className="text-xs text-gray-500 text-center">{data.email}</p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-8">
          <p className="text-xl font-bold text-primary">Information</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <i className="bxs  bx-user-circle text-2xl text-gray-500"></i>

              <p className="text-sm text-gray-500">Name</p>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-sm font-bold">{data.name}</p>

              <UpdateProfileNameButton name={data.name} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <i className="bxs  bx-mail-open text-2xl text-gray-500"></i>

              <p className="text-sm text-gray-500">Email</p>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-sm font-bold">{data.email}</p>

              <UpdateProfileEMailButton name={data.name} email={data.email} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <i className="bxs  bx-user-id-card text-2xl text-gray-500"></i>

              <p className="text-sm text-gray-500">Role</p>
            </div>

            <p className="text-sm font-bold">{data.role === "SUPER_ADMIN" ? "SUPER ADMIN" : data.role}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <i className="bxs  bx-badge-check text-2xl text-gray-500"></i>

              <p className="text-sm text-gray-500">Verified</p>
            </div>

            <p className="text-sm font-bold">{data.email_is_verified ? "True" : "False"}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <i className="bxs  bx-calendar-detail text-2xl text-gray-500"></i>

              <p className="text-sm text-gray-500">Joined At</p>
            </div>

            <p className="text-sm font-bold">
              {new Date(data.created_at).toLocaleDateString(undefined, {
                dateStyle: "medium",
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg w-full flex items-center gap-4">
        <UpdateProfilePasswordButton />

        <SignOutButton />
      </div>
    </div>
  );
}
