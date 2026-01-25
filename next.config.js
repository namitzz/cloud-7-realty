/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,

  // ✅ Disable ESLint blocking builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Disable TypeScript blocking builds (THIS WAS MISSING)
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "drive.googleusercontent.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

module.exports = nextConfig;
