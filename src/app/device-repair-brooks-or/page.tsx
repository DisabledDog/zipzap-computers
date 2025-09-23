import { Metadata } from 'next'
import { MapPin, Phone, Clock, Shield, Star, CheckCircle, Wrench, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Device Repair Brooks OR | Electronics Repair Service | ZipZap Computers',
  description: 'Professional device repair services in Brooks, Oregon. We fix phones, computers, tablets, gaming consoles and more. Same-day service with lifetime warranty.',
  keywords: 'device repair Brooks Oregon, electronics repair Brooks OR, phone repair Brooks, computer repair Brooks, tablet repair Brooks'
}

export default function DeviceRepairBrooksPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="brooks-hexagon" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                <polygon
                  points="10,2 17.32,6 17.32,14 10,18 2.68,14 2.68,6"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#brooks-hexagon)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 rounded-full font-semibold mb-4">
              <MapPin className="h-4 w-4" />
              Brooks, Oregon
            </div>
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white">
              Professional <span className="text-yellow-500">Device Repair</span> in Brooks, OR
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Your trusted local electronics repair service in Brooks, Oregon. Expert technicians,
              same-day service, and lifetime warranty on all repairs. Serving Brooks, Gervais,
              and North Marion County communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="tel:5034009920"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="h-5 w-5" />
                Call Brooks: (503) 400-9920
              </a>
              <a
                href="/#quote-form"
                className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all inline-flex items-center justify-center gap-2"
              >
                Get Free Estimate
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Local Service Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
              Brooks' Premier Device Repair Service
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bringing professional electronics repair to Brooks and surrounding rural communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <Clock className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">Same-Day Service</h3>
              <p className="text-gray-600">Most repairs completed within hours. Drop off in the morning, pick up after work.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <Shield className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">Lifetime Warranty</h3>
              <p className="text-gray-600">All repairs backed by comprehensive lifetime warranty for Brooks residents.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <Users className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">Local & Trusted</h3>
              <p className="text-gray-600">Serving the Brooks community with honest, reliable service you can trust.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <Star className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-black mb-2">5-Star Rated</h3>
              <p className="text-gray-600">Consistently rated 5 stars by Brooks and North Marion County customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Available in Brooks */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
              Complete Device Repair Services in Brooks
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From smartphones to gaming consoles, we repair all your electronics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: "Phone Repair",
                services: [
                  "iPhone screen replacement",
                  "Samsung Galaxy repair",
                  "Android phone fixing",
                  "Battery replacement",
                  "Charging port repair",
                  "Water damage recovery"
                ]
              },
              {
                category: "Computer Repair",
                services: [
                  "Laptop screen repair",
                  "MacBook service",
                  "Desktop PC repair",
                  "Virus removal",
                  "Data recovery",
                  "Hardware upgrades"
                ]
              },
              {
                category: "Tablet Repair",
                services: [
                  "iPad screen replacement",
                  "Samsung Tab repair",
                  "Battery replacement",
                  "Charging port fixing",
                  "Software issues",
                  "Button repairs"
                ]
              },
              {
                category: "Gaming Console Repair",
                services: [
                  "PlayStation repair",
                  "Xbox fixing",
                  "Nintendo Switch service",
                  "Controller repair",
                  "HDMI port replacement",
                  "Disc drive repair"
                ]
              },
              {
                category: "Smart Device Repair",
                services: [
                  "Apple Watch repair",
                  "Smartwatch fixing",
                  "Fitness tracker service",
                  "Earbuds repair",
                  "Smart speaker fixing",
                  "Device diagnostics"
                ]
              },
              {
                category: "Additional Services",
                services: [
                  "Data backup & transfer",
                  "Software installation",
                  "Device setup",
                  "Network troubleshooting",
                  "Security setup",
                  "Custom PC builds"
                ]
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-black mb-4">{service.category}</h3>
                <ul className="space-y-2">
                  {service.services.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={`/${service.category.toLowerCase().replace(/\s+/g, '-')}-brooks`}
                  className="inline-block mt-4 text-yellow-500 hover:text-yellow-600 font-semibold text-sm"
                >
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Brooks Chooses Us */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-4">
              Why Brooks Residents Choose ZipZap
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trusted by the Brooks community for reliable, professional device repair
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 rounded-2xl p-8">
              <Wrench className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">Expert Technicians</h3>
              <p className="text-gray-300 mb-4">
                Our certified technicians have years of experience repairing all types of electronics.
                We stay updated with the latest repair techniques and use professional-grade tools.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-500" />
                  Certified repair specialists
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-500" />
                  Continuous training
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-500" />
                  Professional tools & equipment
                </li>
              </ul>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8">
              <MapPin className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-4">Convenient for Brooks</h3>
              <p className="text-gray-300 mb-4">
                Located conveniently for Brooks residents, with easy access from Highway 99E.
                We understand the needs of our rural community and provide flexible service options.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-500" />
                  Easy parking available
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-500" />
                  Quick turnaround times
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-yellow-500" />
                  Mail-in service available
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
              Serving Brooks and Surrounding Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Convenient device repair for North Marion County communities
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-black mb-4">Primary Service Area</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-700">Brooks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-700">Gervais</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-700">Woodburn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-700">Mt. Angel</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-black mb-4">Also Serving</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-700">Hubbard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-700">Aurora</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-700">Donald</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-yellow-500" />
                    <span className="text-gray-700">St. Paul</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600 text-center">
                Can't make it to our location? Ask about our mail-in repair service for Brooks area residents!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
              What Brooks Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real reviews from your Brooks neighbors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                location: "Brooks, OR",
                rating: 5,
                review: "Best device repair service in the area! Fixed my iPhone screen in less than an hour. The lifetime warranty gives me peace of mind."
              },
              {
                name: "Mike T.",
                location: "Gervais, OR",
                rating: 5,
                review: "They saved my laptop after I spilled coffee on it. Professional service and fair pricing. Highly recommend for anyone in Brooks area."
              },
              {
                name: "Jennifer R.",
                location: "Woodburn, OR",
                rating: 5,
                review: "Fixed my son's gaming console when other shops said it couldn't be repaired. Amazing service and very knowledgeable staff!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.review}"</p>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-black">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
            Get Your Device Fixed Today in Brooks
          </h2>
          <p className="text-xl text-black mb-8 max-w-3xl mx-auto">
            Professional repair service with lifetime warranty. Most repairs completed same-day.
            Serving Brooks and all of North Marion County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5034009920"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone className="h-5 w-5" />
              Call Brooks: (503) 400-9920
            </a>
            <a
              href="https://maps.google.com/?q=ZipZap+Computers+Brooks+Oregon"
              className="bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all border-2 border-black inline-flex items-center justify-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin className="h-5 w-5" />
              Get Directions to Brooks
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}