export default function Loading() {
  return (
    <div className="bg-background min-h-[calc(100vh-(4.25rem+3.35rem))] md:min-h-[calc(100vh-(4.25rem+3.1rem))] flex justify-center items-center">
      <div className="w-24 h-24 flex justify-center items-center animate-pulse">
        <img src="/images/logo.png" alt="Loading Logo" className="w-full h-full animate-flicker" />
      </div>
    </div>
  );
}
