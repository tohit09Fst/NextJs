import Link from "next/link";
import { Globe2 } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-transform hover:scale-[1.01]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white shadow-md shadow-indigo-500/20 group-hover:shadow-indigo-500/30 transition-all">
            <Globe2 className="h-5 w-5 transition-transform group-hover:rotate-12 duration-300" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              Country Explorer
            </span>
            <span className="hidden sm:inline-block ml-2 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-indigo-700 uppercase border border-indigo-100">
              Atlas
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
