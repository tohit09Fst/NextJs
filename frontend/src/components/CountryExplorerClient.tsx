"use client";

import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal, ArrowUpDown, Globe, RotateCcw } from "lucide-react";
import { Country, RegionFilter, SortOption } from "@/types/country";
import { CountryCard } from "@/components/CountryCard";
import { Button } from "@/components/ui/button";

interface CountryExplorerClientProps {
  initialCountries: Country[];
}

const REGIONS: RegionFilter[] = [
  "All",
  "Africa",
  "Americas",
  "Asia",
  "Europe",
  "Oceania",
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Name (A–Z)", value: "name-asc" },
  { label: "Name (Z–A)", value: "name-desc" },
  { label: "Population (High–Low)", value: "population-desc" },
  { label: "Population (Low–High)", value: "population-asc" },
  { label: "Area (Largest)", value: "area-desc" },
];

export function CountryExplorerClient({
  initialCountries,
}: CountryExplorerClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>("All");
  const [selectedSort, setSelectedSort] = useState<SortOption>("name-asc");
  const [visibleCount, setVisibleCount] = useState(24);

  // Filter & Sort Logic
  const filteredAndSortedCountries = useMemo(() => {
    let result = [...initialCountries];

    // Filter by Region
    if (selectedRegion !== "All") {
      result = result.filter(
        (c) => c.region?.toLowerCase() === selectedRegion.toLowerCase()
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.common.toLowerCase().includes(q) ||
          c.name.official.toLowerCase().includes(q) ||
          c.capital?.some((cap) => cap.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (selectedSort) {
        case "name-asc":
          return a.name.common.localeCompare(b.name.common);
        case "name-desc":
          return b.name.common.localeCompare(a.name.common);
        case "population-desc":
          return (b.population || 0) - (a.population || 0);
        case "population-asc":
          return (a.population || 0) - (b.population || 0);
        case "area-desc":
          return (b.area || 0) - (a.area || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [initialCountries, searchQuery, selectedRegion, selectedSort]);

  const visibleCountries = useMemo(() => {
    return filteredAndSortedCountries.slice(0, visibleCount);
  }, [filteredAndSortedCountries, visibleCount]);

  const hasMore = visibleCount < filteredAndSortedCountries.length;

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedRegion("All");
    setSelectedSort("name-asc");
    setVisibleCount(24);
  };

  const isFiltered = searchQuery !== "" || selectedRegion !== "All";

  return (
    <div className="space-y-8">
      {/* Controls Container: Search, Region Filter & Sort Options */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
          {/* Search Bar */}
          <div className="relative md:col-span-6 lg:col-span-5">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(24);
              }}
              placeholder="Search by country, official name, or capital..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 transition-colors"
                title="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Region Filter Dropdown */}
          <div className="relative md:col-span-3 lg:col-span-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 hidden lg:inline">
                Region:
              </span>
              <div className="relative w-full">
                <select
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value as RegionFilter);
                    setVisibleCount(24);
                  }}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-none transition-all hover:bg-slate-100/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                >
                  {REGIONS.map((region) => (
                    <option key={region} value={region}>
                      {region === "All" ? "All Regions" : region}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Sorting Dropdown */}
          <div className="relative md:col-span-3 lg:col-span-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 hidden lg:inline">
                Sort:
              </span>
              <div className="relative w-full">
                <select
                  value={selectedSort}
                  onChange={(e) => {
                    setSelectedSort(e.target.value as SortOption);
                  }}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm font-medium text-slate-700 outline-none transition-all hover:bg-slate-100/70 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters & Counter Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">
              {filteredAndSortedCountries.length}
            </span>
            <span className="text-slate-500">
              {filteredAndSortedCountries.length === 1 ? "country" : "countries"} found
            </span>

            {isFiltered && (
              <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 border border-indigo-100">
                Filtered view
              </span>
            )}
          </div>

          {isFiltered && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Grid or Empty State */}
      {filteredAndSortedCountries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-16 px-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
            <Globe className="h-8 w-8 text-indigo-500 animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No countries found</h3>
          <p className="mt-1 text-sm text-slate-500 max-w-md">
            No country matches your search for{" "}
            <span className="font-semibold text-slate-700">
              &quot;{searchQuery}&quot;
            </span>{" "}
            in {selectedRegion === "All" ? "any region" : selectedRegion}. Try adjusting your keywords or clearing filters.
          </p>
          <Button
            onClick={handleResetFilters}
            variant="outline"
            className="mt-6 rounded-xl border-slate-200"
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleCountries.map((country) => (
              <CountryCard
                key={country.name.common || country.cca3}
                country={country}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex flex-col items-center justify-center gap-3 pt-6 pb-4">
              <p className="text-xs text-slate-500">
                Showing {visibleCountries.length} of{" "}
                {filteredAndSortedCountries.length} countries
              </p>
              <Button
                onClick={() => setVisibleCount((prev) => prev + 24)}
                variant="outline"
                className="h-11 px-8 rounded-xl bg-white border-slate-200 shadow-xs hover:bg-slate-50 font-medium"
              >
                Load More Countries
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

