import { Shield, Clock, DollarSign, MapPin } from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: 'Lifetime Warranty',
    description: 'All repairs come with our comprehensive lifetime warranty for complete peace of mind.'
  },
  {
    icon: Clock,
    title: 'Same-Day Repairs',
    description: 'Most repairs completed within 45 minutes to 2 hours. Get your device back fast.'
  },
  {
    icon: DollarSign,
    title: 'Upfront Pricing',
    description: 'No hidden fees or surprises. Know exactly what you\'ll pay before we start.'
  },
  {
    icon: MapPin,
    title: 'Locally Owned & Operated',
    description: 'Independent Salem business supporting the local community since 2021.'
  }
]

export default function WhyUs() {
  return (
    <section className="py-20 bg-gradient-to-br from-yellow-50 to-yellow-100 relative overflow-hidden">
      {/* Diagonal Lightning Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="lightning-diagonal" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              {/* Diagonal stripes */}
              <path d="M0,15 L15,0 L18,0 L3,15 L0,15 Z" fill="#fbbf24" opacity="0.3" />
              <path d="M15,30 L30,15 L33,15 L18,30 L15,30 Z" fill="#fbbf24" opacity="0.3" />

              {/* Lightning bolt shapes */}
              <path d="M8,5 L12,5 L9,12 L11,12 L7,20 L10,12 L8,12 L11,5" fill="#fbbf24" opacity="0.4" />
              <path d="M23,20 L27,20 L24,27 L26,27 L22,35 L25,27 L23,27 L26,20" fill="#fbbf24" opacity="0.3" />

              {/* Circuit-like dots */}
              <circle cx="5" cy="25" r="1" fill="#fbbf24" opacity="0.5" />
              <circle cx="25" cy="5" r="1" fill="#fbbf24" opacity="0.5" />
              <circle cx="15" cy="15" r="0.8" fill="#fbbf24" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lightning-diagonal)" />
        </svg>
      </div>

      {/* Large Decorative Elements */}
      <div className="absolute top-20 -right-32 w-64 h-64 bg-yellow-200 rounded-full opacity-10 blur-3xl"></div>
      <div className="absolute bottom-20 -left-32 w-48 h-48 bg-yellow-300 rounded-full opacity-15 blur-2xl"></div>

      {/* Lightning Accent Lines */}
      <div className="absolute top-10 left-10 w-32 h-1 bg-yellow-400 transform rotate-45 opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-24 h-1 bg-yellow-500 transform -rotate-45 opacity-40"></div>
      <div className="absolute top-1/3 right-20 w-16 h-0.5 bg-yellow-400 transform rotate-12 opacity-25"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black">
            Why Choose <span className="text-yellow-500">ZipZap</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re committed to providing exceptional service with transparency, speed, and quality that you can trust.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <div
                key={index}
                className="relative bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 overflow-hidden"
              >
                {/* Simple Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`benefit-pattern-${index}`} x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
                        <circle cx="7.5" cy="7.5" r="1" fill="#fbbf24" />
                        <path d="M 0 7.5 L 15 7.5 M 7.5 0 L 7.5 15" stroke="#fbbf24" strokeWidth="0.3" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#benefit-pattern-${index})`} />
                  </svg>
                </div>

                {/* Decorative corner element */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-yellow-500 to-yellow-400 opacity-20 rounded-bl-2xl"></div>

                <div className="relative z-10 text-center space-y-4">
                  {/* Icon with enhanced styling */}
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-400 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-lg">
                    <IconComponent className="h-10 w-10 text-black" />
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-bold text-black">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {benefit.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className="w-16 h-1 bg-yellow-500 rounded-full mx-auto"></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 relative bg-black text-white rounded-2xl p-8 lg:p-12 shadow-xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="stats-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1.5" fill="#fbbf24" />
                  <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="#fbbf24" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#stats-pattern)" />
            </svg>
          </div>

          {/* Lightning bolt decorations */}
          <div className="absolute top-4 right-4 w-8 h-8 text-yellow-500 opacity-30">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2v11h3v9l7-12h-4l4-8z" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 w-6 h-6 text-yellow-500 opacity-20">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2v11h3v9l7-12h-4l4-8z" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold text-yellow-500 mb-2">Our Track Record</h3>
              <p className="text-gray-300">Numbers that speak for themselves</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="relative space-y-2 bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-yellow-500 transition-colors group">
                <div className="text-4xl lg:text-5xl font-heading font-bold text-yellow-500 group-hover:scale-110 transition-transform">
                  5000+
                </div>
                <div className="text-gray-300 font-medium">
                  Devices Repaired
                </div>
                <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-500 rounded-full opacity-20"></div>
              </div>
              <div className="relative space-y-2 bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-yellow-500 transition-colors group">
                <div className="text-4xl lg:text-5xl font-heading font-bold text-yellow-500 group-hover:scale-110 transition-transform">
                  4.7★
                </div>
                <div className="text-gray-300 font-medium">
                  Average Rating
                </div>
                <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-500 rounded-full opacity-20"></div>
              </div>
              <div className="relative space-y-2 bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-yellow-500 transition-colors group">
                <div className="text-4xl lg:text-5xl font-heading font-bold text-yellow-500 group-hover:scale-110 transition-transform">
                  Same Day
                </div>
                <div className="text-gray-300 font-medium">
                  Most Repairs
                </div>
                <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-500 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}