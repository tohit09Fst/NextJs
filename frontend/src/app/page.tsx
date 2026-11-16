import { getAllCountries } from "@/lib/api";
import { CountryExplorerClient } from "@/components/CountryExplorerClient";
import { Globe2, Sparkles, MapPin, Users } from "lucide-react";

export const revalidate = 86400; // 24 hours ISR

export default async function HomePage() {
  const countries = await getAllCountries();

  // Compute summary metrics for hero section
  const totalCountries = countries.length;
  const totalPopulation = countries.reduce(
    (sum, c) => sum + (c.population || 0),
    0
  );
  const formattedWorldPop = (totalPopulation / 1_000_000_000).toFixed(2);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-indigo-50/20 to-slate-50/60 py-16 sm:py-24">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-96 w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-200/30 to-blue-200/20 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-white/90 px-3.5 py-1 text-xs font-semibold text-indigo-700 shadow-xs backdrop-blur-md mb-6">
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            <span>Interactive World Atlas & Demographic Directory</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Explore the <span className="text-indigo-600">World</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 sm:text-lg">
            Discover countries, cultures, populations and more. Real-time data
            powered by REST Countries API.
          </p>

          {/* Quick Metrics Bar */}
          <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-indigo-500" />
              <span className="font-bold text-slate-900">{totalCountries}</span>
              <span>Total Nations</span>
            </div>
            <div className="hidden h-3 w-px bg-slate-300 sm:block" />
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-indigo-500" />
              <span className="font-bold text-slate-900">6</span>
              <span>Global Regions</span>
            </div>
            <div className="hidden h-3 w-px bg-slate-300 sm:block" />
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-500" />
              <span className="font-bold text-slate-900">
                ~{formattedWorldPop}B
              </span>
              <span>World Population</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <CountryExplorerClient initialCountries={countries} />
      </section>
    </div>
  );
}
