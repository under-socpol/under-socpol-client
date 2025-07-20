import Link from "next/link";

import ResetPasswordForm from "@/components/ResetPasswordForm";

export default function ResetPassword() {
  return (
    <div className="mx-auto max-w-lg min-h-[calc(100vh-(4.25rem+3.719rem))] md:min-h-[calc(100vh-(4.25rem+3.469rem))] flex flex-col justify-center gap-8">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold text-primary">Reset your password</p>

        <p className="text-sm text-gray-500">Enter your new password below and confirm it to complete the reset process.</p>
      </div>

      <ResetPasswordForm />

      <div>
        <p className="text-xs text-gray-500 text-center">
          Back to{" "}
          <Link href="/auth/sign_in" className="text-app-text-color underline hover:text-app-primary-color">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
