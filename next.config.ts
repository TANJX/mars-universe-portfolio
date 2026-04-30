import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/archive", destination: "/archive/index.html" },
      { source: "/archive/", destination: "/archive/index.html" },
    ];
  },
};

export default nextConfig;
