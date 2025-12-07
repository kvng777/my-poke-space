import Filters from "./ui/Filters";
import Listing from "./ui/Listing";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center px-40 bg-white dark:bg-black sm:items-start">
        <p className="text-center w-full">Welcome to Pokemon world</p>
        <Filters />
        <Listing />
      </main>
    </div>
  );
}
