'use client'

import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="py-12 lg:py-16 bg-black relative overflow-hidden">
      {/* Hexagonal Honeycomb Background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-hexagon-pattern" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
              {/* Main hexagon */}
              <polygon
                points="10,2 17.32,6 17.32,14 10,18 2.68,14 2.68,6"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.8"
                opacity="0.8"
              />
              {/* Offset hexagon for honeycomb tessellation */}
              <polygon
                points="30,10.66 37.32,14.66 37.32,22.66 30,26.66 22.68,22.66 22.68,14.66"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.8"
                opacity="0.6"
              />
              {/* Additional hexagons for better coverage */}
              <polygon
                points="-10,10.66 -2.68,14.66 -2.68,22.66 -10,26.66 -17.32,22.66 -17.32,14.66"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.8"
                opacity="0.6"
              />
              {/* Center dots */}
              <circle cx="10" cy="10" r="0.8" fill="#fbbf24" opacity="0.4" />
              <circle cx="30" cy="18.66" r="0.6" fill="#fbbf24" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-hexagon-pattern)" />
        </svg>
      </div>

      {/* Blade/Diagonal accent elements */}
      <div className="absolute top-10 -right-20 w-40 h-2 bg-yellow-500 opacity-40 transform rotate-45"></div>
      <div className="absolute bottom-20 -left-20 w-32 h-1 bg-yellow-500 opacity-30 transform -rotate-45"></div>
      <div className="absolute top-1/3 -left-10 w-24 h-1 bg-gray-400 opacity-20 transform rotate-12"></div>
      <div className="absolute bottom-1/3 -right-15 w-28 h-1 bg-yellow-400 opacity-25 transform -rotate-12"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white leading-tight">
                Fast, reliable electronics repair{' '}
                <span className="text-yellow-500">in Salem</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                Phones, computers, and consoles. Lifetime repair warranty. Same-day service
                on most fixes.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#quote-form"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 shadow-lg"
              >
                Get a Quote
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="tel:5034009920"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 shadow-lg border-2 border-yellow-600"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Lifetime Warranty</span>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Same-Day Service</span>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Local & Independent</span>
              </div>
            </div>
          </div>

          {/* Right column - Store Photo */}
          <div className="relative">
            {/* Store Photo */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/store-interior.jpg"
                alt="ZipZap Computers Store Interior - Professional electronics repair shop in Salem, Oregon"
                className="w-full h-full object-cover aspect-[4/3]"
              />

              {/* Overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

            </div>

            {/* Floating stats */}
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-card border border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-black">Walk-In</div>
                <div className="text-sm text-gray-600">No Appointment</div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-white p-4 rounded-xl shadow-card border border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-black">Same Day</div>
                <div className="text-sm text-gray-600">Service Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}