import { Suspense } from "react";

import EmailUpdateClient from "@/components/EmailUpdateClient";

export default function EmailUpdatePage() {
  return (
    <main className="bg-app-background-color mx-auto max-w-screen-lg min-h-screen flex flex-col justify-center items-center gap-12">
      <img src="/images/logo.png" alt="logo" className="size-24" />

      <Suspense fallback={<p>Loading...</p>}>
        <EmailUpdateClient />
      </Suspense>
    </main>
  );
}
