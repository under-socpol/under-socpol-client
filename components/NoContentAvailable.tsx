export default function NoContentAvailable() {
  return (
    <main className="bg-app-background-color mx-auto max-w-screen-lg min-h-[calc(100vh-(4.25rem+3.719rem))] md:min-h-[calc(100vh-(4.25rem+3.469rem))] flex flex-col justify-center items-center gap-12">
      <img src="/images/logo.png" alt="logo" className="size-24" />

      <div className="flex flex-col justify-center items-center gap-8">
        <h1 className="text-4xl font-bold text-app-text-color text-center">No Content Available</h1>

        <div className="flex flex-col gap-4">
          <p className="text-xl text-app-text-color text-center">Oops! There's currently no content to display.</p>

          <p className="text-sm text-gray-500 text-center">Please try again later.</p>
        </div>
      </div>
    </main>
  );
}
