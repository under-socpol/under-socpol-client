import Link from "next/link";

import { Button } from "./ui/button";

export default function FailedToLoadContent() {
  return (
    <main className="bg-app-background-color mx-auto max-w-screen-lg min-h-[calc(100vh-(4.25rem+3.719rem))] md:min-h-[calc(100vh-(4.25rem+3.469rem))] flex flex-col justify-center items-center gap-12">
      <img src="/images/logo.png" alt="logo" className="size-24" />

      <div className="flex flex-col justify-center items-center gap-8">
        <h1 className="text-4xl font-bold text-app-text-color text-center">Failed to load content</h1>

        <div className="flex flex-col gap-4">
          <p className="text-xl text-app-text-color text-center">Oops! Something went wrong while loading the content.</p>

          <p className="text-sm text-gray-500 text-center">Please try reloading the page or go back to the homepage.</p>
        </div>

        <Link href="/" className="w-max">
          <Button type="button" className="rounded-none text-sm text-app-background-color hover:cursor-pointer">
            Back to Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
