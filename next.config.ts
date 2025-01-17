import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your Next.js configuration options here
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

export default nextConfig;