/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  // ✅ REQUIRED: Disable Turbopack (fixes Vercel build error)
  experimental: {
    turbo: false,
  },

  // ✅ Keep this (you already had it)
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Keep this (safe for PDFs & static assets)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
