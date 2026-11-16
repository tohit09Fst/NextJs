import { CountryGridSkeleton } from "@/components/CountrySkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <section className="border-b border-slate-200/80 bg-white py-16 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <Skeleton className="h-6 w-48 rounded-full mb-4" />
          <Skeleton className="h-12 w-80 rounded-xl mb-3" />
          <Skeleton className="h-5 w-96 rounded-lg mb-8" />
          <Skeleton className="h-8 w-72 rounded-lg" />
        </div>
      </section>

      {/* Main content skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-8">
        <Skeleton className="h-20 w-full rounded-2xl" />
        <CountryGridSkeleton count={8} />
      </section>
    </div>
  );
}

