'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Zap, Phone, MapPin, Clock, ChevronDown } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Salem services for the dropdown menu
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

  return (
    <>
      {/* Business Info Bar */}
      <div className="bg-gray-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm space-y-1 sm:space-y-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-yellow-500" />
              <a href="tel:5034009920" className="hover:text-yellow-500 transition-colors">
                (503) 400-9920
              </a>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-yellow-500" />
              <span>3945 Rich Dr NE B, Salem, OR 97305</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-yellow-500" />
            <span>Mon-Fri: 10AM-6PM | Sat: 12PM-6PM</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-yellow-500" />
            <span className="text-xl font-heading font-bold text-black">
              ZipZap Computers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                className="flex items-center gap-1 text-gray-700 hover:text-black transition-colors"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="p-4">
                    <div className="mb-3">
                      <Link
                        href="/services"
                        className="block text-lg font-semibold text-black hover:text-yellow-600 transition-colors"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        All Services
                      </Link>
                      <p className="text-sm text-gray-500">Complete repair services overview</p>
                    </div>

                    <div className="border-t border-gray-100 pt-3">
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">Salem Services</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {salemServices.map((service, index) => (
                          <Link
                            key={index}
                            href={service.url}
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-yellow-600 rounded transition-colors"
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

            <Link
              href="/store"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Store
            </Link>
            <Link
              href="/gallery"
              className="text-gray-700 hover:text-black transition-colors"
            >
              Gallery
            </Link>
            <a
              href="tel:5034009920"
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Call Now
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-black transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>

              {/* Mobile Services Section */}
              <div>
                <Link
                  href="/services"
                  className="block text-gray-700 hover:text-black transition-colors mb-2 font-medium"
                  onClick={toggleMenu}
                >
                  All Services
                </Link>
                <div className="ml-4 space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Salem Services</p>
                  {salemServices.slice(0, 6).map((service, index) => (
                    <Link
                      key={index}
                      href={service.url}
                      className="block text-sm text-gray-600 hover:text-yellow-600 transition-colors"
                      onClick={toggleMenu}
                    >
                      {service.name}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className="block text-sm text-yellow-600 hover:text-yellow-700 transition-colors font-medium"
                    onClick={toggleMenu}
                  >
                    View All Services →
                  </Link>
                </div>
              </div>

              <Link
                href="/store"
                className="text-gray-700 hover:text-black transition-colors"
                onClick={toggleMenu}
              >
                Store
              </Link>
              <Link
                href="/gallery"
                className="text-gray-700 hover:text-black transition-colors"
                onClick={toggleMenu}
              >
                Gallery
              </Link>
              <a
                href="tel:5034009920"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold transition-colors inline-block text-center"
                onClick={toggleMenu}
              >
                Call Now
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
    </>
  )
}