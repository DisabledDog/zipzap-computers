import Link from 'next/link'
import { Smartphone, Laptop, Gamepad2, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Smartphone,
    title: 'iPhone Repair',
    description: 'Screen replacements, battery fixes, water damage repair, and more for all iPhone models.',
    href: '/repairs/iphone',
    features: ['Screen Repair', 'Battery Replacement', 'Water Damage', 'Camera Issues']
  },
  {
    icon: Laptop,
    title: 'Mac & PC Repair',
    description: 'Hardware diagnostics, virus removal, data recovery, and performance optimization.',
    href: '/repairs/computers',
    features: ['Hardware Repair', 'Virus Removal', 'Data Recovery', 'Upgrades']
  },
  {
    icon: Gamepad2,
    title: 'Xbox & PlayStation',
    description: 'Controller repairs, console overheating fixes, disc drive issues, and more.',
    href: '/repairs/consoles',
    features: ['Controller Repair', 'Overheating Fix', 'Disc Drive', 'HDMI Issues']
  }
]

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-black relative overflow-hidden">
      {/* Hexagonal Honeycomb Background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagon-pattern" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
              {/* Main hexagon */}
              <polygon
                points="10,2 17.32,6 17.32,14 10,18 2.68,14 2.68,6"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.8"
                opacity="0.8"
              />
              {/* Offset hexagon for honeycomb tessellation */}
              <polygon
                points="30,10.66 37.32,14.66 37.32,22.66 30,26.66 22.68,22.66 22.68,14.66"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.8"
                opacity="0.6"
              />
              {/* Additional hexagons for better coverage */}
              <polygon
                points="-10,10.66 -2.68,14.66 -2.68,22.66 -10,26.66 -17.32,22.66 -17.32,14.66"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="0.8"
                opacity="0.6"
              />
              {/* Center dots */}
              <circle cx="10" cy="10" r="0.8" fill="#fbbf24" opacity="0.4" />
              <circle cx="30" cy="18.66" r="0.6" fill="#fbbf24" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagon-pattern)" />
        </svg>
      </div>

      {/* Blade/Diagonal accent elements */}
      <div className="absolute top-10 -right-20 w-40 h-2 bg-yellow-500 opacity-40 transform rotate-45"></div>
      <div className="absolute bottom-20 -left-20 w-32 h-1 bg-yellow-500 opacity-30 transform -rotate-45"></div>
      <div className="absolute top-1/3 -left-10 w-24 h-1 bg-gray-600 opacity-20 transform rotate-12"></div>
      <div className="absolute bottom-1/3 -right-15 w-28 h-1 bg-yellow-400 opacity-25 transform -rotate-12"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-12 lg:mb-16">
          <div className="bg-yellow-500 text-black py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 rounded-2xl mx-auto max-w-4xl shadow-2xl border-4 border-yellow-400">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-6xl font-heading font-black mb-4 sm:mb-6 tracking-tight">
              Expert Repair <span className="text-gray-800">Services</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold max-w-3xl mx-auto leading-relaxed">
              Professional repairs for all your electronic devices with fast turnaround times and lifetime warranty coverage.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-xl transition-all duration-300 border border-gray-200 group hover:-translate-y-2"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="h-8 w-8 text-black" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-heading font-bold text-black">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 text-black font-semibold hover:text-yellow-500 transition-colors group/link mt-6"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="bg-black text-white hover:bg-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center gap-2"
          >
            View All Services
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}