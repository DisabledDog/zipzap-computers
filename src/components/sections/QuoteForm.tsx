'use client'

import { useRef, useState } from 'react'
import { Wrench, DollarSign } from 'lucide-react'
import BuybackWizard from './BuybackWizard'

type Mode = 'repair' | 'sell'

export default function QuoteForm() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<Mode>('repair')

  return (
    <section id="quote-form" className="py-12 lg:py-20 bg-white" ref={sectionRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-6 lg:mb-8">
          <h2 className="text-2xl lg:text-4xl xl:text-5xl font-heading font-bold text-black">
            Get Your <span className="text-yellow-500">Free Quote</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Broken device? Selling an old one? We handle both.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-gray-100 border border-gray-200 shadow-sm">
            <button
              onClick={() => setMode('repair')}
              className={`flex items-center gap-2 px-5 sm:px-8 py-3 rounded-lg text-sm sm:text-base font-semibold transition-all ${
                mode === 'repair' ? 'bg-yellow-500 text-black shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Wrench className="h-4 w-4" />
              Fix my device
            </button>
            <button
              onClick={() => setMode('sell')}
              className={`flex items-center gap-2 px-5 sm:px-8 py-3 rounded-lg text-sm sm:text-base font-semibold transition-all ${
                mode === 'sell' ? 'bg-yellow-500 text-black shadow' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <DollarSign className="h-4 w-4" />
              Sell my device
            </button>
          </div>
        </div>

        {mode === 'repair' ? (
          <div className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden bg-white">
            <iframe
              src="https://www.clearsalehq.com/quote-embed/61dd7752-552a-44bb-a47b-aa9e9387886e"
              width="100%"
              height="650"
              frameBorder="0"
              style={{ border: 'none' }}
              title="Get Repair Quote"
            />
          </div>
        ) : (
          <div className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden bg-white">
            <iframe
              src="https://www.clearsalehq.com/buyback-embed/61dd7752-552a-44bb-a47b-aa9e9387886e"
              width="100%"
              height="700"
              frameBorder="0"
              style={{ border: 'none' }}
              title="Sell your device"
            />
          </div>
        )}
      </div>
    </section>
  )
}
