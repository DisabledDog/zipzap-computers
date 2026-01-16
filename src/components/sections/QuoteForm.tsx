'use client'

import { useEffect, useState, useRef } from 'react'

export default function QuoteForm() {
  const [iframeHeight, setIframeHeight] = useState(600)
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Adjust iframe height based on screen size
    const updateHeight = () => {
      const screenHeight = window.innerHeight
      const headerHeight = 100 // approximate header height
      const sectionPadding = 160 // py-20 = 80px top + 80px bottom
      const titleHeight = 100 // approximate title section height

      // Calculate optimal height to minimize scrolling
      const availableHeight = screenHeight - headerHeight - sectionPadding - titleHeight
      const minHeight = 400 // minimum usable height
      const maxHeight = 800 // maximum height to prevent too tall on large screens

      const newHeight = Math.max(minHeight, Math.min(maxHeight, availableHeight))
      setIframeHeight(newHeight)
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  useEffect(() => {
    // Lazy load iframe when section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadIframe(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '100px' }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="quote-form" className="py-12 lg:py-20 bg-white" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-4xl xl:text-5xl font-heading font-bold text-black">
            Get Your <span className="text-yellow-500">Free Quote</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us about your device and get an instant repair estimate
          </p>
        </div>

        {/* Quote Form Iframe */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden max-w-4xl mx-auto">
          {shouldLoadIframe ? (
            <iframe
              id="quoteform"
              src="https://www.myrepairapp.com/quoteform?api_key=zxXl-9OaBeUU7T6_IXF16&bg_color=%23000000&text_color=%23eeff00&disabled_categories=Wearables&hide_schedule_step=true&hide_create_quote=false&country=US"
              style={{ border: 0, outline: 'none' }}
              frameBorder="0"
              width="100%"
              height={iframeHeight}
              title="Get Repair Quote"
              loading="lazy"
            />
          ) : (
            <div
              className="flex items-center justify-center bg-gray-50 text-gray-500"
              style={{ height: iframeHeight }}
            >
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                <p>Loading quote form...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}