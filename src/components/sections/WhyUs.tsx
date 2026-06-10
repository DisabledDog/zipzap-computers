'use client'

import { useEffect, useState } from 'react'
import { Shield, Clock, DollarSign, MapPin } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import CountUp from '@/components/ui/CountUp'

const benefits = [
  {
    icon: Shield,
    title: 'Lifetime Warranty',
    description: 'All repairs come with our comprehensive lifetime warranty for complete peace of mind.'
  },
  {
    icon: Clock,
    title: 'Same-Day Repairs',
    description: 'Most repairs completed within 45 minutes to 2 hours. Get your device back fast.'
  },
  {
    icon: DollarSign,
    title: 'Upfront Pricing',
    description: 'No hidden fees or surprises. Know exactly what you\'ll pay before we start.'
  },
  {
    icon: MapPin,
    title: 'Locally Owned & Operated',
    description: 'Independent Salem business supporting the local community since 2021.'
  }
]

export default function WhyUs() {
  // Single source of truth for the rating: pull from the same API the
  // Customer Reviews widget uses, so this stat can never drift from what
  // visitors see in the reviews carousel below.
  const [rating, setRating] = useState<number | null>(null)
  const [reviewCount, setReviewCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/google-reviews')
      .then((r) => r.json())
      .then((data) => {
        if (data?.rating) setRating(data.rating)
        if (data?.user_ratings_total) setReviewCount(data.user_ratings_total)
      })
      .catch(() => {/* keep null — render falls back gracefully */})
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-yellow-50 to-yellow-100 py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal as="div" className="mb-16 space-y-4 text-center">
          <h2 className="font-heading text-3xl font-bold text-black lg:text-5xl">
            Why neighbors choose <span className="text-yellow-500">ZipZap</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Transparent pricing, fast turnaround, and quality you can trust — from people who live here too.
          </p>
        </Reveal>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <Reveal key={index} delay={index * 100}>
                <div className="group h-full rounded-2xl border border-yellow-200/60 bg-white p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-400 shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="h-10 w-10 text-black" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-heading text-xl font-bold text-black">{benefit.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-600">{benefit.description}</p>
                  </div>
                  <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-yellow-500" />
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Stats Section */}
        <Reveal as="div" delay={120} className="mt-20">
          <div className="rounded-2xl bg-black p-8 text-white shadow-xl lg:p-12">
            <div className="mb-8 text-center">
              <h3 className="mb-2 font-heading text-2xl font-bold text-yellow-500">Our track record</h3>
              <p className="text-gray-300">Numbers that speak for themselves</p>
            </div>
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 transition-colors hover:border-yellow-500">
                <div className="font-heading text-4xl font-bold text-yellow-500 lg:text-5xl">
                  <CountUp end={2600} suffix="+" />
                </div>
                <div className="mt-2 font-medium text-gray-300">Customers Served</div>
              </div>
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 transition-colors hover:border-yellow-500">
                <div className="font-heading text-4xl font-bold tabular-nums text-yellow-500 lg:text-5xl">
                  {rating !== null ? rating.toFixed(1) : '4.9'}★
                </div>
                <div className="mt-2 font-medium text-gray-300">
                  {reviewCount !== null ? `Average Rating · ${reviewCount} reviews` : 'Average Rating'}
                </div>
              </div>
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 transition-colors hover:border-yellow-500">
                <div className="font-heading text-4xl font-bold text-yellow-500 lg:text-5xl">Same Day</div>
                <div className="mt-2 font-medium text-gray-300">Most Repairs</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
