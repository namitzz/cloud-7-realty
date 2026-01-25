import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Areas - Cloud Seven Realty",
  description: "Explore real estate opportunities in different areas",
};

export default function AreasPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-neutral-50 py-12 sm:py-16">
        <div className="container-custom">
          <div className="mb-4 text-sm text-neutral-600">
            <span>Home</span> <span className="mx-2">/</span> <span>Areas</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
            Explore Areas
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Browse our properties by location. Use the properties page to filter by area.
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 sm:py-16">
        <div className="container-custom text-center">
          <p className="text-neutral-600 mb-8">
            This page can be customized to show area-specific information.
          </p>
          <Link href="/properties" className="btn btn-primary">
            Browse All Properties
          </Link>
        </div>
      </section>
    </>
  );
}
