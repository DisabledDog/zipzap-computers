'use client'

import { useRef } from 'react'

export default function QuoteForm() {
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section id="quote-form" className="py-12 lg:py-20 bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-4xl xl:text-5xl font-heading font-bold text-black">
            Get Your <span className="text-yellow-500">Free Quote</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us about your device and get an instant repair estimate
          </p>
        </div>

        <div className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <iframe
            src="https://www.clearsalehq.com/quote-embed/61dd7752-552a-44bb-a47b-aa9e9387886e"
            width="100%"
            height="900"
            frameBorder="0"
            style={{ border: 'none', minHeight: '80vh' }}
            title="Get Repair Quote"
          />
        </div>
      </div>
    </section>
  )
}
