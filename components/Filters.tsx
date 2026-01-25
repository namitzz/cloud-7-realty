"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface FiltersProps {
  locationOptions?: FilterOption[];
  statusOptions?: FilterOption[];
  resultCount?: number;
}

export default function Filters({
  locationOptions = [
    { label: "All Locations", value: "" },
    { label: "Downtown", value: "downtown" },
    { label: "Suburbs", value: "suburbs" },
    { label: "Highway", value: "highway" }
  ],
  statusOptions = [
    { label: "All Status", value: "" },
    { label: "Buy", value: "Buy" },
    { label: "Rent", value: "Rent" },
    { label: "Land", value: "Land" }
  ],
  resultCount = 0
}: FiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    status: searchParams.get("status") || ""
  });

  const updateFilters = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Build query string
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    
    // Update URL without page reload
    const query = params.toString();
    router.push(query ? `?${query}` : window.location.pathname, { scroll: false });
  };

  const resetFilters = () => {
    setFilters({ location: "", status: "" });
    router.push(window.location.pathname, { scroll: false });
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== "");

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Filters</h2>
        <p className="text-sm text-neutral-600">{resultCount} properties found</p>
      </div>

      {/* Filter Sections */}
      <div className="space-y-6">
        {/* Location Filter */}
        <div>
          <label className="block text-sm font-semibold mb-3">Location</label>
          <div className="space-y-2">
            {locationOptions.map(option => (
              <label key={option.value} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="location"
                  value={option.value}
                  checked={filters.location === option.value}
                  onChange={(e) => updateFilters("location", e.target.value)}
                  className="w-4 h-4 text-accent focus:ring-accent focus:ring-2 border-neutral-300"
                />
                <span className="ml-3 text-sm text-neutral-700 group-hover:text-neutral-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="pt-6 border-t border-neutral-200">
          <label className="block text-sm font-semibold mb-3">Status</label>
          <div className="space-y-2">
            {statusOptions.map(option => (
              <label key={option.value} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={filters.status === option.value}
                  onChange={(e) => updateFilters("status", e.target.value)}
                  className="w-4 h-4 text-accent focus:ring-accent focus:ring-2 border-neutral-300"
                />
                <span className="ml-3 text-sm text-neutral-700 group-hover:text-neutral-900">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="mt-6 w-full px-4 py-2 text-sm font-medium text-neutral-600 hover:text-foreground bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
