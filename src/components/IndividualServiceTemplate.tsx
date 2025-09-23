import { Metadata } from 'next'
import { Smartphone, Shield, Clock, CheckCircle, Phone, MapPin, Star, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface IndividualServiceProps {
  serviceName: string
  deviceType: string
  location: string
  icon: LucideIcon
  description: string
  detailedDescription: string
  benefits: string[]
  process: {
    step: string
    description: string
  }[]
  commonIssues: string[]
  pricing?: {
    starting: string
    warranty: string
  }
  relatedServices: {
    name: string
    url: string
  }[]
}

export default function IndividualServiceTemplate({
  serviceName,
  deviceType,
  location,
  icon: Icon,
  description,
  detailedDescription,
  benefits,
  process,
  commonIssues,
  pricing,
  relatedServices
}: IndividualServiceProps) {
  const capitalizedLocation = location.charAt(0).toUpperCase() + location.slice(1)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="service-detail-hexagon" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                <polygon
                  points="10,2 17.32,6 17.32,14 10,18 2.68,14 2.68,6"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#service-detail-hexagon)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold mb-4">
              <MapPin className="h-4 w-4" />
              {capitalizedLocation}, Oregon
            </div>
            <div className="w-20 h-20 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Icon className="h-10 w-10 text-black" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white">
              {serviceName} <span className="text-yellow-500">in {capitalizedLocation}</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="tel:5034009920"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="h-5 w-5" />
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

      {/* Service Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-black mb-6">
                Professional {serviceName} Service
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {detailedDescription}
              </p>

              <h3 className="text-2xl font-semibold text-black mb-4">Why Choose Our Service?</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-black mb-6">Common Issues We Fix</h3>
              <div className="space-y-4">
                {commonIssues.map((issue, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Wrench className="h-5 w-5 text-yellow-500" />
                    <span className="text-gray-700">{issue}</span>
                  </div>
                ))}
              </div>

              {pricing && (
                <div className="mt-8 p-6 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                  <h4 className="text-xl font-semibold text-black mb-2">Pricing</h4>
                  <p className="text-lg text-gray-700 mb-2">Starting at {pricing.starting}</p>
                  <p className="text-sm text-gray-600">{pricing.warranty}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
              Our {serviceName} Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional service with transparent process and guaranteed results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-black">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-black mb-2">{step.step}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
              Related {deviceType} Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete repair solutions for your {deviceType.toLowerCase()}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((service, index) => (
              <a
                key={index}
                href={service.url}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 group"
              >
                <h3 className="text-lg font-semibold text-black group-hover:text-yellow-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Professional {service.name.toLowerCase()} service in {capitalizedLocation}
                </p>
                <div className="mt-4 text-yellow-500 font-semibold text-sm">
                  Learn More →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-4">
              Our Service Guarantees
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional service you can trust with unmatched warranties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lifetime Warranty</h3>
              <p className="text-gray-300 text-sm">All repairs backed by lifetime warranty coverage</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Same-Day Service</h3>
              <p className="text-gray-300 text-sm">Most repairs completed within hours</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Quality Parts</h3>
              <p className="text-gray-300 text-sm">Only high-quality replacement components</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Expert Technicians</h3>
              <p className="text-gray-300 text-sm">Certified professionals with years of experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
            Get Your {deviceType} Fixed Today
          </h2>
          <p className="text-xl text-black mb-8 max-w-3xl mx-auto">
            Professional {serviceName.toLowerCase()} service in {capitalizedLocation} with lifetime warranty and same-day service available
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5034009920"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone className="h-5 w-5" />
              Call Now: (503) 400-9920
            </a>
            <a
              href="/#quote-form"
              className="bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all border-2 border-black inline-flex items-center justify-center gap-2"
            >
              Get Free Estimate
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}