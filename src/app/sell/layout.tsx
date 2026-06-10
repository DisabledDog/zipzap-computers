import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sell Your Phone, Tablet, or Laptop in Salem, OR | ZipZap Computers',
  description: 'Get a live cash offer on your iPhone, Samsung, iPad, MacBook, or gaming console. Same-day cash or store credit at our Salem, Oregon shop.',
  alternates: { canonical: '/sell' },
}

export default function SellLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
