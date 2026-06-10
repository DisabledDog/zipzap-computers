'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, Phone, MapPin, Clock, ChevronDown, ShoppingBag, DollarSign, Wrench } from 'lucide-react'
import HeaderElectric from './HeaderElectric'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const salemServices = [
    { name: 'iPhone Repair Services', url: '/iphone-repair-services-in-salem' },
    { name: 'Samsung Phone Repair', url: '/samsung-phone-repair-services-in-salem' },
    { name: 'Android Phone Repair', url: '/android-phone-repair-services-in-salem' },
    { name: 'Cell Phone Repair', url: '/cell-phone-repair-services-in-salem' },
    { name: 'iPad Repair Services', url: '/ipad-repair-services-in-salem' },
    { name: 'Tablet Repair Services', url: '/tablet-repair-services-in-salem' },
    { name: 'MacBook Repair Services', url: '/macbook-repair-services-in-salem' },
    { name: 'Laptop Repair Services', url: '/laptop-repair-services-in-salem' },
    { name: 'Computer Repair Services', url: '/computer-repair-services-in-salem' },
    { name: 'Xbox Repair Services', url: '/xbox-repair-services-in-salem' },
    { name: 'Gaming Console Repair', url: '/gaming-console-repair-services-in-salem' }
  ]

  // Shared style for the main nav links — uppercase display type with a
  // yellow underline that grows on hover.
  const navLink =
    "relative font-display text-sm font-medium uppercase tracking-[0.14em] text-gray-300 transition-colors hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:w-0 after:bg-yellow-500 after:transition-all after:duration-300 after:content-[''] hover:after:w-full"

  return (
    <>
      {/* Business Info Bar */}
      <div className="relative overflow-hidden bg-black text-white py-2 px-4">
        <HeaderElectric />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm space-y-1 sm:space-y-0">
          {/* Mobile: phone + address */}
          <div className="flex sm:hidden flex-col items-center gap-1 text-center">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-yellow-500" />
              <a href="tel:5034009920" className="font-medium hover:text-yellow-500 transition-colors">
                (503) 400-9920
              </a>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-yellow-500" />
              <span className="text-gray-400 text-xs">3945 Rich Dr NE B, Salem, OR</span>
            </div>
          </div>

          {/* Desktop: full info */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-yellow-500" />
              <a href="tel:5034009920" className="hover:text-yellow-500 transition-colors">(503) 400-9920</a>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <MapPin className="h-3 w-3 text-yellow-500" />
              <span className="text-gray-300">3945 Rich Dr NE B, Salem, OR 97305</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-gray-300">
            <Clock className="h-3 w-3 text-yellow-500" />
            <span className="hidden md:inline">Mon-Fri: 10AM-6PM | Sat-Sun: Closed</span>
            <span className="md:hidden">Mon-Fri: 10-6</span>
          </div>
        </div>
      </div>

      {/* Main nav — dark, premium */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/90 backdrop-blur-md">
        {/* hairline yellow accent */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow-500/60 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/zipzap-logo.png"
                alt="ZipZap Computers logo"
                width={48}
                height={55}
                priority
                className="h-12 w-auto drop-shadow-[0_0_12px_rgba(245,197,24,0.25)]"
              />
              <span className="font-display text-xl font-bold tracking-tight text-white">
                ZipZap<span className="text-yellow-500"> Computers</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className={navLink}>Home</Link>

              {/* Services Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  className={`flex items-center gap-1 ${navLink}`}
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isServicesOpen && (
                  <div
                    className="absolute top-full left-1/2 mt-4 w-80 -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl"
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <div className="p-4">
                      <Link
                        href="/services"
                        className="block font-display text-lg font-semibold text-white transition-colors hover:text-yellow-400"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        All Services
                      </Link>
                      <p className="text-sm text-gray-400">Complete repair services overview</p>

                      <div className="mt-3 border-t border-white/10 pt-3">
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Salem Services</h4>
                        <div className="grid grid-cols-1 gap-0.5">
                          {salemServices.map((service, index) => (
                            <Link
                              key={index}
                              href={service.url}
                              className="rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-yellow-400"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/gallery" className={navLink}>Gallery</Link>

              {/* Right action cluster */}
              <div className="flex items-center gap-3 pl-2">
                <Link
                  href="/#sell"
                  className="inline-flex items-center gap-1.5 font-display text-sm font-medium uppercase tracking-[0.1em] text-gray-300 transition-colors hover:text-white"
                >
                  <DollarSign className="h-4 w-4 text-yellow-500" />
                  Sell
                </Link>

                {/* Store — the standout, no box, glowing solid */}
                <Link
                  href="/store"
                  className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-5 py-2.5 font-display text-sm font-bold uppercase tracking-[0.08em] text-black shadow-[0_0_24px_rgba(245,197,24,0.35)] transition-all hover:-translate-y-0.5 hover:bg-yellow-400 hover:shadow-[0_0_34px_rgba(245,197,24,0.55)]"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Shop Devices
                </Link>

                <a
                  href="tel:5034009920"
                  className="inline-flex items-center gap-2 rounded-full border border-yellow-500/50 px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-[0.08em] text-yellow-400 transition-colors hover:border-yellow-500 hover:text-yellow-300"
                >
                  <Phone className="h-4 w-4" />
                  Call
                </a>
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="rounded-md p-2 text-gray-200 hover:bg-white/10 md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="border-t border-white/10 py-5 md:hidden">
              <nav className="flex flex-col gap-3">
                {/* Prominent actions first */}
                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    href="/store"
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-yellow-500 px-3 py-3 font-display text-sm font-bold uppercase tracking-wide text-black shadow-[0_0_24px_rgba(245,197,24,0.35)]"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Shop Devices
                  </Link>
                  <Link
                    href="/#sell"
                    onClick={toggleMenu}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 px-3 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white"
                  >
                    <DollarSign className="h-4 w-4 text-yellow-500" />
                    Sell
                  </Link>
                </div>
                <Link
                  href="/#fix"
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-3 py-3 font-display text-sm font-semibold uppercase tracking-wide text-white"
                >
                  <Wrench className="h-4 w-4 text-yellow-500" />
                  Get a Repair Quote
                </Link>

                <div className="mt-2 flex flex-col gap-1 border-t border-white/10 pt-3">
                  <Link href="/" onClick={toggleMenu} className="font-display text-base font-medium uppercase tracking-wide text-gray-200 hover:text-white">Home</Link>
                  <Link href="/services" onClick={toggleMenu} className="font-display text-base font-medium uppercase tracking-wide text-gray-200 hover:text-white">All Services</Link>
                  <div className="ml-3 mt-1 flex flex-col gap-1.5">
                    {salemServices.slice(0, 6).map((service, index) => (
                      <Link
                        key={index}
                        href={service.url}
                        onClick={toggleMenu}
                        className="text-sm text-gray-400 transition-colors hover:text-yellow-400"
                      >
                        {service.name}
                      </Link>
                    ))}
                    <Link href="/services" onClick={toggleMenu} className="text-sm font-medium text-yellow-500 hover:text-yellow-400">
                      View All Services →
                    </Link>
                  </div>
                  <Link href="/gallery" onClick={toggleMenu} className="mt-1 font-display text-base font-medium uppercase tracking-wide text-gray-200 hover:text-white">Gallery</Link>
                </div>

                <a
                  href="tel:5034009920"
                  onClick={toggleMenu}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-yellow-500/50 px-6 py-3 font-display font-semibold uppercase tracking-wide text-yellow-400"
                >
                  <Phone className="h-4 w-4" />
                  (503) 400-9920
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
