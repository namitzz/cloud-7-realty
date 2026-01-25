import EnquiryFAB from "@/components/EnquiryFAB";
import Gallery from "@/components/Gallery";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getAllProperties, getPropertyBySlug } from "@/lib/data";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

/* ----------------------------------
   Static params (SAFE)
----------------------------------- */
export async function generateStaticParams() {
  // ⚠️ IMPORTANT:
  // This MUST be lightweight.
  // Do NOT trigger Google Drive here.
  const properties = await getAllProperties({ slugsOnly: true });

  return properties.map((p) => ({
    slug: p.slug,
  }));
}

/* ----------------------------------
   Metadata
----------------------------------- */
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property Not Found - Cloud Seven Realty",
      description: "The property you're looking for could not be found.",
    };
  }

  return {
    title: `${property.title} – Cloud Seven Realty`,
    description:
      property.description ||
      `${property.title} available for ${property.status.toLowerCase()}.`,
  };
}

/* ----------------------------------
   Page
----------------------------------- */
export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  const galleryImages =
    property.images?.map((url, i) => ({
      url,
      alt: `${property.title} – Image ${i + 1}`,
    })) ?? [];

  const heroImage =
    galleryImages[0]?.url ||
    property.coverImage ||
    "/placeholder.jpg";

  return (
    <>
      {/* HERO */}
      <section className="relative h-[65vh] min-h-[520px]">
        <Image
          src={heroImage}
          alt={property.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className="relative h-full flex items-end">
          <div className="container-custom pb-14 text-white">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur text-sm font-medium">
              {property.status}
            </span>

            <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              {property.title}
            </h1>

            <div className="flex flex-wrap gap-10 text-lg">
              <div>
                <div className="text-neutral-300 text-sm mb-1">Price</div>
                <div className="text-3xl font-bold text-luxury-gold">
                  {property.price}
                </div>
              </div>

              <div>
                <div className="text-neutral-300 text-sm mb-1">Size</div>
                <div className="text-xl font-semibold">
                  {property.area}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="container-custom py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-6">
                Gallery
              </h2>

              {galleryImages.length ? (
                <Gallery images={galleryImages} />
              ) : (
                <div className="rounded-xl bg-neutral-100 p-12 text-center text-neutral-500">
                  Images will be added soon
                </div>
              )}
            </section>

            {property.description && (
              <section>
                <h2 className="text-2xl sm:text-3xl font-serif font-semibold mb-6">
                  Description
                </h2>

                <div className="prose prose-neutral max-w-none text-lg leading-relaxed">
                  <p>{property.description}</p>
                </div>
              </section>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-luxury-gold/20 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-serif font-semibold mb-6 text-luxury-navy">
                Property Details
              </h3>

              <dl className="space-y-5 mb-8">
                <div>
                  <dt className="text-sm text-neutral-500">Price</dt>
                  <dd className="text-2xl font-bold text-luxury-gold">
                    {property.price}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm text-neutral-500">Status</dt>
                  <dd className="font-medium text-lg">
                    {property.status}
                  </dd>
                </div>

                <div>
                  <dt className="text-sm text-neutral-500">Size</dt>
                  <dd className="font-medium text-lg">
                    {property.area}
                  </dd>
                </div>
              </dl>

              <WhatsAppButton propertyTitle={property.title} />
            </div>
          </aside>
        </div>
      </div>

      <EnquiryFAB
        propertyTitle={property.title}
        propertySlug={property.slug}
      />
    </>
  );
}
