'use client'

import { useEffect, useState } from 'react'

export default function QuoteForm() {
  const [iframeHeight, setIframeHeight] = useState(600)

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

  return (
    <section id="quote-form" className="py-12 lg:py-20 bg-white">
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
          <iframe
            id="quoteform"
            src="https://www.myrepairapp.com/quoteform?api_key=zxXl-9OaBeUU7T6_IXF16&bg_color=undefined&text_color=undefined&disabled_categories=&hide_schedule_step=false&hide_create_quote=false&country=US"
            style={{ border: 0, outline: 'none' }}
            frameBorder="0"
            width="100%"
            height={iframeHeight}
            title="Get Repair Quote"
          />
        </div>
      </div>
    </section>
  )
}