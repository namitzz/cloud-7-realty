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
      <FeaturedProperties
        id="properties"
        properties={properties}
      />
      <Testimonials />
      <TrustStrip />
    </>
  );
}
