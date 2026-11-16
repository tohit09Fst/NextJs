import Link from "next/link";
import { ArrowRight, MapPin, Users, Building, Globe2 } from "lucide-react";
import { Country } from "@/types/country";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/utils";

interface CountryCardProps {
  country: Country;
}

export function CountryCard({ country }: CountryCardProps) {
  const commonName = country.name.common;
  const officialName = country.name.official;
  const capital = country.capital?.[0] || "N/A";
  const flagUrl = country.flags.svg || country.flags.png;
  const flagAlt = country.flags.alt || `Flag of ${commonName}`;
  const population = formatNumber(country.population);

  // Region color mapping for visually appealing tags
  const getRegionVariant = (region: string) => {
    switch (region.toLowerCase()) {
      case "europe":
        return "indigo";
      case "asia":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">
      {/* Flag Container with Aspect Ratio */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-100 border-b border-slate-100 flex items-center justify-center">
        {flagUrl ? (
          <img
            src={flagUrl}
            alt={flagAlt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 gap-1.5 p-4 text-center">
            <Globe2 className="h-8 w-8 text-slate-300" />
            <span className="text-xs font-medium text-slate-400">Flag unavailable</span>
          </div>
        )}
        {/* Region Tag Floating on Flag */}
        <div className="absolute top-3 right-3">
          <Badge
            variant={getRegionVariant(country.region)}
            className="shadow-sm backdrop-blur-md bg-white/95 text-slate-800 border-slate-200/80 font-medium"
          >
            {country.region}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Country Titles */}
        <div className="mb-4">
          <h2
            className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors"
            title={commonName}
          >
            {commonName}
          </h2>
          <p
            className="text-xs text-slate-500 line-clamp-1 mt-0.5"
            title={officialName}
          >
            {officialName}
          </p>
        </div>

        {/* Quick Facts */}
        <div className="space-y-2 text-xs text-slate-600 mb-5 flex-1">
          <div className="flex items-center gap-2">
            <Building className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
            <span className="text-slate-400">Capital:</span>
            <span className="font-medium text-slate-800 line-clamp-1">
              {capital}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
            <span className="text-slate-400">Population:</span>
            <span className="font-medium text-slate-800">{population}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
            <span className="text-slate-400">Region:</span>
            <span className="font-medium text-slate-800">
              {country.region}
              {country.subregion ? ` • ${country.subregion}` : ""}
            </span>
          </div>
        </div>

        {/* Details Button */}
        <Link
          href={`/country/${encodeURIComponent(commonName)}`}
          className="mt-auto inline-flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 transition-all hover:bg-indigo-600 hover:border-indigo-600 hover:text-white group-hover:shadow-sm"
        >
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

