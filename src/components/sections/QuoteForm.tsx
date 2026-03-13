'use client'

import { useEffect, useState, useRef } from 'react'

export default function QuoteForm() {
  const [iframeHeight, setIframeHeight] = useState(700)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateHeight = () => {
      const screenHeight = window.innerHeight
      const newHeight = Math.max(500, Math.min(900, screenHeight - 200))
      setIframeHeight(newHeight)
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

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

        <div className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden max-w-[600px] mx-auto">
          <iframe
            src="https://www.clearsalehq.com/quote-embed/61dd7752-552a-44bb-a47b-aa9e9387886e"
            width="100%"
            height={iframeHeight}
            frameBorder="0"
            style={{ border: 'none', borderRadius: '12px' }}
            title="Get Repair Quote"
          />
        </div>
      </div>
    </section>
  )
}
