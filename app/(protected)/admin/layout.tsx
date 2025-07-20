import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import { Toaster } from "sonner";
import FailedToLoadContent from "@/components/FailedToLoadContent";
import Navbar from "@/components/Navbar";
import NavbarButton from "@/components/NavbarButton";
import Footer from "@/components/Footer";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let user: User | null = null;
  let role: "USER" | "ADMIN" | "SUPER_ADMIN" = "USER";

  if (token) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
    });

    if (response.status === 500) {
      redirect("/internal_server_error");
    }

    if (!response.ok) {
      return <FailedToLoadContent />;
    }

    const json: ResponseJSON = await response.json();
    user = json.data;
    role = json?.data?.role || "USER";
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

      <div className="block md:flex md:flex-row">
        <Sidebar role={role} />

        <main className="grow">{children}</main>
      </div>

      <Footer />
    </>
  );
}
