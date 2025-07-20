"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateCurrentUserEmailAction } from "@/actions/users.actions";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface UpdateProfileEmailButtonProps {
  name: string;
  email: string;
}

export default function UpdateProfileEMailButton({ name, email }: UpdateProfileEmailButtonProps) {
  const [state, action, pending] = useActionState(updateCurrentUserEmailAction.bind(null, name), undefined);
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
        <button className="text-app-text-color hover:text-app-primary-color hover:cursor-pointer">
          <i className="bxs bx-pen-draw text-lg"></i>
        </button>
      </DialogTrigger>

      <DialogContent className="rounded-none sm:max-w-[425px]">
        <form action={action} className="space-y-8">
          <DialogHeader className="flex flex-col gap-4">
            <DialogTitle className="text-app-text-color">Update Email</DialogTitle>

            <DialogDescription className="text-gray-500">Change your email and click update to update your email.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="w-max text-xs text-app-text-color">
              Email
            </Label>

            <Input
              autoComplete="off"
              type="email"
              name="email"
              id="email"
              defaultValue={state?.values.email ? state.values.email : email}
              className="rounded-none text-sm text-app-text-color"
              placeholder="Enter your new name"
            />

            {state?.errors?.email && <p className="text-red-600 text-xs">*{state.errors.email}</p>}
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
