import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
      domains: ["raw.githubusercontent.com"], // whitelist Pokémon sprite domain
    },
};

export default nextConfig;
