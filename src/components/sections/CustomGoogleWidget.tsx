'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, ExternalLink, MapPin, Clock } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import HeaderElectric from '@/components/ui/HeaderElectric'

interface GoogleReview {
  author_name: string
  rating: number
  text: string
  time: number
  relative_time_description: string
  profile_photo_url?: string
}

export default function CustomGoogleWidget() {
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [loading, setLoading] = useState(true)
  const [businessRating, setBusinessRating] = useState<number | null>(null)
  const [totalReviews, setTotalReviews] = useState<number | null>(null)

  useEffect(() => {
    loadRealGoogleReviews()
  }, [])

  const loadRealGoogleReviews = async () => {
    try {
      const response = await fetch('/api/google-reviews')
      const data = await response.json()

      if (data.success && data.reviews) {
        setReviews(data.reviews)
        setBusinessRating(data.rating)
        setTotalReviews(data.user_ratings_total)
      } else {
        console.error('Google Reviews API error:', data.error)
      }
    } catch (error) {
      console.error('Error loading Google reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fallbacks so the section never renders empty (e.g. API key missing locally).
  const ratingDisplay = businessRating ?? 4.9
  const totalDisplay = totalReviews ?? 226

  return (
    <section className="relative overflow-hidden bg-zz-black py-16 sm:py-20">
      {/* Subtle brand lightning to match the rest of the site */}
      <HeaderElectric sparkDensity={70} boltJitter={10} boltInterval={[1800, 3800]} intensity={0.4} />
      {/* Single warm glow — on-brand, replaces the old grid + blobs + hexagons */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-1/4 h-[34rem] w-[34rem] rounded-full bg-yellow-500/[0.07] blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header + aggregate rating */}
        <Reveal as="div" className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Loved by our Salem neighbors
          </h2>
          <p className="mt-4 text-lg text-gray-300">Real reviews from our verified Google Business Profile</p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-gray-800 bg-white/[0.04] px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= Math.round(ratingDisplay)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-600 text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-white">{ratingDisplay}</span>
            </div>
            <span className="hidden h-6 w-px bg-gray-700 sm:block" />
            <span className="text-gray-300">
              <span className="font-bold text-white">{totalDisplay}+</span> Google reviews
            </span>
            <span className="hidden h-6 w-px bg-gray-700 sm:block" />
            <span className="inline-flex items-center gap-2 text-gray-300">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              Verified business
            </span>
          </div>
        </Reveal>

        {/* Reviews grid (or a friendly skeleton while loading) */}
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl border border-gray-800 bg-white/[0.04]" />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 6).map((review, index) => (
              <Reveal key={index} delay={(index % 3) * 100}>
                <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="mb-4 flex items-start justify-between">
                    <Quote className="h-8 w-8 text-yellow-500" />
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-700 line-clamp-4">
                    &ldquo;{review.text}&rdquo;
                  </p>

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-900">{review.author_name}</div>
                      <div className="text-xs text-gray-500">{review.relative_time_description}</div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500">
                      <span className="text-lg font-bold text-black">{review.author_name.charAt(0)}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : null}

        {/* Business card / CTA — on-brand */}
        <Reveal as="div" delay={120} className="mt-12 lg:mt-16">
          <div className="rounded-2xl border border-gray-800 bg-white/[0.04] p-6 backdrop-blur-sm lg:p-8">
            <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
              <div>
                <h3 className="mb-4 font-heading text-2xl font-bold text-white">ZipZap Computers</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-yellow-400" />
                    <span>3945 Rich Dr NE B, Salem, OR 97305</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-yellow-400" />
                    <span>Mon-Fri: 10AM-6PM · Sat-Sun: Closed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(ratingDisplay)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-gray-600 text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold text-white">
                      {ratingDisplay} ({totalDisplay}+ reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a
                  href="https://g.page/r/CeruriFcECIfEAE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100"
                >
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  View on Google
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href="https://g.page/r/CeruriFcECIfEAE/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400"
                >
                  <Star className="h-5 w-5 fill-black" />
                  Write a review
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
