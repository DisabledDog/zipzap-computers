'use client'

import { useState, useEffect } from 'react'
import { Search, Package, ShoppingCart, ShieldCheck, BadgeCheck, CreditCard, Phone, Camera, ArrowRight } from 'lucide-react'
import { InventoryItem, inventoryCategories } from '@/data/inventory'
import Reveal from '@/components/ui/Reveal'
import HeaderElectric from '@/components/ui/HeaderElectric'

export default function StorePage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load inventory from database (modern approach)
    const loadData = async () => {
      try {
        const response = await fetch('/api/inventory')
        const result = await response.json()

        if (result.success && result.data) {
          // Transform database format to component format
          const transformedInventory = result.data.map((item: any) => ({
            id: item.id,
            name: item.title,
            description: item.description,
            price: item.price,
            category: item.category,
            condition: item.condition,
            inStock: item.is_available,
            quantity: 1, // Default quantity since database doesn't have this field
            image: item.image_url,
            brand: item.brand,
            model: item.model,
            specs: [], // Default empty specs since database doesn't have this field
            dateAdded: item.created_at?.split('T')[0] || new Date().toISOString().split('T')[0]
          }))

          // Randomize the inventory order
          const randomizedInventory = [...transformedInventory].sort(() => Math.random() - 0.5)
          setInventory(randomizedInventory)
          setFilteredInventory(randomizedInventory)
        } else {
          // No items in database or failed response - show empty inventory
          setInventory([])
          setFilteredInventory([])
        }
      } catch (error) {
        // Error loading from database - show empty inventory
        console.error('Error loading inventory:', error)
        setInventory([])
        setFilteredInventory([])
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    // Filter inventory based on search term, category, and condition
    let filtered = inventory.filter(item => item.inStock)

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    setFilteredInventory(filtered)
  }, [inventory, searchTerm, selectedCategory])

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New': return 'bg-green-100 text-green-800'
      case 'Used': return 'bg-blue-100 text-blue-800'
      case 'Refurbished': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="relative min-h-screen bg-zz-black">
      {/* ---- Page-wide electric base — one continuous field behind everything ---- */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <HeaderElectric tall trackWindow sparkDensity={34} boltJitter={16} boltInterval={[800, 2200]} intensity={0.85} />
      </div>
      <div aria-hidden className="pointer-events-none fixed -top-40 left-1/2 z-0 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-yellow-500/15 blur-[150px]" />

      {/* ---- Store hero — electric, badass entrance ---- */}
      <section className="relative z-10 overflow-hidden py-20 lg:py-24">

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div
            className="zz-enter inline-flex items-center gap-2 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-4 py-1.5 text-sm font-medium text-yellow-300"
            style={{ ['--enter-delay' as string]: '0ms' }}
          >
            <BadgeCheck className="h-4 w-4" />
            Tested, cleaned &amp; guaranteed
          </div>

          <h1
            className="zz-enter mx-auto mt-6 max-w-4xl font-heading text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ ['--enter-delay' as string]: '80ms' }}
          >
            The ZipZap{' '}
            <span className="text-yellow-500 [text-shadow:0_0_40px_rgba(245,197,24,0.5)]">Store</span>
          </h1>

          <p
            className="zz-enter mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300 sm:text-xl"
            style={{ ['--enter-delay' as string]: '160ms' }}
          >
            Pre-owned and new tech, every device tested and warrantied. Real gear, fair prices,
            ready to walk out the door today.
          </p>

          {/* Primary CTA */}
          <div
            className="zz-enter mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            style={{ ['--enter-delay' as string]: '240ms' }}
          >
            <a
              href="#inventory"
              className="group inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-8 py-4 text-lg font-bold text-black shadow-[0_0_30px_rgba(245,197,24,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400 hover:shadow-[0_0_45px_rgba(245,197,24,0.5)]"
            >
              Browse the gear
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:5034009920"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-yellow-500/40 px-7 py-4 text-lg font-semibold text-yellow-400 transition-colors hover:border-yellow-500 hover:text-yellow-300"
            >
              <Phone className="h-5 w-5" />
              (503) 400-9920
            </a>
          </div>

          {/* Quick trust points */}
          <div
            className="zz-enter mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-gray-300"
            style={{ ['--enter-delay' as string]: '320ms' }}
          >
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-yellow-500" /> Warranty on every device
            </span>
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-yellow-500" /> Fully tested &amp; guaranteed
            </span>
            <span className="inline-flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-yellow-500" /> Financing available
            </span>
          </div>

          {/* Financing (Acima) — pulled up so the top of the page is rich, not blank */}
          <div
            className="zz-enter mx-auto mt-10 max-w-3xl"
            style={{ ['--enter-delay' as string]: '400ms' }}
          >
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-yellow-500/40 bg-white/[0.05] p-5 backdrop-blur-sm sm:flex-row">
              <div className="flex items-center gap-3 text-left">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500">
                  <CreditCard className="h-6 w-6 text-black" />
                </span>
                <div>
                  <p className="text-lg font-bold text-white">No-credit-needed financing</p>
                  <p className="text-sm text-gray-300">Take it home today, pay over time with Acima.</p>
                </div>
              </div>
              <a
                href="https://ecom.acima.com/views/application/loca-5d27a3ae-98dc-48b3-b25e-9f74f6606deb"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400"
              >
                Apply Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---- Inventory ---- */}
      <section id="inventory" className="relative z-10 overflow-hidden py-10 lg:py-14">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <Reveal as="div" delay={80} className="mx-auto mb-6 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search devices, brands, or models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border-2 border-gray-700 bg-white/[0.06] py-3.5 pl-12 pr-4 text-base text-white placeholder-gray-400 transition-colors focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
              />
            </div>
          </Reveal>

          {/* Category chips */}
          <Reveal as="div" delay={120} className="mb-4 flex flex-wrap justify-center gap-2.5">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                selectedCategory === 'All'
                  ? 'bg-yellow-500 text-black shadow-lg'
                  : 'bg-white/[0.06] text-gray-300 hover:bg-white/[0.12]'
              }`}
            >
              All Items
            </button>
            {inventoryCategories.map((category) => {
              const categoryCount = inventory.filter((item) => item.category === category && item.inStock).length
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                    selectedCategory === category
                      ? 'bg-yellow-500 text-black shadow-lg'
                      : 'bg-white/[0.06] text-gray-300 hover:bg-white/[0.12]'
                  }`}
                >
                  {category} ({categoryCount})
                </button>
              )
            })}
          </Reveal>

          <p className="mb-8 text-center text-gray-400">
            {filteredInventory.length} items {selectedCategory !== 'All' ? `in ${selectedCategory}` : 'available'}
          </p>

          {isLoading ? (
            <div className="py-16 text-center">
              <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-yellow-500 border-t-transparent" />
              <h3 className="mb-2 text-xl font-semibold text-gray-300">Loading inventory…</h3>
              <p className="text-gray-400">Hang tight while we pull the latest items</p>
            </div>
          ) : filteredInventory.length === 0 ? (
            <div className="mx-auto max-w-md rounded-2xl border border-gray-800 bg-white/[0.03] py-14 text-center">
              <Package className="mx-auto mb-4 h-14 w-14 text-gray-500" />
              <h3 className="mb-2 text-xl font-semibold text-white">Nothing here right now</h3>
              <p className="mx-auto mb-6 max-w-xs text-gray-400">
                Our shelves move fast. Call us — we get new devices in all the time and can hunt down what you need.
              </p>
              <a
                href="tel:5034009920"
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400"
              >
                <Phone className="h-5 w-5" />
                Call (503) 400-9920
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredInventory.map((item, index) => (
                <Reveal key={item.id} delay={(index % 4) * 80}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg ring-0 ring-yellow-500/0 transition-all duration-300 hover:-translate-y-1.5 hover:ring-2 hover:ring-yellow-500/50 hover:shadow-[0_16px_50px_rgba(245,197,24,0.22)]">
                    {/* Product image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      {item.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-gray-50 to-gray-200">
                          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/90 shadow-sm">
                            <Camera className="h-7 w-7 text-black" />
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Photo coming soon
                          </span>
                        </div>
                      )}

                      <div className="absolute left-3 top-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${getConditionColor(item.condition)}`}>
                          {item.condition}
                        </span>
                      </div>
                      <div className="absolute right-3 top-3">
                        <span className="rounded-full bg-green-500 px-2.5 py-1 text-xs font-medium text-white">
                          {item.quantity} in stock
                        </span>
                      </div>
                    </div>

                    {/* Product info */}
                    <div className="flex flex-1 flex-col p-5">
                      {item.brand && item.brand.toLowerCase() !== 'unknown' && (
                        <span className="text-sm font-medium text-gray-500">{item.brand}</span>
                      )}
                      <h3 className="mt-1 line-clamp-2 text-lg font-semibold text-black">{item.name}</h3>
                      <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-600">{item.description}</p>

                      {item.specs && item.specs.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {item.specs.slice(0, 2).map((spec, i) => (
                            <span key={i} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                              {spec}
                            </span>
                          ))}
                          {item.specs.length > 2 && (
                            <span className="px-2 py-1 text-xs text-gray-500">+{item.specs.length - 2} more</span>
                          )}
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-2xl font-bold text-black">${item.price}</div>
                        <a
                          href="tel:5034009920"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Call to Buy
                        </a>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---- Contact CTA ---- */}
      <section className="relative z-10 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal as="div">
            <h2 className="mb-4 font-heading text-3xl font-bold text-white lg:text-5xl">
              See something you <span className="text-yellow-500">like?</span>
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-300">
              Call to check availability, ask questions, or come try it in person. Every item comes with warranty coverage.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="tel:5034009920"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-8 py-4 text-lg font-semibold text-black shadow-[0_0_30px_rgba(245,197,24,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400 hover:shadow-[0_0_45px_rgba(245,197,24,0.5)]"
              >
                <Phone className="h-5 w-5" />
                Call (503) 400-9920
              </a>
              <a
                href="/get-repair-quote"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-yellow-500/40 px-8 py-4 text-lg font-semibold text-yellow-400 transition-colors hover:border-yellow-500 hover:text-yellow-300"
              >
                Get a Repair Quote
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
