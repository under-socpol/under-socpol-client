"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";

import { signOutAction } from "@/actions/auth.actions";
import { Button } from "./ui/button";

export default function SignOutButton() {
  const [state, action, pending] = useActionState(signOutAction, undefined);
  const router = useRouter();

  return (
    <form
      action={() => {
        action();

        router.push("/auth/sign_in");
      }}
    >
      <Button
        disabled={pending}
        className="rounded-none bg-app-background-color hover:bg-app-text-color border border-app-text-color text-sm text-app-text-color hover:text-app-background-color hover:cursor-pointer"
      >
        {pending ? "Signing Out..." : "Sign Out"}
      </Button>
    </form>
  );
}
