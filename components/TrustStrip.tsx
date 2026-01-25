"use client";

import { fadeUp, stagger } from "@/lib/motion";
import {
  ChatBubbleLeftRightIcon,
  CheckBadgeIcon,
  TrophyIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function TrustStrip() {
  const facts = [
    {
      icon: CheckBadgeIcon,
      title: "Verified Titles",
      description: "All properties legally verified",
    },
    {
      icon: UsersIcon,
      title: "On-Ground Team",
      description: "Local support for site visits",
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "WhatsApp in Minutes",
      description: "Quick response guaranteed",
    },
    {
      icon: TrophyIcon,
      title: "Trusted Partner",
      description: "100+ successful deals",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-neutral-50 border-t border-neutral-200">
      <div className="container-custom">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {facts.map((fact, index) => {
            const Icon = fact.icon;

            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="
                  group rounded-2xl border border-neutral-200 bg-white
                  px-6 py-8 text-center
                  transition-all duration-300
                  hover:border-luxury-gold/40
                  hover:bg-luxury-navy
                "
              >
                {/* Icon */}
                <div
                  className="
                    mx-auto mb-5 flex h-12 w-12 items-center justify-center
                    rounded-full border border-neutral-300
                    text-luxury-navy
                    transition-colors duration-300
                    group-hover:border-luxury-gold/60
                    group-hover:text-luxury-gold
                  "
                >
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3
                  className="
                    font-serif text-lg font-semibold
                    text-luxury-navy
                    transition-colors duration-300
                    group-hover:text-white
                  "
                >
                  {fact.title}
                </h3>

                {/* Description */}
                <p
                  className="
                    mt-2 text-sm leading-relaxed
                    text-neutral-600
                    transition-colors duration-300
                    group-hover:text-neutral-300
                  "
                >
                  {fact.description}
                </p>

                {/* Accent line */}
                <div
                  className="
                    mx-auto mt-5 h-px w-10
                    bg-luxury-gold/50
                    transition-opacity duration-300
                    group-hover:opacity-80
                  "
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
