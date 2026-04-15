import type { NextConfig } from "next";

const POS_URL = process.env.POS_URL || 'https://www.clearsalehq.com';

const nextConfig: NextConfig = {
  async rewrites() {
    // Proxy /quote-embed/* to the POS so the iframe stays same-origin.
    // Dev: set POS_URL=http://localhost:3002 in .env.local
    // Prod: defaults to https://www.clearsalehq.com
    return [
      {
        source: '/quote-embed/:path*',
        destination: `${POS_URL}/quote-embed/:path*`,
      },
    ];
  },
};

export default nextConfig;
