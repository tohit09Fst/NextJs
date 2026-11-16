import { Country } from "@/types/country";

const API_KEY = process.env.RESTCOUNTRIES_API_KEY || "";
const BASE_URL = "https://api.restcountries.com/countries/v5";

function mapCountry(raw: any): Country {
  return {
    name: {
      common: raw.names?.common || "",
      official: raw.names?.official || raw.names?.common || "",
    },
    flags: {
      png: raw.flag?.url_png || "",
      svg: raw.flag?.url_svg || raw.flag?.url_png || "",
      alt: raw.flag?.description || `Flag of ${raw.names?.common}`,
    },
    capital: raw.capitals?.map((c: any) => c.name) || [],
    region: raw.region || "Other",
    subregion: raw.subregion || "",
    population: raw.population || 0,
    area: raw.area?.kilometers || 0,
    languages: (raw.languages || []).reduce(
      (acc: any, l: any) => ({ ...acc, [l.name]: l.name }),
      {}
    ),
    currencies: (raw.currencies || []).reduce(
      (acc: any, c: any) => ({ ...acc, [c.code || c.name]: { name: c.name, symbol: c.symbol } }),
      {}
    ),
    timezones: raw.timezones || [],
    borders: raw.borders || [],
    maps: {
      googleMaps: raw.links?.google_maps || "",
      openStreetMaps: raw.links?.open_street_maps || "",
    },
    cca3: raw.codes?.alpha_3 || "",
  };
}

export async function getAllCountries(): Promise<Country[]> {
  try {
    // API uses 'offset' instead of 'page' (0, 100, 200 for 254 countries total)
    const offsets = [0, 100, 200];
    const results = await Promise.all(
      offsets.map(async (offset) => {
        const res = await fetch(`${BASE_URL}?api-key=${API_KEY}&limit=100&offset=${offset}`, {
          next: { revalidate: 86400 },
        });
        const json = await res.json();
        return (json.data?.objects || []).map(mapCountry);
      })
    );

    // Deduplicate by common name to guarantee each country appears only once
    const uniqueMap = new Map<string, Country>();
    for (const c of results.flat()) {
      if (c.name.common && !uniqueMap.has(c.name.common.toLowerCase())) {
        uniqueMap.set(c.name.common.toLowerCase(), c);
      }
    }
    return Array.from(uniqueMap.values());
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}

export async function getCountryByName(name: string): Promise<Country | null> {
  const decoded = decodeURIComponent(name).trim().toLowerCase();
  try {
    const res = await fetch(`${BASE_URL}?api-key=${API_KEY}&q=${encodeURIComponent(decoded)}`, {
      next: { revalidate: 86400 },
    });
    const json = await res.json();
    const list: Country[] = (json.data?.objects || []).map(mapCountry);
    return (
      list.find(
        (c) =>
          c.name.common.toLowerCase() === decoded ||
          c.name.official.toLowerCase() === decoded ||
          c.cca3.toLowerCase() === decoded
      ) || list[0] || null
    );
  } catch (error) {
    console.error("Error fetching country by name:", error);
    return null;
  }
}

export async function getBorderCountries(
  borders: string[] = []
): Promise<Array<{ code: string; name: string }>> {
  if (!borders.length) return [];
  const all = await getAllCountries();
  const map = new Map(all.map((c) => [c.cca3.toUpperCase(), c.name.common]));
  return borders.map((code) => ({
    code: code.toUpperCase(),
    name: map.get(code.toUpperCase()) || code,
  }));
}
