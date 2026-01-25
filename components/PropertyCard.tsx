import { PropertyStatus } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

export interface PropertyCardProps {
  slug: string;
  title: string;
  subtitle?: string;
  price: string;
  size?: string;
  area?: string;
  location: string;
  status: PropertyStatus;
  images?: string[];
  imageUrl?: string;
  coverImage?: string;
}

export default function PropertyCard({
  slug,
  title,
  subtitle,
  price,
  size,
  area,
  location,
  status,
  images,
  imageUrl,
  coverImage,
}: PropertyCardProps) {
  const displaySize = size || area || "";
  const displayImage =
    images?.[0] || imageUrl || coverImage || "/placeholder.jpg";

  const statusColors: Record<PropertyStatus, string> = {
    Buy: "bg-green-500",
    Rent: "bg-blue-500",
    Land: "bg-amber-500",
  };

  return (
    <Link
      href={`/properties/${slug}`}
      className="group block rounded-2xl overflow-hidden bg-white
        border border-luxury-gold/10 transition-all duration-300
        hover:border-luxury-gold/30 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden bg-neutral-200">
        <Image
          src={displayImage}
          alt={title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
          <span className="px-3 py-1 text-xs rounded-full bg-white/90 text-luxury-navy font-medium">
            {location}
          </span>
          <span
            className={`px-3 py-1 text-xs rounded-full text-white font-medium ${statusColors[status]}`}
          >
            {status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-bold text-2xl sm:text-3xl text-luxury-gold">
            ₹{price}
          </span>
          {displaySize && (
            <>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-600 text-sm">
                {displaySize}
              </span>
            </>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-serif font-semibold line-clamp-2 mb-2 group-hover:text-luxury-gold transition-colors">
          {title}
        </h3>

        {subtitle && (
          <p className="text-sm text-neutral-600 line-clamp-2 mb-4">
            {subtitle}
          </p>
        )}

        <div className="flex gap-3">
          <span className="btn btn-primary flex-1 text-sm pointer-events-none">
            Enquire
          </span>
          <span className="btn btn-ghost flex-1 text-sm pointer-events-none">
            Details
          </span>
        </div>
      </div>
    </Link>
  );
}
