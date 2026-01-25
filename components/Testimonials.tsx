"use client";

import { fadeUp, stagger } from "@/lib/motion";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote:
      "We found our dream home with Cloud Seven. The team's dedication and expertise made the entire process seamless and enjoyable.",
    name: "Dr Showkat Khan",
    role: "",
  },
  {
    id: 2,
    quote:
      "Cloud Seven provided exceptional support in selling our property. Their professionalism and guidance were truly commendable.",
    name: "Saumya Taneja",
    role: "",
  },
  {
    id: 3,
    quote:
      "The Cloud Seven team understood our requirements perfectly and helped us secure a perfect rental property. Highly recommended!",
    name: "Kafeel Gillani",
    role: "",
  },
];


export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-br from-luxury-navy via-luxury-slate to-luxury-navy text-white overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-navy/50 via-transparent to-luxury-navy/50" />

      <div className="relative z-10 container-custom">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <span className="text-luxury-gold text-sm font-bold tracking-[0.25em] uppercase">
              Success Stories
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4">
            What Our <span className="text-luxury-gold">Clients</span> Say
          </h2>
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto">
            Real experiences from real people who found their dream properties with us
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={fadeUp}
              className="group relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-luxury-gold/20 hover:border-luxury-gold/50 hover:bg-white/15 transition-all duration-500 hover:scale-105 hover:shadow-luxury"
            >
              {/* Quote icon with gradient */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-luxury-gold to-luxury-darkGold rounded-full flex items-center justify-center shadow-luxury">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              
              <p className="text-lg mb-8 text-white/90 leading-relaxed mt-4 font-light">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center border-t border-luxury-gold/30 pt-6">
                {/* Avatar circle */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-luxury-gold to-luxury-darkGold flex items-center justify-center text-white font-bold text-lg mr-4 shadow-md">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-luxury-gold text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-neutral-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Star rating */}
              <div className="mt-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
