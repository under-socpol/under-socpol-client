import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import NavbarButton from "@/components/NavbarButton";
import Footer from "@/components/Footer";
import FailedToLoadContent from "@/components/FailedToLoadContent";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let role: "USER" | "ADMIN" | "SUPER_ADMIN" = "USER";

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

    const userJson: ResponseJSON = await response.json();
    role = userJson?.data?.role || "USER";
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
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
  const data: Category[] = json.data;

  return (
    <>
      <Toaster position="top-right" />

      <Navbar role={role} categories={data}>
        <NavbarButton />
      </Navbar>

      <main className="px-6">{children}</main>

      <Footer />
    </>
  );
}
