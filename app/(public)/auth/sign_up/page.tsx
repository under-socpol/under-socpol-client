import Link from "next/link";

import SignUpForm from "@/components/SignUpForm";

export default function SignUp() {
  return (
    <div className="mx-auto max-w-lg min-h-[calc(100vh-(4.25rem+3.719rem))] md:min-h-[calc(100vh-(4.25rem+3.469rem))] flex flex-col justify-center gap-8">
      <div className="flex flex-col gap-4">
        <p className="text-3xl font-bold text-app-text-color">Create your account</p>

        <p className="text-sm text-gray-500">Enter your credentials below to create your your account.</p>
      </div>

      <SignUpForm />

      <div>
        <p className="text-xs text-gray-500 text-center">
          Already have an account?{" "}
          <Link href="/auth/sign_in" className="text-app-text-color underline hover:text-app-primary-color">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
