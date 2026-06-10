import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Refurbished Phones & Computers for Sale in Salem, OR | ZipZap Computers',
  description: 'Shop refurbished iPhones, Samsung phones, iPads, MacBooks, and laptops in Salem, Oregon. Tested, graded, and warrantied by our techs.',
  alternates: { canonical: '/store' },
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
