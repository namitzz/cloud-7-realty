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
  /**
   * ✅ FEATURED LOGIC
   * 1. Show only properties marked as featured
   * 2. Limit to max 3
   * 3. If none marked, fallback to first 3
   */
  const featuredProperties = properties.slice(0, 3);


  if (featuredProperties.length === 0) {
    return null;
  }

  return (
    <section
      id={id}
      className="py-20 sm:py-28 bg-gradient-to-br from-background via-luxury-50 to-background relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Heading */}
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
            A curated selection of our most sought-after properties, chosen for
            location, value, and long-term potential.
          </p>
        </motion.div>

        {/* Grid */}
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
                  className="group block bg-white rounded-2xl overflow-hidden border border-luxury-gold/10 shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:ring-offset-4"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                    <span className="absolute top-4 right-4 z-10 px-4 py-1.5 bg-luxury-gold text-white text-xs font-semibold rounded-full shadow-md">
                      {property.status}
                    </span>

                    <Image
                      src={heroImage}
                      alt={property.title}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-7">
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3 group-hover:text-luxury-gold transition-colors">
                      {property.title}
                    </h3>

                    <p className="text-neutral-600 flex items-center text-base">
                      <svg
                        className="w-5 h-5 mr-2 text-luxury-gold"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {property.location}
                    </p>

                    <div className="mt-4 flex items-center text-luxury-gold font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                      Explore Property
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
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
