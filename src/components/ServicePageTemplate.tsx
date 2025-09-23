import { Smartphone, Laptop, Gamepad2, Tablet, Watch, Shield, Zap, Wrench, Monitor, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { getSubServiceLinks } from '@/data/subServiceLinks'

interface ServicePageProps {
  title: string
  location: string
  icon: LucideIcon
  description: string
  services: {
    name: string
    description: string
  }[]
  metaDescription?: string
}

export default function ServicePageTemplate({
  title,
  location,
  icon: Icon,
  description,
  services,
  metaDescription
}: ServicePageProps) {
  const capitalizedLocation = location.charAt(0).toUpperCase() + location.slice(1)
  const subServices = getSubServiceLinks(title, location)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="service-hexagon" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                <polygon
                  points="10,2 17.32,6 17.32,14 10,18 2.68,14 2.68,6"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#service-hexagon)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Icon className="h-10 w-10 text-black" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white">
              {title} <span className="text-yellow-500">in {capitalizedLocation}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="tel:5034009920"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 shadow-lg"
              >
                Call (503) 400-9920
              </a>
              <a
                href="/#quote-form"
                className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all inline-flex items-center justify-center gap-2"
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
              Our {title} Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional repair services with lifetime warranty and same-day service available
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-black mb-3">
                  {service.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Services */}
      {subServices.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
                Individual {title} Options
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Detailed information and pricing for specific {title.toLowerCase()} in {capitalizedLocation}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subServices.map((subService, index) => (
                <a
                  key={index}
                  href={subService.url}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 group hover:border-yellow-300"
                >
                  <h3 className="text-lg font-semibold text-black group-hover:text-yellow-600 transition-colors mb-2">
                    {subService.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Professional {subService.name.toLowerCase()} service in {capitalizedLocation} with lifetime warranty
                  </p>
                  <div className="flex items-center gap-2 text-yellow-500 font-semibold text-sm group-hover:gap-3 transition-all">
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
              Why Choose ZipZap Computers in {capitalizedLocation}?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted electronics repair service with guaranteed quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Lifetime Warranty
              </h3>
              <p className="text-gray-600 text-sm">
                All repairs backed by comprehensive lifetime warranty coverage
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Same-Day Service
              </h3>
              <p className="text-gray-600 text-sm">
                Most repairs completed within hours, not days
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Expert Technicians
              </h3>
              <p className="text-gray-600 text-sm">
                Certified professionals with years of repair experience
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Quality Parts
              </h3>
              <p className="text-gray-600 text-sm">
                Only high-quality replacement parts and components used
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-4">
            Get Your {title.replace(' Repair Services', '')} Fixed Today
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Visit our {capitalizedLocation}, Oregon location or call for immediate assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5034009920"
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 shadow-lg"
            >
              Call Now: (503) 400-9920
            </a>
            <a
              href="https://maps.google.com/?q=ZipZap+Computers+{location}+Oregon"
              className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all inline-flex items-center justify-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}