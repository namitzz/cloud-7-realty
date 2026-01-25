/**
 * Shared type definitions for property data
 */

export interface PropertyImage {
  url: string;
  alt: string;
  fileId?: string;
}

export interface PropertyData {
  slug: string;
  title: string;
  subtitle: string;
  price: string;
  size: string;
  location: string;
  status: "Buy" | "Rent" | "Land";

  // Card / cover image
  imageUrl: string;

  // Full gallery
  images: PropertyImage[];

  // Drive folder reference (optional)
  driveFolderId?: string;

  // MUST be string[] so map() is typed
  features: string[];
}

export type PropertyStatus = "Buy" | "Rent";

export interface Property {
  slug: string;
  title: string;
  location: string;
  price: string;
  area?: string;
  status: PropertyStatus;
  images?: string[];
}
