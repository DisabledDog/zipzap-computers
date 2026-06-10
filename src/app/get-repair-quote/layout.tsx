import type { Metadata } from 'next'

// Google Ads landing page: noindex so it doesn't compete with organic
// service pages, and no global Header/Footer chrome — single conversion focus.
export const metadata: Metadata = {
  title: 'Same-Day Device Repair in Salem, OR — Free Diagnostic | ZipZap',
  description: 'Local Salem, Oregon repair shop. Same-day service on most fixes, lifetime warranty, free diagnostic. Walk in or call (503) 400-9920.',
  // Override the root keywords so this paid-ads page never carries brand-name terms.
  // Manufacturers (Apple in particular) actively report ads whose landing pages
  // contain protected marks — keeping this list strictly device-class.
  keywords: 'smartphone repair Salem, device repair Salem, screen replacement Salem, battery replacement, water damage repair, tablet repair, laptop repair, gaming console repair, same-day repair Oregon',
  robots: { index: false, follow: false },
  alternates: { canonical: '/get-repair-quote' },
}

export default function GetRepairQuoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Hide the site-wide Header + Footer so the LP is distraction-free. */}
      <style>{`
        body > header, body > footer { display: none !important; }
      `}</style>
      {children}
    </>
  )
}
