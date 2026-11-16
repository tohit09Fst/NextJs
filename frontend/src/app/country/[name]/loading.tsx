import { Skeleton } from "@/components/ui/skeleton";

export default function CountryLoading() {
  return (
    <div className="min-h-screen py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-10 w-44 rounded-xl mb-8" />
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="p-8 lg:col-span-5 bg-slate-50 flex flex-col items-center justify-center">
              <Skeleton className="h-64 w-full rounded-2xl" />
              <Skeleton className="h-10 w-48 rounded-xl mt-6" />
            </div>
            <div className="p-8 lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-10 w-3/4 rounded-xl" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-20 w-full rounded-2xl" />
                <Skeleton className="h-20 w-full rounded-2xl" />
                <Skeleton className="h-20 w-full rounded-2xl" />
                <Skeleton className="h-20 w-full rounded-2xl" />
              </div>
              <div className="space-y-3 pt-4">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

