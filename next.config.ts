import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // Absolutely mandatory for GitHub Pages since it has no image optimization backend
  },
  transpilePackages: ["three"],
};

export default nextConfig;
