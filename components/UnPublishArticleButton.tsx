"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { unPublishArticleAction } from "@/actions/articles.actions";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";

export default function UnPublishArticleButton({ id }: { id: string }) {
  const [state, action, pending] = useActionState(unPublishArticleAction.bind(null, id), undefined);
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
        <Button className="rounded-none bg-app-background-color hover:bg-app-text-color border border-app-text-color text-sm text-app-text-color hover:text-app-background-color hover:cursor-pointer">
          Unpublish
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-none sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-app-text-color">Unpublish Article</DialogTitle>

          <DialogDescription className="text-gray-500">
            Are you sure you want to unpublish this article? It will no longer be visible to users until you publish it again.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button" className="rounded-none w-full md:w-max text-sm text-app-text-color hover:cursor-pointer">
              Cancel
            </Button>
          </DialogClose>

          <form action={action}>
            <Button disabled={pending} type="submit" className="rounded-none text-sm text-app-background-color hover:cursor-pointer">
              {pending ? "Unpublishing..." : "Unpublish"}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
