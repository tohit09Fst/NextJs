import { Globe2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-indigo-600" />
            <span className="font-semibold text-slate-900">Country Explorer</span>
            <span className="text-xs text-slate-400">| Complete World Atlas</span>
          </div>
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Country Explorer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
