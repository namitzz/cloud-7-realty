"use client";

import { Property } from "@/lib/data";
import { fadeUp, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface FeaturedPropertiesProps {
  id?: string;
  properties: Property[];
}

export default function FeaturedProperties({
  id = "properties",
  properties,
}: FeaturedPropertiesProps) {
  const featuredProperties = properties.slice(0, 3);

  if (featuredProperties.length === 0) return null;

  return (
    <section
      id={id}
      className="py-20 sm:py-28 bg-gradient-to-br from-background via-luxury-50 to-background relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="text-luxury-gold text-sm font-semibold tracking-[0.25em] uppercase block mb-4">
            Premium Selection
          </span>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-luxury-navy via-luxury-slate to-luxury-navy bg-clip-text text-transparent">
            Featured Properties
          </h2>

          <p className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed">
            A curated selection of our most sought-after properties.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {featuredProperties.map((property, index) => {
            const heroImage =
              property.images?.[0] ||
              property.coverImage ||
              "/placeholder.jpg";

            return (
              <motion.div key={property.slug} variants={fadeUp}>
                <Link
                  href={`/properties/${property.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-luxury-gold/10 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                    <span className="absolute top-4 right-4 z-10 px-4 py-1.5 bg-luxury-gold text-white text-xs font-semibold rounded-full shadow-md">
                      {property.status}
                    </span>

                    <Image
                      src={heroImage}
                      alt={property.title}
                      fill
                      unoptimized
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-7">
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3 group-hover:text-luxury-gold transition-colors">
                      {property.title}
                    </h3>

                    <p className="text-neutral-600 text-base">
                      {property.location}
                    </p>

                    <div className="mt-4 flex items-center text-luxury-gold font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                      Explore Property →
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
