'use client'

import { useEffect, useRef, useState } from 'react'
import { Wrench, DollarSign, Clock, ShieldCheck, Star } from 'lucide-react'
import BuybackWizard from './BuybackWizard'
import Reveal from '@/components/ui/Reveal'

type Mode = 'repair' | 'sell'

export default function QuoteForm() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [mode, setMode] = useState<Mode>('repair')

  // Let the hero's "Fix"/"Sell" cards pick the active tab via the URL hash.
  // #sell → sell flow; #fix or #quote-form → repair flow.
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash
      if (hash === '#sell') setMode('sell')
      else if (hash === '#fix' || hash === '#quote-form') setMode('repair')
    }
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  return (
    <section id="quote-form" className="py-12 lg:py-20 bg-white" ref={sectionRef}>
      {/* Scroll anchors for the hero's two paths — scroll-mt offsets the sticky header */}
      <span id="fix" className="block scroll-mt-28" aria-hidden />
      <span id="sell" className="block scroll-mt-28" aria-hidden />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal as="div" className="text-center space-y-4 mb-6 lg:mb-8">
          <h2 className="text-2xl lg:text-4xl xl:text-5xl font-heading font-bold text-black">
            Get Your <span className="text-yellow-500">Free Quote</span>
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
            Broken device? Selling an old one? We handle both — no obligation, no pressure.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1 text-sm font-medium text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-yellow-500" /> Takes about 2 minutes
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-yellow-500" /> Free &amp; no obligation
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" /> Rated 4.7 by locals
            </span>
          </div>
        </Reveal>

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
          <div className="rounded-2xl shadow-lg border border-gray-200 overflow-hidden bg-white p-5 sm:p-8">
            <BuybackWizard />
          </div>
        )}
      </div>
    </section>
  )
}
