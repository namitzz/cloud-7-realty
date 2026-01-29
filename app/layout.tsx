import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Cloud Seven Realty - Premium Projects & Properties",
  description:
    "Discover premium real estate projects and properties with Cloud Seven Realty. Verified titles, on-ground team, and instant WhatsApp support.",
  keywords: ["real estate", "properties", "projects", "land", "buy", "rent"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}');
                `,
              }}
            />
          </>
        )}
      </head>

      <body className="font-sans antialiased">
        <Navbar />

        {/* ✅ Default site background (AUTO) */}
        <main className="min-h-screen bg-neutral-100">
          {children}
        </main>

        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
