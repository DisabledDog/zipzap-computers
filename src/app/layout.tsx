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
              "openingHours": "Mo-Fr 10:00-18:00, Sa 11:00-17:00",
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
