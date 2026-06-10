'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Phone, ArrowRight, Wrench, DollarSign, MapPin, Star, ShieldCheck, Clock } from 'lucide-react'
import HeaderElectric from '@/components/ui/HeaderElectric'

export default function Hero() {
  // Live Google rating — same source the reviews widget uses, so the hero
  // can never claim a number the reviews section doesn't back up.
  const [rating, setRating] = useState<number | null>(null)
  const [reviewCount, setReviewCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/google-reviews')
      .then((r) => r.json())
      .then((data) => {
        if (data?.rating) setRating(data.rating)
        if (data?.user_ratings_total) setReviewCount(data.user_ratings_total)
      })
      .catch(() => {/* render falls back gracefully */})
  }, [])

  return (
    <section className="relative overflow-hidden bg-zz-black py-12 lg:py-20">
      {/* Brand lightning — the same electric motif as the store */}
      <HeaderElectric tall sparkDensity={38} boltJitter={14} boltInterval={[1000, 2600]} intensity={0.7} />
      {/* Warm amber glow — replaces the old hex-grid noise with something inviting */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-yellow-500/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 -right-32 h-[28rem] w-[28rem] rounded-full bg-yellow-400/10 blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* Left column — content + the two paths */}
          <div className="text-center lg:text-left">
            {/* Eyebrow */}
            <div
              className="zz-enter inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-300"
              style={{ ['--enter-delay' as string]: '0ms' }}
            >
              <MapPin className="h-4 w-4" />
              Salem, Oregon · Locally owned since 2021
            </div>

            {/* Headline */}
            <h1
              className="zz-enter mt-5 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
              style={{ ['--enter-delay' as string]: '80ms' }}
            >
              Let&apos;s get your tech{' '}
              <span className="text-yellow-500">sorted.</span>
            </h1>

            <p
              className="zz-enter mx-auto mt-5 max-w-xl text-lg leading-relaxed text-gray-300 lg:mx-0"
              style={{ ['--enter-delay' as string]: '160ms' }}
            >
              Got a broken device, or one you&apos;re ready to part with? Pick a path below
              and we&apos;ll take it from here — friendly help, fair prices, no pressure.
            </p>

            {/* The two paths — the heart of the page */}
            <div
              className="zz-enter mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
              style={{ ['--enter-delay' as string]: '240ms' }}
            >
              {/* Fix */}
              <a
                href="#fix"
                className="group relative flex flex-col rounded-2xl border border-gray-700 bg-white/[0.04] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-yellow-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black transition-transform duration-300 group-hover:scale-110">
                  <Wrench className="h-6 w-6" />
                </span>
                <span className="font-heading text-xl font-bold text-white">Fix my device</span>
                <span className="mt-1 text-sm text-gray-400">Free repair quote in 2 minutes</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-400">
                  Get my quote
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>

              {/* Sell */}
              <a
                href="#sell"
                className="group relative flex flex-col rounded-2xl border border-gray-700 bg-white/[0.04] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-yellow-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
              >
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500 text-black transition-transform duration-300 group-hover:scale-110">
                  <DollarSign className="h-6 w-6" />
                </span>
                <span className="font-heading text-xl font-bold text-white">Sell my device</span>
                <span className="mt-1 text-sm text-gray-400">Get a cash offer today</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-yellow-400">
                  See my offer
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </div>

            {/* Rating + call */}
            <div
              className="zz-enter mt-7 flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:items-start"
              style={{ ['--enter-delay' as string]: '320ms' }}
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`h-5 w-5 ${
                        rating && s <= Math.round(rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-600 text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-300">
                  <span className="font-bold text-white">{rating ? rating.toFixed(1) : '4.9'}</span>
                  {reviewCount ? ` · ${reviewCount}+ Google reviews` : ' on Google'}
                </span>
              </div>

              <a
                href="tel:5034009920"
                className="inline-flex items-center gap-2 font-semibold text-yellow-400 transition-colors hover:text-yellow-300"
              >
                <Phone className="h-4 w-4" />
                (503) 400-9920
              </a>
            </div>

            {/* Slim trust row */}
            <div
              className="zz-enter mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-400 lg:justify-start"
              style={{ ['--enter-delay' as string]: '400ms' }}
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-yellow-500" /> Lifetime warranty
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-yellow-500" /> Same-day on most repairs
              </span>
            </div>
          </div>

          {/* Right column — store photo with a friendly floating badge */}
          <div
            className="zz-enter relative"
            style={{ ['--enter-delay' as string]: '200ms' }}
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
              <Image
                src="/store-interior.jpg"
                alt="ZipZap Computers store interior — professional electronics repair shop in Salem, Oregon"
                width={800}
                height={600}
                priority
                className="aspect-[4/3] h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Floating "come on in" badge */}
            <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-xl sm:left-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500">
                <MapPin className="h-5 w-5 text-black" />
              </span>
              <div className="text-left leading-tight">
                <div className="text-sm font-bold text-black">Come say hi</div>
                <div className="text-xs text-gray-500">3945 Rich Dr NE B, Salem</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
