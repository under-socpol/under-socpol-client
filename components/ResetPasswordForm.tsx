"use client";

import { useActionState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { resetPasswordAction } from "@/actions/auth.actions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const key = searchParams.get("key") ?? "";
  const [state, action, pending] = useActionState(resetPasswordAction.bind(null, key), undefined);
  const router = useRouter();

  useEffect(() => {
    if (!pending && state?.success) {
      toast.success(state.message, {
        style: {
          backgroundColor: "#ecfdf3",
          borderColor: "#bffcd9",
          borderRadius: 0,
          fontFamily: "Merriweather",
          color: "#008a2e",
        },
      });

      setTimeout(() => {
        router.push("/admin");
      }, 4500);
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
        <Label htmlFor="password" className="w-max text-xs text-app-text-color">
          Password
        </Label>

        <Input type="password" name="password" id="password" defaultValue={state?.values.password} className="rounded-none text-sm text-app-text-color" />

        {state?.errors?.password && <p className="text-red-600 text-xs">*{state.errors.password}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword" className="w-max text-xs text-app-text-color">
          Confirm Password
        </Label>

        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          defaultValue={state?.values.confirmPassword}
          className="rounded-none text-sm text-app-text-color"
        />

        {state?.errors?.confirmPassword && <p className="text-red-600 text-xs">*{state.errors.confirmPassword}</p>}
      </div>

      <Button disabled={pending} type="submit" className="rounded-none text-sm text-app-background-color hover:cursor-pointer">
        {pending ? "Resetting Password..." : "Reset Password"}
      </Button>
    </form>
  );
}
