import { getCache, setCache } from "./cache";
import { fetchPropertiesFromSheet } from "./google/sheets";

export type PropertyStatus = "Buy" | "Rent" | "Land";

export interface Property {
  id: string;
  slug: string;
  title: string;
  location: string;
  area: string;
  status: PropertyStatus;
  price: string;
  coverImage: string;
  images: string[];
  description?: string;
  featured?: boolean;
}

/**
 * Convert title → URL-safe slug
 */
function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-");
}

/**
 * Fetch all properties (cached)
 */
export async function getAllProperties(): Promise<Property[]> {
  const CACHE_KEY = "all-properties";
  const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  const cached = getCache<Property[]>(CACHE_KEY);
  if (cached) return cached;

  try {
    const rows = await fetchPropertiesFromSheet();
    const validStatuses: PropertyStatus[] = ["Buy", "Rent", "Land"];

    const properties: Property[] = rows.map((row) => {
      const normalizedStatus =
        row.status === "RENTAL"
          ? "Rent"
          : row.status === "SALE"
          ? "Buy"
          : validStatuses.includes(row.status as PropertyStatus)
          ? (row.status as PropertyStatus)
          : "Buy";

      const images = row.images ?? [];

      return {
        id: row.id,
        slug: slugify(row.title),
        title: row.title,
        location: row.location,
        area: row.area,
        status: normalizedStatus,
        price: row.price,
        images,
        coverImage: images[0] ?? "/placeholder.jpg",
        description: row.description || "",
        featured: row.featured ?? false,
      };
    });

    setCache(CACHE_KEY, properties, CACHE_TTL);
    return properties;
  } catch (error) {
    console.error("❌ Failed to fetch properties:", error);
    return [];
  }
}

/**
 * Featured properties
 */
export async function getFeaturedProperties(): Promise<Property[]> {
  const all = await getAllProperties();
  const featured = all.filter((p) => p.featured);
  return featured.length ? featured.slice(0, 3) : all.slice(0, 3);
}

/**
 * Fetch single property by slug
 */
export async function getPropertyBySlug(slug: string) {
  const all = await getAllProperties();
  return all.find((p) => p.slug === slug) ?? null;
}
