import { Property, PropertyStatus } from "./data";

type RawPropertyRow = {
  id?: unknown;
  title?: unknown;
  location?: unknown;
  area?: unknown;
  status?: unknown;
  price?: unknown;
  images?: unknown;
  description?: unknown;
  featured?: unknown;
};

const VALID_STATUSES: PropertyStatus[] = ["Buy", "Rent", "Land"];

export function validateProperty(row: unknown): Property {
  if (typeof row !== "object" || row === null) {
    throw new Error("Invalid property row");
  }

  const r = row as RawPropertyRow;

  const status =
    typeof r.status === "string" && VALID_STATUSES.includes(r.status as PropertyStatus)
      ? (r.status as PropertyStatus)
      : "Buy";

  return {
    id: typeof r.id === "string" ? r.id : crypto.randomUUID(),
    slug:
      typeof r.title === "string"
        ? r.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
        : "property",
    title: typeof r.title === "string" ? r.title : "Untitled Property",
    location: typeof r.location === "string" ? r.location : "",
    area: typeof r.area === "string" ? r.area : "",
    status,
    price: typeof r.price === "string" ? r.price : "",
    images: Array.isArray(r.images)
      ? r.images.filter((i): i is string => typeof i === "string")
      : [],
    description: typeof r.description === "string" ? r.description : "",
    featured: typeof r.featured === "boolean" ? r.featured : false,
    coverImage:
      Array.isArray(r.images) && typeof r.images[0] === "string"
        ? r.images[0]
        : "/placeholder.jpg",
  };
}
