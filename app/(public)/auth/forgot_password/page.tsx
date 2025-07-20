import Link from "next/link";

import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <div className="mx-auto max-w-lg min-h-[calc(100vh-(4.25rem+3.719rem))] md:min-h-[calc(100vh-(4.25rem+3.469rem))] flex flex-col justify-center gap-8">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold text-app-text-color">Forgot your password?</p>

        <p className="text-sm text-gray-500">Enter your email address below and we'll send you a link to reset your password.</p>
      </div>

      <ForgotPasswordForm />

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
