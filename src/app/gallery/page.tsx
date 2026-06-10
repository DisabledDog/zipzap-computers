import type { Metadata } from 'next'
import GalleryGrid from '@/components/sections/GalleryGrid'

export const metadata: Metadata = {
  title: 'Repair Gallery — Before & After | ZipZap Computers Salem',
  description: 'Real before-and-after photos from our Salem, Oregon repair shop. iPhone screens, water damage recovery, MacBook repairs, and more.',
  alternates: { canonical: '/gallery' },
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black">
      <GalleryGrid />
    </div>
  )
}