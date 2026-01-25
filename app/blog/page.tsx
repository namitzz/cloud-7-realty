export default function BlogPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-luxury-gold/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-luxury-gold/10 blur-3xl" />

      <div className="container-custom relative py-24">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <span className="inline-block mb-4 text-sm font-semibold tracking-[0.2em] uppercase text-luxury-gold">
            Insights & Updates
          </span>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Blog
          </h1>

          {/* Description */}
          <p className="text-lg text-neutral-600 mb-10 leading-relaxed">
            Thoughtful insights on real estate trends, investment strategies,
            legal clarity, and local market updates — written to help you make
            confident decisions.
          </p>

          {/* Coming soon card */}
          <div className="rounded-2xl border border-luxury-gold/20 bg-white/70 backdrop-blur-sm p-8 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-luxury-gold/10 text-luxury-gold text-xl">
                ✦
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">
                  Coming Soon
                </h2>
                <p className="text-sm text-neutral-600">
                  We’re currently preparing in-depth articles and guides. Check
                  back soon for our first set of posts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
