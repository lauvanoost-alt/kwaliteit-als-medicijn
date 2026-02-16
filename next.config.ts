import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/eerste-test",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
