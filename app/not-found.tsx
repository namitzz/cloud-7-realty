import Link from "next/link";

export default function NotFound() {
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Content */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-4 text-luxury-navy">
            Page Not Found
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 mb-8 max-w-xl mx-auto">
            We couldn't find the page you're looking for. It may have been moved or doesn't exist.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn btn-primary px-8 py-3">
              Go to Home
            </Link>
            <Link href="/properties" className="btn btn-ghost px-8 py-3">
              Browse Properties
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-sm text-neutral-600 mb-4">
              Looking for something specific?
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
