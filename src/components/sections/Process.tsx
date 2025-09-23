import { Calendar, MapPin, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Calendar,
    title: 'Book Online or Call',
    description: 'Schedule your repair appointment online or give us a call. Free diagnostics included.',
    number: '01'
  },
  {
    icon: MapPin,
    title: 'Drop Off at Our Salem Shop',
    description: 'Bring your device to our convenient Salem location. We\'ll assess the issue immediately.',
    number: '02'
  },
  {
    icon: CheckCircle,
    title: 'Pick Up Same Day',
    description: 'Most repairs completed within hours. We\'ll notify you when your device is ready.',
    number: '03'
  }
]

export default function Process() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black">
            Simple 3-Step Process
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting your device repaired is quick and easy. Here&apos;s how it works.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="relative">
                {/* Connector Line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-300 -translate-x-6 z-0">
                    <div className="w-1/2 h-full bg-yellow-500"></div>
                  </div>
                )}

                {/* Step Card */}
                <div className="relative z-10 bg-white rounded-2xl p-8 shadow-card border border-gray-200 text-center space-y-6">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-black">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                    <IconComponent className="h-10 w-10 text-black" />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-heading font-bold text-black">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-yellow-500 text-black py-12 px-8 rounded-2xl shadow-lg">
            <h3 className="text-3xl font-heading font-bold mb-6">
              Ready to get started?
            </h3>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Get your device fixed today with our fast, reliable repair service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5034009920"
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg"
              >
                Call (503) 400-9920
              </a>
              <a
                href="/contact"
                className="bg-white border-2 border-black text-black hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg"
              >
                Book Online
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}