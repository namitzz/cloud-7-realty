import Link from "next/link";
import FeaturedProperties from "@/components/FeaturedProperties";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import TrustStrip from "@/components/TrustStrip";
import { getFeaturedProperties } from "@/lib/data";

export const revalidate = 300; // 5 minutes

export default async function Home() {
  const properties = await getFeaturedProperties();

  return (
    <>
      <Hero />

      {/* Featured Properties */}
      <section id="properties" className="py-16">
        <FeaturedProperties properties={properties} />

        {/* Show more properties button (site-consistent style) */}
        <div className="mt-12 flex justify-center">
          <Link href="/properties" className="btn btn-primary">
            View all properties
          </Link>
        </div>
      </section>

      <Testimonials />
      <TrustStrip />
    </>
  );
}