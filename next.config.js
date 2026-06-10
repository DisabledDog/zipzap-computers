// Brooks → Salem redirect map.
// We removed all Brooks-targeted pages because ZipZap doesn't operate in Brooks.
// 301-redirecting preserves any inbound links and consolidates SEO signals onto
// the equivalent Salem pages.
const BROOKS_TO_SALEM = [
  ['/iphone-repair-services-brooks',          '/iphone-repair-services-in-salem'],
  ['/samsung-phone-repair-services-brooks',   '/samsung-phone-repair-services-in-salem'],
  ['/android-phone-repair-services-brooks',   '/android-phone-repair-services-in-salem'],
  ['/cell-phone-repair-services-brooks',      '/cell-phone-repair-services-in-salem'],
  ['/ipad-repair-services-brooks',            '/ipad-repair-services-in-salem'],
  ['/tablet-repair-services-brooks',          '/tablet-repair-services-in-salem'],
  ['/macbook-repair-services-brooks',         '/macbook-repair-services-in-salem'],
  ['/laptop-repair-services-brooks',          '/laptop-repair-services-in-salem'],
  ['/computer-repair-services-brooks',        '/computer-repair-services-in-salem'],
  ['/gaming-console-repair-services-brooks',  '/gaming-console-repair-services-in-salem'],
  ['/playstation-repair-brooks',              '/playstation-repair-in-salem'],
  ['/iphone-screen-replacement-brooks',       '/iphone-screen-replacement-in-salem'],
  ['/iphone-battery-replacement-brooks',      '/iphone-battery-replacement-in-salem'],
  ['/iphone-water-damage-repair-brooks',      '/iphone-water-damage-repair-in-salem'],
  ['/iphone-camera-repair-brooks',            '/iphone-camera-repair-in-salem'],
  ['/ipad-screen-replacement-brooks',         '/ipad-screen-replacement-in-salem'],
  ['/macbook-screen-replacement-brooks',      '/macbook-screen-replacement-in-salem'],
  ['/macbook-battery-replacement-brooks',     '/macbook-battery-replacement-in-salem'],
  ['/device-repair-brooks-or',                '/'],
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  async redirects() {
    return BROOKS_TO_SALEM.map(([source, destination]) => ({
      source,
      destination,
      permanent: true, // 308 (Next's permanent) — Google treats as 301-equivalent
    }));
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://www.google.com https://www.clearsalehq.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://maps.googleapis.com https://maps.gstatic.com; connect-src 'self' https://maps.googleapis.com https://www.clearsalehq.com; frame-src 'self' https://www.clearsalehq.com; object-src 'none'; base-uri 'self'; form-action 'self';",
          },
        ],
      },
      {
        source: '/store-interior.jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*\\.(?:jpg|jpeg|png|webp|avif|ico|svg))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig