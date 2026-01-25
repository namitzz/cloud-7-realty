import PropertyGrid from "@/components/Propertygrid";
import TrustStrip from "@/components/TrustStrip";
import { getAllProperties } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties - Cloud Seven Realty",
  description:
    "Browse verified properties for buy, rent, and land with Cloud Seven Realty.",
};

export const revalidate = 300;

export default async function PropertiesPage() {
  const properties = await getAllProperties();

  return (
    <>
      {/* Page Header */}
      <header className="bg-neutral-50 py-12 sm:py-16 border-b border-neutral-200">
        <div className="container-custom">
          <nav className="mb-4 text-sm text-neutral-500">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-neutral-800">Properties</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Properties
          </h1>

          <p className="text-lg text-neutral-600 max-w-2xl">
            Explore verified properties available for purchase, rent, or
            long-term investment.
          </p>
        </div>
      </header>

      {/* Properties Grid + Filters */}
      <section className="py-10 sm:py-14">
        <div className="container-custom">
          {properties.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-xl font-semibold mb-2">
                No properties available
              </h2>
              <p className="text-neutral-600 text-sm max-w-md mx-auto">
                Properties are managed via Google Sheets. Please check back
                shortly or contact us for assistance.
              </p>
            </div>
          ) : (
            <PropertyGrid properties={properties} />
          )}
        </div>
      </section>

      {/* Trust / Proof Section */}
      <TrustStrip />
    </>
  );
}
