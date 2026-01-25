"use client";

import PropertyCard from "@/components/PropertyCard";
import { PropertyStatus } from "@/lib/data";
import { useMemo, useState } from "react";

interface Property {
  slug: string;
  title: string;
  location: string;
  status: PropertyStatus;
  price: string;
  area?: string;
  images?: string[];
  coverImage?: string;
}

export default function PropertyGrid({ properties }: { properties: Property[] }) {
  const [status, setStatus] = useState<PropertyStatus | "All">("All");
  const [location, setLocation] = useState<string>("All");

  const locations = useMemo(
    () => ["All", ...Array.from(new Set(properties.map(p => p.location)))],
    [properties]
  );

  const filtered = useMemo(() => {
    return properties.filter(p => {
      const statusMatch = status === "All" || p.status === status;
      const locationMatch = location === "All" || p.location === location;
      return statusMatch && locationMatch;
    });
  }, [properties, status, location]);

  return (
    <>
      {/* 🔽 FILTER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex gap-4">
          {/* Location Dropdown */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="px-4 py-2 rounded-lg border bg-white text-sm shadow-sm"
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>
                {loc === "All" ? "All Locations" : loc}
              </option>
            ))}
          </select>

          {/* Status Dropdown */}
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as PropertyStatus | "All")
            }
            className="px-4 py-2 rounded-lg border bg-white text-sm shadow-sm"
          >
            <option value="All">All Status</option>
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
            <option value="Land">Land</option>
          </select>
        </div>

        <div className="text-sm text-neutral-600">
          {filtered.length} properties found
        </div>
      </div>

      {/* 🏘 PROPERTY GRID */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(property => (
            <PropertyCard key={property.slug} {...property} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center text-neutral-500">
          No properties match your filters.
        </div>
      )}
    </>
  );
}
