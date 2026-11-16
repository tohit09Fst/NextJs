import { Skeleton } from "@/components/ui/skeleton";

export function CountryCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-5 space-y-4">
        <div>
          <Skeleton className="h-5 w-3/4 mb-1" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-3/6" />
        </div>
        <Skeleton className="h-9 w-full rounded-xl mt-4" />
      </div>
    </div>
  );
}

export function CountryGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CountryCardSkeleton key={index} />
      ))}
    </div>
  );
}

