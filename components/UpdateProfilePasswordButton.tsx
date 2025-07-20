"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateCurrentUserPasswordAction } from "@/actions/users.actions";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export default function UpdateProfilePasswordButton() {
  const [state, action, pending] = useActionState(updateCurrentUserPasswordAction, undefined);
  const router = useRouter();

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

      router.refresh();
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
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="rounded-none md:w-max text-sm text-app-background-color hover:cursor-pointer">
          Update Password
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-none sm:max-w-[425px]">
        <form action={action} className="space-y-8">
          <DialogHeader className="flex flex-col gap-4">
            <DialogTitle className="text-app-text-color">Update Password</DialogTitle>

            <DialogDescription className="text-gray-500">Change your password and click update to update your password.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="oldPassword" className="w-max text-xs text-app-text-color">
              Old Password
            </Label>

            <Input
              autoComplete="off"
              type="password"
              name="oldPassword"
              id="oldPassword"
              className="rounded-none text-sm text-app-text-color"
              placeholder="Enter your old password"
            />

            {state?.errors?.oldPassword && <p className="text-red-600 text-xs">*{state.errors.oldPassword}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="newPassword" className="w-max text-xs text-app-text-color">
              New Password
            </Label>

            <Input
              autoComplete="off"
              type="password"
              name="newPassword"
              id="newPassword"
              className="rounded-none text-sm text-app-text-color"
              placeholder="Enter your new password"
            />

            {state?.errors?.newPassword && <p className="text-red-600 text-xs">*{state.errors.newPassword}</p>}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" className="rounded-none w-full md:w-max text-sm text-app-text-color hover:cursor-pointer">
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={pending} type="submit" className="rounded-none text-sm text-app-background-color hover:cursor-pointer">
              {pending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
