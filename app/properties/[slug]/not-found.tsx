import Link from "next/link";

export default function PropertyNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="container-custom text-center py-16">
        <div className="max-w-2xl mx-auto">
          {/* Icon */}
          <div className="mb-8">
            <svg
              className="w-24 h-24 mx-auto text-neutral-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>

          {/* Content */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4 text-luxury-navy">
            Property Not Found
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 mb-8 max-w-xl mx-auto">
            We couldn't find the property you're looking for. It may have been sold, removed, or the link might be incorrect.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties" className="btn btn-primary px-8 py-3">
              Browse All Properties
            </Link>
            <Link href="/" className="btn btn-ghost px-8 py-3">
              Go to Home
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-600 mb-4">
              Looking for something else?
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <Link href="/projects" className="text-accent hover:underline">
                Projects
              </Link>
              <Link href="/about" className="text-accent hover:underline">
                About Us
              </Link>
              <Link href="/contact" className="text-accent hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
