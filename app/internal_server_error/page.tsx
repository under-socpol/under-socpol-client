import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function InternalServerError() {
  return (
    <main className="bg-background mx-auto max-w-screen-lg min-h-screen flex flex-col justify-center items-center gap-12">
      <img src="/images/logo.png" alt="logo" className="size-24" />

      <div className="flex flex-col justify-center items-center gap-8">
        <h1 className="text-7xl font-bold text-center">500</h1>

        <div className="flex flex-col gap-4">
          <p className="text-xl text-primary text-center">Oops! Something went wrong on our end</p>

          <p className="text-sm text-gray-500 text-center">Please try again later. Go back to home and continue exploring.</p>
        </div>

        <Link href="/" className="w-max">
          <Button className="rounded-none text-sm text-app-background-color hover:cursor-pointer">Back to Home</Button>
        </Link>
      </div>
    </main>
  );
}
