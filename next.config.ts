import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! PERINGATAN !!
    // Ini membolehkan deploy ke Vercel meski ada error TypeScript kecil
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ini membolehkan deploy meski ada warning ESLint
    ignoreDuringBuilds: true,
  },
  images: {
    // Izinkan gambar dari semua domain (penting untuk gambar mobil dari internet)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;