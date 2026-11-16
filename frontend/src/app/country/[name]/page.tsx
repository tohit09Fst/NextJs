import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowLeft,
  Building,
  Globe2,
  Users,
  Maximize2,
  Languages as LanguagesIcon,
  Coins,
  Clock,
  Compass,
  MapPin,
  ExternalLink,
  Flag,
} from "lucide-react";
import { getCountryByName, getBorderCountries } from "@/lib/api";
import { formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface CountryPageProps {
  params: Promise<{
    name: string;
  }>;
}

export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const { name } = await params;
  const country = await getCountryByName(name);

  if (!country) {
    return {
      title: "Country Not Found | Country Explorer",
    };
  }

  return {
    title: `${country.name.common} - Country Explorer`,
    description: `Explore detailed demographics, capital, languages, currency, and geography of ${country.name.common} (${country.name.official}).`,
  };
}

export default async function CountryDetailPage({ params }: CountryPageProps) {
  const { name } = await params;
  const country = await getCountryByName(name);

  if (!country) {
    notFound();
  }

  // Resolve borders
  const borders = country.borders || [];
  const resolvedBorders = await getBorderCountries(borders);

  const flagUrl = country.flags.svg || country.flags.png;
  const flagAlt = country.flags.alt || `Flag of ${country.name.common}`;
  const capital = country.capital?.[0] || "N/A";
  const formattedPopulation = formatNumber(country.population);
  const formattedArea = country.area ? `${formatNumber(country.area)} km²` : "N/A";

  // Parse languages
  const languagesList = country.languages
    ? Object.values(country.languages)
    : [];

  // Parse currencies
  const currenciesList = country.currencies
    ? Object.entries(country.currencies).map(([code, cur]) => {
        const symbolStr = cur.symbol ? ` (${cur.symbol})` : "";
        return `${cur.name}${symbolStr} [${code}]`;
      })
    : [];

  // Parse timezones
  const timezonesList = country.timezones || [];

  return (
    <div className="min-h-screen py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation / Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-xs transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all countries</span>
          </Link>
        </div>

        {/* Main Country Card / Details */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Column: Flag Display */}
            <div className="relative flex flex-col items-center justify-center border-b border-slate-100 bg-slate-100/70 p-6 sm:p-10 lg:col-span-5 lg:border-b-0 lg:border-r">
              <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-md flex items-center justify-center min-h-[220px]">
                {flagUrl ? (
                  <img
                    src={flagUrl}
                    alt={flagAlt}
                    className="h-auto w-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 gap-2 p-8 text-center">
                    <Globe2 className="h-12 w-12 text-slate-300" />
                    <span className="text-sm font-medium text-slate-400">
                      Flag not available
                    </span>
                  </div>
                )}
              </div>

              {country.flags.alt && (
                <div className="mt-4 max-w-md text-center">
                  <p className="text-xs text-slate-500 italic">
                    &quot;{country.flags.alt}&quot;
                  </p>
                </div>
              )}

              {/* External Maps Action */}
              {country.maps?.googleMaps && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={country.maps.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>View on Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  {country.maps.openStreetMaps && (
                    <a
                      href={country.maps.openStreetMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors"
                    >
                      <Compass className="h-4 w-4 text-indigo-500" />
                      <span>OpenStreetMap</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Country Metadata & Stats */}
            <div className="p-6 sm:p-10 lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Header Information */}
                <div className="border-b border-slate-100 pb-6 mb-6">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="indigo" className="text-xs px-3 py-1">
                      {country.region}
                    </Badge>
                    {country.subregion && (
                      <Badge variant="secondary" className="text-xs px-3 py-1">
                        {country.subregion}
                      </Badge>
                    )}
                    <span className="ml-auto text-xs font-mono font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                      CCA3: {country.cca3}
                    </span>
                  </div>

                  <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
                    {country.name.common}
                  </h1>
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Official Name:{" "}
                    <span className="text-slate-800">
                      {country.name.official}
                    </span>
                  </p>
                </div>

                {/* Key Statistics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {/* Capital */}
                  <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100/70 text-indigo-600">
                      <Building className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        Capital City
                      </p>
                      <p className="mt-0.5 font-bold text-slate-900">
                        {capital}
                      </p>
                    </div>
                  </div>

                  {/* Population */}
                  <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100/70 text-indigo-600">
                      <Users className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        Total Population
                      </p>
                      <p className="mt-0.5 font-bold text-slate-900">
                        {formattedPopulation}
                      </p>
                    </div>
                  </div>

                  {/* Area */}
                  <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100/70 text-indigo-600">
                      <Maximize2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        Total Area
                      </p>
                      <p className="mt-0.5 font-bold text-slate-900">
                        {formattedArea}
                      </p>
                    </div>
                  </div>

                  {/* Region & Subregion */}
                  <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100/70 text-indigo-600">
                      <Globe2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        Geographic Region
                      </p>
                      <p className="mt-0.5 font-bold text-slate-900">
                        {country.region}
                        {country.subregion ? ` (${country.subregion})` : ""}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Cultural & Demographic Details */}
                <div className="space-y-5 border-t border-slate-100 pt-6">
                  {/* Languages */}
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      <LanguagesIcon className="h-4 w-4 text-indigo-500" />
                      Languages Spoken
                    </h3>
                    {languagesList.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {languagesList.map((lang, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">None specified</p>
                    )}
                  </div>

                  {/* Currencies */}
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      <Coins className="h-4 w-4 text-indigo-500" />
                      Official Currencies
                    </h3>
                    {currenciesList.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {currenciesList.map((cur, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                          >
                            {cur}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">None specified</p>
                    )}
                  </div>

                  {/* Timezones */}
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      <Clock className="h-4 w-4 text-indigo-500" />
                      Timezones
                    </h3>
                    {timezonesList.length > 0 ? (
                      <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-1">
                        {timezonesList.map((tz, idx) => (
                          <span
                            key={idx}
                            className="rounded-lg border border-slate-200/80 bg-white px-2.5 py-1 text-xs font-mono font-medium text-slate-600"
                          >
                            {tz}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500">None specified</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Border Countries Section */}
              <div className="mt-8 border-t border-slate-100 pt-6">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  <Flag className="h-4 w-4 text-indigo-500" />
                  Bordering Countries
                </h3>
                {resolvedBorders.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {resolvedBorders.map((b) => (
                      <Link
                        key={b.code}
                        href={`/country/${encodeURIComponent(b.name)}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-2xs transition-all hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <span className="font-semibold text-slate-900">
                          {b.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          ({b.code})
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    This country has no land borders (island nation or isolated territory).
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

