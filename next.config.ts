import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/kwaliteit-als-medicijn",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
