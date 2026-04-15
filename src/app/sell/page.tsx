'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import BuybackWizard from '@/components/sections/BuybackWizard'

export default function SellPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-black py-10 px-4 border-b-4 border-yellow-500">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white mb-3">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Sell your device for <span className="text-yellow-500">instant cash</span>
          </h1>
          <p className="text-gray-300 mt-2">Get a real offer in under a minute.</p>
        </div>
      </section>
      <section className="py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <BuybackWizard />
        </div>
      </section>
    </main>
  )
}
