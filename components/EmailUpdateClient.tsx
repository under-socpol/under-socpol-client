"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function EmailUpdateClient() {
  const searchParams = useSearchParams();
  const statusCode = searchParams.get("status_code");
  const message = searchParams.get("message");

  const isSuccess = statusCode === "200";

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col gap-4 text-center">
        {isSuccess ? (
          <>
            <p className="text-xl text-app-text-color">{message || "Your email has been updated successfully"}</p>
            <p className="text-sm text-gray-500">You can now return to your profile and continue using your account.</p>
          </>
        ) : (
          <>
            <p className="text-xl text-app-text-color">{message || "Failed to update your email"}</p>
            <p className="text-sm text-gray-500">
              We encountered an error while trying to update your email address.
              <br />
              Please try again later or contact support if the issue persists.
            </p>
          </>
        )}
      </div>

      <Link href="/admin/profile" className="w-max">
        <Button className="rounded-none text-sm text-app-background-color hover:cursor-pointer">Back to Profile</Button>
      </Link>
    </div>
  );
}
