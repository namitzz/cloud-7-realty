import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-luxury-navy via-luxury-slate to-luxury-navy text-white overflow-hidden">
      {/* subtle depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.06),transparent_40%)]" />

      <div className="relative container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">

          {/* Brand */}
          <div>
            <Image
              src="/logo.png"
              alt="Cloud Seven Realty"
              width={150}
              height={48}
              priority
              className="brightness-0 invert"
            />

            <p className="mt-3 text-sm text-neutral-300 leading-relaxed max-w-sm">
              Premium real estate with verified titles and trusted on-ground
              support across Jammu & Kashmir.
            </p>

            {/* Social */}
            <div className="flex gap-3 mt-4">
              {[{
                href: "https://www.instagram.com/cloudsevenrealty?igsh=MWYyYjV5azhvd2psag==",
                icon: FaInstagram,
                label: "Instagram"
              },{
                href: "https://facebook.com/groups/1013274167660034/",
                icon: FaFacebookF,
                label: "Facebook"
              }].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:border-luxury-gold"
                >
                  <Icon className="text-white transition duration-500 group-hover:text-luxury-gold group-hover:rotate-[360deg]" />
                  <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 blur-md bg-luxury-gold/20 transition" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-neutral-400 mb-3">
              Explore
            </h4>
            <ul className="space-y-1.5 text-sm text-neutral-300">
              <li><Link href="/properties" className="hover:text-luxury-gold transition">Properties</Link></li>
              <li><Link href="/areas" className="hover:text-luxury-gold transition">Areas</Link></li>
              <li><Link href="/contact" className="hover:text-luxury-gold transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-neutral-400 mb-3">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-neutral-300">
              <p className="text-white/90">Phone</p>
              <a href="tel:9906599038" className="block hover:text-luxury-gold transition">9906599038</a>
              <a href="tel:7977125458" className="block hover:text-luxury-gold transition">7977125458</a>

              <p className="text-white/90 mt-2">Email</p>
              <a href="mailto:aarshkhan@cloudsevenrealty.com" className="block hover:text-luxury-gold transition">
                aarshkhan@cloudsevenrealty.com
              </a>
            </div>
          </div>

          {/* Office */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-neutral-400 mb-3">
              Office
            </h4>
            <p className="text-sm text-neutral-300">
              Cloud Seven Realty<br />
              Srinagar, Jammu & Kashmir
            </p>
            <a
              href="https://www.google.com/maps?ll=34.075628,74.810624&z=14&t=m"
              target="_blank"
              className="inline-block mt-2 text-sm text-luxury-gold hover:underline"
            >
              View on Google Maps
            </a>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-custom py-3 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-neutral-400">
          <p>© {currentYear} Cloud Seven Realty</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-luxury-gold transition">Privacy</Link>
            <Link href="/terms" className="hover:text-luxury-gold transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
