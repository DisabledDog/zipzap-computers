import { Metadata } from 'next'
import { Wrench, Shield, Clock, DollarSign, CheckCircle, Phone, MapPin, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Electronics & Gadgets Repair Solutions in Oregon | ZipZap Computers',
  description: 'Professional electronics and gadget repair services throughout Oregon. Expert technicians fix phones, computers, tablets, gaming consoles, and more with lifetime warranty.',
  keywords: 'electronics repair Oregon, gadget repair Oregon, device repair Salem, tech repair Brooks, Oregon electronics service'
}

export default function ElectronicsGadgetsRepairOregon() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="oregon-hexagon" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                <polygon
                  points="10,2 17.32,6 17.32,14 10,18 2.68,14 2.68,6"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#oregon-hexagon)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white">
              Oregon's Premier <span className="text-yellow-500">Electronics & Gadgets</span> Repair Solution
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From smartphones to gaming consoles, we solve all your electronics repair problems with professional service,
              lifetime warranty, and same-day solutions. Serving Salem, Brooks, and surrounding Oregon communities.
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
                Get Free Diagnostic
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Common Problems We Solve */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
              Common Electronics Problems We Solve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional solutions for all your device issues - no problem too big or small
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cracked & Broken Screens",
                problems: ["Shattered phone displays", "Cracked tablet screens", "Laptop LCD damage", "Touch responsiveness issues"],
                solution: "Same-day screen replacement with lifetime warranty"
              },
              {
                title: "Battery & Power Issues",
                problems: ["Poor battery life", "Device won't charge", "Random shutdowns", "Swollen batteries"],
                solution: "Professional battery replacement and power diagnostics"
              },
              {
                title: "Water & Liquid Damage",
                problems: ["Spilled coffee on laptop", "Phone dropped in water", "Rain-damaged devices", "Liquid corrosion"],
                solution: "Emergency water damage repair with ultrasonic cleaning"
              },
              {
                title: "Performance Problems",
                problems: ["Slow computers", "Freezing devices", "App crashes", "Overheating issues"],
                solution: "Complete diagnostics and performance optimization"
              },
              {
                title: "Gaming Console Failures",
                problems: ["Red ring of death", "Blue light issues", "Disc read errors", "Controller drift"],
                solution: "Expert console repair for PlayStation, Xbox, and Nintendo"
              },
              {
                title: "Data Loss & Recovery",
                problems: ["Deleted files", "Failed hard drives", "Corrupted storage", "Lost photos"],
                solution: "Professional data recovery with high success rates"
              }
            ].map((problem, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-black mb-4">{problem.title}</h3>
                <ul className="space-y-2 mb-4">
                  {problem.problems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-green-600">{problem.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Oregon Chooses ZipZap */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
              Why Oregon Chooses ZipZap Computers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by thousands of customers across Salem, Brooks, and surrounding communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Lifetime Warranty</h3>
              <p className="text-gray-600">All repairs backed by Oregon's best warranty coverage</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Same-Day Service</h3>
              <p className="text-gray-600">Most repairs completed within hours, not days</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Fair Pricing</h3>
              <p className="text-gray-600">Transparent pricing with no hidden fees or surprises</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">5-Star Reviews</h3>
              <p className="text-gray-600">Consistently rated 5 stars by Oregon customers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Device Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
              All Electronics & Gadgets We Repair
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive repair services for every type of electronic device
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "iPhones", "Samsung Phones", "Android Phones", "iPads",
              "Android Tablets", "MacBooks", "Windows Laptops", "Desktop PCs",
              "PlayStation", "Xbox", "Nintendo Switch", "Apple Watch",
              "Smartwatches", "Gaming Controllers", "Monitors", "Keyboards",
              "Hard Drives", "SSDs", "Cameras", "Headphones"
            ].map((device, index) => (
              <div key={index} className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow border border-gray-200">
                <p className="font-medium text-gray-800">{device}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
              Serving All of Oregon
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Convenient locations and service throughout the Willamette Valley
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-yellow-500" />
                <h3 className="text-2xl font-semibold text-black">Salem Location</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Our main service center in Salem provides comprehensive electronics repair for Marion County
                and surrounding areas. Easy access from I-5 and downtown Salem.
              </p>
              <a href="/services" className="text-yellow-500 hover:text-yellow-600 font-semibold">
                View Salem Services →
              </a>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="h-6 w-6 text-yellow-500" />
                <h3 className="text-2xl font-semibold text-black">Brooks Location</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Serving Brooks, Gervais, and North Marion County with full electronics repair services.
                Convenient location for rural communities.
              </p>
              <a href="/device-repair-brooks-or" className="text-yellow-500 hover:text-yellow-600 font-semibold">
                View Brooks Services →
              </a>
            </div>
          </div>

          <div className="mt-12 bg-black rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-semibold text-white mb-4">
              We Also Serve These Oregon Communities
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300">
              <div>Keizer</div>
              <div>Silverton</div>
              <div>Woodburn</div>
              <div>Dallas</div>
              <div>Monmouth</div>
              <div>Independence</div>
              <div>Stayton</div>
              <div>Albany</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
            Don't Let Device Problems Slow You Down
          </h2>
          <p className="text-xl text-black mb-8 max-w-3xl mx-auto">
            Get your electronics fixed today with Oregon's most trusted repair service.
            Free diagnostics, lifetime warranty, and same-day service available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5034009920"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 shadow-lg"
            >
              <Phone className="h-5 w-5" />
              Call (503) 400-9920
            </a>
            <a
              href="/#quote-form"
              className="bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all border-2 border-black inline-flex items-center justify-center gap-2"
            >
              Get Free Quote Online
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}