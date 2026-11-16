export interface CountryName {
  common: string;
  official: string;
  nativeName?: Record<string, { official: string; common: string }>;
}

export interface CountryFlags {
  png: string;
  svg: string;
  alt?: string;
}

export interface CurrencyItem {
  name: string;
  symbol?: string;
}

export type CountryCurrencies = Record<string, CurrencyItem>;
export type CountryLanguages = Record<string, string>;

export interface CountryMaps {
  googleMaps: string;
  openStreetMaps?: string;
}

export interface Country {
  name: CountryName;
  flags: CountryFlags;
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  languages?: CountryLanguages;
  currencies?: CountryCurrencies;
  timezones?: string[];
  borders?: string[];
  maps?: CountryMaps;
  cca3: string;
}

export type RegionFilter = "All" | "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "population-desc"
  | "population-asc"
  | "area-desc";

