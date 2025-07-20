"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { forgotPasswordAction } from "@/actions/auth.actions";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(forgotPasswordAction, undefined);

  useEffect(() => {
    if (!pending && state?.success && state.message) {
      toast.success(state.message, {
        style: {
          backgroundColor: "#ecfdf3",
          borderColor: "#bffcd9",
          borderRadius: 0,
          fontFamily: "Merriweather",
          color: "#008a2e",
        },
      });
    }

    if (!pending && !state?.success && state?.message) {
      toast.error(state.message, {
        style: {
          backgroundColor: "#fff0f0",
          borderColor: "#ffe0e1",
          borderRadius: 0,
          fontFamily: "Merriweather",
          color: "#e60000",
        },
      });
    }
  }, [pending, state]);

  return (
    <form action={action} autoComplete="off" className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="w-max text-xs text-app-text-color">
          Email
        </Label>

        <Input
          type="email"
          id="email"
          name="email"
          defaultValue={state?.values.email}
          className="rounded-none text-sm text-app-text-color"
          placeholder="something@example.com"
        />

        {state?.errors?.email && <p className="text-red-600 text-xs">*{state.errors.email}</p>}
      </div>

      <Button disabled={pending} type="submit" className="rounded-none text-sm text-app-background-color hover:cursor-pointer">
        {pending ? "Sending Request Reset Link..." : "Request Reset Link"}
      </Button>
    </form>
  );
}
