import Link from "next/link";

import SignInForm from "@/components/SignInForm";

export default function SignIn() {
  return (
    <div className="mx-auto max-w-lg min-h-[calc(100vh-(4.25rem+3.719rem))] md:min-h-[calc(100vh-(4.25rem+3.469rem))] flex flex-col justify-center gap-8">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold text-app-text-color">Welcome back!</p>

        <p className="text-sm text-gray-500">Enter your credentials below to sign in to your account.</p>
      </div>

      <SignInForm />

      <div>
        <p className="text-xs text-gray-500 text-center">
          Doesn't have an account?{" "}
          <Link href="/auth/sign_up" className="text-app-text-color underline hover:text-app-primary-color">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
