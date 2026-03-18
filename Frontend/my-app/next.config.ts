import type { NextConfig } from "next";
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
   images: {
      domains: ["picsum.photos"],
  },
  reactCompiler: true,
  reactStrictMode: true,
};

export default nextConfig;
