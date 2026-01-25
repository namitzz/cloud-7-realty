import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us - Cloud Seven Realty",
  description: "Learn more about Cloud Seven Realty, your trusted partner in real estate with verified properties and professional service.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <div className="bg-neutral-50 py-12 sm:py-16">
        <div className="container-custom">
          <div className="mb-4 text-sm text-neutral-600">
            <span>Home</span> <span className="mx-2">/</span> <span>About</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
            About Cloud Seven Realty
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            Your trusted partner in finding the perfect property
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Who We Are */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-luxury-navy">
                Who We Are
              </h2>
              <div className="prose prose-lg max-w-none text-neutral-700">
                <p className="mb-4">
                  Cloud Seven Realty is a trusted real estate company dedicated to helping clients find their dream properties. 
                  We specialize in residential properties, commercial spaces, and land investments with a focus on verified 
                  legal titles and transparent transactions.
                </p>
                <p>
                  With years of experience in the real estate market, we understand that buying or renting a property is one 
                  of the most important decisions in your life. That's why we're committed to providing professional guidance, 
                  honest advice, and reliable service every step of the way.
                </p>
              </div>
            </div>

            {/* Our Mission */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-luxury-navy">
                Our Mission
              </h2>
              <div className="bg-accent/10 rounded-2xl p-8">
                <p className="text-lg text-neutral-700">
                  To make real estate transactions simple, transparent, and trustworthy by offering verified properties 
                  with clear legal titles, professional support, and a customer-first approach.
                </p>
              </div>
            </div>

            {/* What We Offer */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-luxury-navy">
                What We Offer
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                  <div className="text-3xl mb-4">🏠</div>
                  <h3 className="text-xl font-semibold mb-3">Residential Properties</h3>
                  <p className="text-neutral-600">
                    Find your perfect home with our curated selection of apartments, villas, and houses in prime locations.
                  </p>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                  <div className="text-3xl mb-4">🏢</div>
                  <h3 className="text-xl font-semibold mb-3">Commercial Spaces</h3>
                  <p className="text-neutral-600">
                    Discover ideal commercial properties for your business, from office spaces to retail outlets.
                  </p>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                  <div className="text-3xl mb-4">🌳</div>
                  <h3 className="text-xl font-semibold mb-3">Land Investments</h3>
                  <p className="text-neutral-600">
                    Explore verified land parcels for investment or development with clear legal documentation.
                  </p>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl p-6">
                  <div className="text-3xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-3">Property Consultation</h3>
                  <p className="text-neutral-600">
                    Get expert guidance on property selection, legal verification, and investment decisions.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Choose Us */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-luxury-navy">
                Why Choose Us
              </h2>
              <div className="space-y-4">
                <div className="flex items-start bg-neutral-50 rounded-lg p-4">
                  <span className="text-accent text-2xl mr-4">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Verified Legal Titles</h4>
                    <p className="text-neutral-600 text-sm">
                      All properties undergo thorough legal verification to ensure clear titles and hassle-free transactions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-neutral-50 rounded-lg p-4">
                  <span className="text-accent text-2xl mr-4">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Professional Support</h4>
                    <p className="text-neutral-600 text-sm">
                      Our experienced team provides dedicated support throughout your property journey, from search to closure.
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-neutral-50 rounded-lg p-4">
                  <span className="text-accent text-2xl mr-4">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Transparent Pricing</h4>
                    <p className="text-neutral-600 text-sm">
                      No hidden costs or surprise fees. We believe in complete transparency in all our dealings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-neutral-50 rounded-lg p-4">
                  <span className="text-accent text-2xl mr-4">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Quick Response</h4>
                    <p className="text-neutral-600 text-sm">
                      Get instant support via WhatsApp and prompt responses to all your queries and concerns.
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-neutral-50 rounded-lg p-4">
                  <span className="text-accent text-2xl mr-4">✓</span>
                  <div>
                    <h4 className="font-semibold mb-1">Proven Track Record</h4>
                    <p className="text-neutral-600 text-sm">
                      Over 100 successful property transactions and satisfied clients who trust us for their real estate needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-luxury-navy to-luxury-gold/80 rounded-2xl p-8 sm:p-12 text-center text-white">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
                Ready to Find Your Dream Property?
              </h2>
              <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                Let us help you navigate the real estate market with confidence and ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/properties"
                  className="inline-block bg-white text-luxury-navy px-8 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-colors"
                >
                  Browse Properties
                </Link>
                <Link
                  href="/contact"
                  className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
