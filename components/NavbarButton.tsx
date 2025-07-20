import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import FailedToLoadContent from "./FailedToLoadContent";
import { Button } from "./ui/button";

export default async function NavbarButton() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let role: "USER" | "ADMIN" | "SUPER_ADMIN" | null = null;

  if (token) {
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
    role = json?.data?.role || "USER";
  }

  if (role) {
    return (
      <Link href="/auth/sign_up" className="w-max">
        <Button className="rounded-none text-sm text-app-background-color hover:cursor-pointer">CREATE ARTICLE</Button>
      </Link>
    );
  }

  return (
    <Link href="/auth/sign_up" className="w-max">
      <Button className="rounded-none text-sm text-app-background-color hover:cursor-pointer">JOIN US</Button>
    </Link>
  );
}
