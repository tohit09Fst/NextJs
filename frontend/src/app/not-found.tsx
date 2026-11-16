import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-6">
        <Compass className="h-8 w-8 animate-spin duration-1000" />
      </div>
      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
        404 Error
      </span>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Country Not Found
      </h2>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        We couldn&apos;t find the country or page you are looking for. It may have been
        misspelled or does not exist in our global registry.
      </p>

      <div className="mt-6">
        <Link href="/">
          <Button className="rounded-xl">
            <Home className="h-4 w-4" />
            <span>Return to Atlas Home</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

