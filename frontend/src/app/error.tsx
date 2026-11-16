"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 mb-6">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Something went wrong
      </h2>
      <p className="mt-2 max-w-md text-sm text-slate-500">
        We encountered an error while retrieving country data. Please check your
        network connection or try again.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={() => reset()} className="rounded-xl">
          <RefreshCw className="h-4 w-4" />
          <span>Try again</span>
        </Button>
        <Link href="/">
          <Button variant="outline" className="rounded-xl border-slate-200">
            <Home className="h-4 w-4" />
            <span>Go to Homepage</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

