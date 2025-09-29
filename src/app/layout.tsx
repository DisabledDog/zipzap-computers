import type { Metadata } from "next";
import "./globals.css";
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

export const metadata: Metadata = {
  title: "ZipZap Computers - Professional Device Repair in Salem, OR",
  description: "Fast, reliable electronics repair in Salem, OR. Phones, computers, and consoles with lifetime repair warranty and same-day service.",
  keywords: "device repair, phone repair, computer repair, Salem Oregon, iPhone repair, laptop repair, electronics repair",
  openGraph: {
    title: "ZipZap Computers - Professional Device Repair in Salem, OR",
    description: "Fast, reliable electronics repair in Salem, OR. Phones, computers, and consoles with lifetime repair warranty and same-day service.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://www.myrepairapp.com" />
        <link rel="dns-prefetch" href="https://maps.gstatic.com" />

        {/* Viewport and Performance Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#eab308" />
        <meta name="color-scheme" content="light" />

        {/* Critical CSS and Resource Hints */}
        <link rel="preload" href="/store-interior.jpg" as="image" type="image/jpeg" />

        {/* Optimized Font Loading */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ElectronicsStore",
              "name": "ZipZap Computers",
              "url": "https://zipzapcomputers.com",
              "telephone": "+1-503-400-9920",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "3945 Rich Dr NE B",
                "addressLocality": "Salem",
                "addressRegion": "OR",
                "postalCode": "97301",
                "addressCountry": "US"
              },
              "openingHours": "Mo-Fr 10:00-18:00, Sa 12:00-18:00",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 44.9429,
                "longitude": -123.0351
              },
              "description": "Professional device repair services in Salem, OR. Expert iPhone, Samsung, laptop, and gaming console repairs with lifetime warranty.",
              "priceRange": "$$"
            })
          }}
        />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
