"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createCategoryAction } from "@/actions/categories.actions";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function CreateCategoryButton() {
  const [state, action, pending] = useActionState(createCategoryAction, undefined);
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
          Create Category
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-none sm:max-w-[425px]">
        <form action={action} className="space-y-8">
          <DialogHeader>
            <DialogTitle className="text-app-text-color">Create Category</DialogTitle>

            <DialogDescription className="text-gray-500">Enter a name for the new category and click save to add it</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="w-max text-xs text-app-text-color">
              Name
            </Label>

            <Input
              autoComplete="off"
              type="text"
              name="name"
              id="name"
              className="rounded-none text-sm text-app-text-color"
              placeholder="Enter category name"
            />

            {state?.errors?.name && <p className="text-red-600 text-xs">*{state.errors.name}</p>}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description" className="w-max text-xs text-app-text-color">
              Description
            </Label>

            <Input
              autoComplete="off"
              type="text"
              name="description"
              id="description"
              className="rounded-none text-sm text-app-text-color"
              placeholder="Enter category description"
            />

            {state?.errors?.description && <p className="text-red-600 text-xs">*{state.errors.description}</p>}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" className="rounded-none w-full md:w-max text-sm text-app-text-color hover:cursor-pointer">
                Cancel
              </Button>
            </DialogClose>

            <Button disabled={pending} type="submit" className="rounded-none text-sm text-app-background-color hover:cursor-pointer">
              {pending ? "Creating Category..." : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
