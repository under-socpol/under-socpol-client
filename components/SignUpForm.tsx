"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";

import { signUpAction } from "@/actions/auth.actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function SignUpFormComponent() {
  const [state, action, pending] = useActionState(signUpAction, undefined);

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
        <Label htmlFor="name" className="w-max text-xs text-app-text-color">
          Name
        </Label>

        <Input type="text" name="name" id="name" defaultValue={state?.values.name} className="rounded-none text-sm text-app-text-color" placeholder="John" />

        {state?.errors?.name && <p className="text-red-600 text-xs">*{state.errors.name}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="w-max text-xs text-app-text-color">
          Email
        </Label>

        <Input
          type="email"
          name="email"
          id="email"
          defaultValue={state?.values.email}
          className="rounded-none text-sm text-app-text-color"
          placeholder="something@example.com"
        />

        {state?.errors?.email && <p className="text-red-600 text-xs">*{state.errors.email}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="w-max text-xs text-app-text-color">
          Password
        </Label>

        <Input type="password" name="password" id="password" defaultValue={state?.values.password} className="rounded-none text-sm text-app-text-color" />

        {state?.errors?.password && <p className="text-red-600 text-xs">*{state.errors.password}</p>}
      </div>

      <Button disabled={pending} type="submit" className="rounded-none text-sm text-app-background-color hover:cursor-pointer">
        {pending ? "Signing Up..." : "Sign Up"}
      </Button>
    </form>
  );
}
