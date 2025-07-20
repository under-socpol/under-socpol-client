"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { deleteCategoryAction } from "@/actions/categories.actions";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";

export default function DeleteCategoryButton({ id }: { id: string }) {
  const [state, action, pending] = useActionState(deleteCategoryAction.bind(null, id), undefined);
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
          <i className="bxs bx-trash text-lg"></i>
        </button>
      </DialogTrigger>

      <DialogContent className="rounded-none sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-app-text-color">Delete Category</DialogTitle>

          <DialogDescription className="text-gray-500">Are you sure you want to delete this category? This action cannot be undone</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button" className="rounded-none w-full md:w-max text-sm text-app-text-color hover:cursor-pointer">
              Cancel
            </Button>
          </DialogClose>

          <form action={action}>
            <Button disabled={pending} type="submit" className="rounded-none text-sm text-app-background-color hover:cursor-pointer">
              {pending ? "Deleting Category..." : "Delete Category"}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
