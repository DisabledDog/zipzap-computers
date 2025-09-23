import { Smartphone, Laptop, Gamepad2, Tablet, Watch, Headphones, Monitor, HardDrive, Wifi, Shield, Zap, Wrench } from 'lucide-react'

const services = [
  {
    category: "iPhone Repair Services",
    icon: Smartphone,
    description: "Professional iPhone repair services for all models from iPhone 6 to iPhone 17 Pro Max. We use only high-quality parts and provide lifetime warranty on all repairs.",
    services: [
      {
        name: "iPhone Screen Replacement",
        description: "Complete LCD and OLED screen replacement for cracked, black, or unresponsive iPhone displays. We repair all iPhone models including iPhone 17, 16, 15, 14, 13, 12, 11, XS, XR, X, 8, 7, and older models. Our screen replacements come with lifetime warranty and same-day service available.",
      },
      {
        name: "iPhone Battery Replacement",
        description: "iPhone battery replacement for devices with poor battery life, unexpected shutdowns, or swollen batteries. We use genuine quality batteries and provide battery health diagnostics. Compatible with all iPhone models from iPhone 6 through iPhone 17 Pro Max.",
      },
      {
        name: "iPhone Water Damage Repair",
        description: "Emergency water damage repair for iPhones exposed to liquid. Our technicians perform complete disassembly, ultrasonic cleaning, and component-level repair. We can recover devices damaged by water, coffee, soda, and other liquids with high success rates.",
      },
      {
        name: "iPhone Camera Repair",
        description: "Front and rear camera repair for blurry photos, black screens, or camera app crashes. We repair camera modules, lens assemblies, and flash components for all iPhone models including wide, ultra-wide, and telephoto cameras on Pro models.",
      },
      {
        name: "iPhone Charging Port Repair",
        description: "Lightning port cleaning and replacement for iPhones that won't charge or have loose connections. We clean debris, replace damaged ports, and repair charging circuit issues. Compatible with all Lightning-equipped iPhone models.",
      },
      {
        name: "iPhone Speaker & Microphone Repair",
        description: "Speaker and microphone repair for call audio issues, muffled sound, or no audio output. We repair earpiece speakers, loud speakers, and microphone assemblies to restore clear communication and media playback.",
      }
    ]
  },
  {
    category: "Android Phone Repair Services",
    icon: Smartphone,
    description: "Expert Android phone repair for Samsung Galaxy, Google Pixel, OnePlus, LG, and other Android devices. Professional service with quality parts and warranty coverage.",
    services: [
      {
        name: "Samsung Galaxy Screen Repair",
        description: "Samsung Galaxy screen replacement for all models including Galaxy S24, S23, S22, S21, Note series, and A-series phones. We repair AMOLED and Super AMOLED displays with same-day service available. Includes touch digitizer and LCD replacement.",
      },
      {
        name: "Google Pixel Repair",
        description: "Complete Google Pixel repair services for Pixel 8, 7, 6, 5, 4, and earlier models. We handle screen replacement, battery service, camera repair, and charging port issues with genuine quality parts and expert diagnostics.",
      },
      {
        name: "Android Battery Replacement",
        description: "Android phone battery replacement for devices with degraded battery performance. We service Samsung, Google, OnePlus, LG, and other Android brands with high-capacity replacement batteries and proper calibration.",
      }
    ]
  },
  {
    category: "Computer Repair Services",
    icon: Laptop,
    description: "Comprehensive computer repair services for MacBooks, Windows laptops, and desktop computers. Hardware diagnostics, software troubleshooting, and performance optimization.",
    services: [
      {
        name: "MacBook Screen Replacement",
        description: "MacBook screen replacement for cracked or damaged displays on MacBook Air and MacBook Pro models. We repair Retina displays, LCD panels, and complete screen assemblies for all MacBook generations including M1, M2, and Intel-based models.",
      },
      {
        name: "MacBook Battery Service",
        description: "MacBook battery replacement for swollen, degraded, or non-charging batteries. We service MacBook Air and MacBook Pro batteries with genuine quality replacements and proper disposal of old batteries. Includes battery health diagnostics.",
      },
      {
        name: "MacBook Logic Board Repair",
        description: "MacBook logic board repair for liquid damage, power issues, and component failures. Our micro-soldering experts can repair charging circuits, USB ports, audio jacks, and other logic board components to restore full functionality.",
      },
      {
        name: "Windows Laptop Repair",
        description: "Windows laptop repair for all major brands including Dell, HP, Lenovo, ASUS, and Acer. We handle screen replacement, keyboard repair, hard drive upgrades, RAM installation, and motherboard diagnostics for optimal performance.",
      },
      {
        name: "Desktop Computer Repair",
        description: "Desktop PC repair and custom build services. We diagnose hardware failures, replace components, upgrade systems, and optimize performance. Services include motherboard repair, GPU installation, SSD upgrades, and complete system builds.",
      },
      {
        name: "Data Recovery Services",
        description: "Professional data recovery from failed hard drives, corrupted SSDs, and damaged storage devices. We can recover photos, documents, and important files from physically damaged drives with high success rates using specialized equipment.",
      },
      {
        name: "Virus Removal & Malware Cleanup",
        description: "Complete virus removal and malware cleanup for infected computers. We remove trojans, ransomware, adware, and other malicious software while preserving your data. Includes system optimization and security software installation.",
      }
    ]
  },
  {
    category: "Gaming Console Repair",
    icon: Gamepad2,
    description: "Gaming console repair services for PlayStation, Xbox, and Nintendo systems. We fix hardware issues, controller problems, and performance issues with expert diagnostics.",
    services: [
      {
        name: "PlayStation Repair Services",
        description: "PlayStation console repair for PS5, PS4, PS4 Pro, and older PlayStation systems. We fix overheating issues, disc drive problems, HDMI port repair, power supply issues, and blue light of death. Includes controller repair and joystick replacement.",
      },
      {
        name: "Xbox Console Repair",
        description: "Xbox repair services for Xbox Series X, Series S, Xbox One, and Xbox 360 consoles. We repair red ring of death, disc drive issues, overheating problems, HDMI output issues, and controller connectivity problems with professional diagnostics.",
      },
      {
        name: "Nintendo Switch Repair",
        description: "Nintendo Switch repair for Joy-Con drift, cracked screens, charging port issues, and dock connectivity problems. We service Nintendo Switch, Switch Lite, and Switch OLED models with genuine parts and expert craftsmanship.",
      },
      {
        name: "Controller Repair Services",
        description: "Gaming controller repair for all major console controllers. We fix joystick drift, button sticking, trigger issues, and connectivity problems for PlayStation, Xbox, and Nintendo controllers with precision calibration.",
      }
    ]
  },
  {
    category: "Tablet Repair Services",
    icon: Tablet,
    description: "Professional tablet repair for iPad and Android tablets. Screen replacement, battery service, and charging port repair with same-day service available.",
    services: [
      {
        name: "iPad Screen Replacement",
        description: "iPad screen replacement for all iPad models including iPad Pro, iPad Air, iPad mini, and standard iPad. We repair cracked glass, LCD damage, and touch responsiveness issues with high-quality replacement screens and precision installation.",
      },
      {
        name: "iPad Battery Replacement",
        description: "iPad battery replacement for tablets with poor battery life or charging issues. We service all iPad generations with genuine quality batteries and proper adhesive sealing to maintain water resistance where applicable.",
      },
      {
        name: "Android Tablet Repair",
        description: "Android tablet repair for Samsung Galaxy Tab, Amazon Fire, and other Android tablets. We handle screen replacement, charging port repair, and software troubleshooting for optimal tablet performance and functionality.",
      }
    ]
  },
  {
    category: "Smartwatch Repair Services",
    icon: Watch,
    description: "Smartwatch repair services for Apple Watch and other wearable devices. Screen replacement, battery service, and water damage repair.",
    services: [
      {
        name: "Apple Watch Screen Repair",
        description: "Apple Watch screen replacement for cracked or damaged displays on all Apple Watch models including Series 9, 8, 7, 6, SE, and older generations. We repair OLED displays and touch digitizers with precision micro-work.",
      },
      {
        name: "Apple Watch Battery Replacement",
        description: "Apple Watch battery replacement for watches with poor battery life or swollen batteries. We service all Apple Watch sizes and generations with genuine quality batteries and waterproof sealing restoration.",
      }
    ]
  }
]

const additionalServices = [
  {
    icon: HardDrive,
    title: "Data Recovery & Transfer",
    description: "Professional data recovery from failed drives, SSD recovery, and secure data transfer services."
  },
  {
    icon: Wifi,
    title: "Network Setup & Repair",
    description: "WiFi setup, router configuration, network troubleshooting, and connectivity issue resolution."
  },
  {
    icon: Shield,
    title: "Security & Antivirus",
    description: "Comprehensive security setup, antivirus installation, and malware protection for all devices."
  },
  {
    icon: Monitor,
    title: "Display & Monitor Repair",
    description: "External monitor repair, display calibration, and video output troubleshooting services."
  },
  {
    icon: Headphones,
    title: "Audio Device Repair",
    description: "Headphone repair, speaker fix, microphone troubleshooting, and audio component replacement."
  },
  {
    icon: Zap,
    title: "Power & Charging Issues",
    description: "Charging port repair, power supply diagnosis, and electrical component troubleshooting."
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="services-hexagon" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                <polygon
                  points="10,2 17.32,6 17.32,14 10,18 2.68,14 2.68,6"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.5"
                  opacity="0.6"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#services-hexagon)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white">
              Professional <span className="text-yellow-500">Repair Services</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Comprehensive electronics repair services in Salem, Oregon. Expert technicians, quality parts,
              lifetime warranty, and same-day service for most repairs. We fix phones, computers, tablets,
              gaming consoles, and more with professional diagnostics and transparent pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a
                href="tel:5034009920"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 shadow-lg"
              >
                Call (503) 400-9920
              </a>
              <a
                href="#services-list"
                className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all inline-flex items-center justify-center gap-2"
              >
                View All Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section id="services-list" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
              Complete Repair Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional electronics repair with lifetime warranty coverage and same-day service availability
            </p>
          </div>

          <div className="space-y-16">
            {services.map((category, categoryIndex) => {
              const IconComponent = category.icon
              return (
                <div key={categoryIndex} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-black" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-black">
                        {category.category}
                      </h3>
                      <p className="text-gray-600">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <h4 className="text-lg font-semibold text-black mb-3">
                          {service.name}
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support services for all your technology needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-black" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-4">
              Why Choose ZipZap Computers?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Professional repair services with transparent pricing and guaranteed quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Lifetime Warranty
              </h3>
              <p className="text-gray-300 text-sm">
                All repairs backed by comprehensive lifetime warranty coverage
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Same-Day Service
              </h3>
              <p className="text-gray-300 text-sm">
                Most repairs completed within hours, not days
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Wrench className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Expert Technicians
              </h3>
              <p className="text-gray-300 text-sm">
                Certified professionals with years of repair experience
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Quality Parts
              </h3>
              <p className="text-gray-300 text-sm">
                Only high-quality replacement parts and components used
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-heading font-bold text-black mb-4">
            Ready to Get Your Device Fixed?
          </h2>
          <p className="text-xl text-black mb-8 max-w-3xl mx-auto">
            Visit our Salem location or call for a free diagnostic. Most repairs completed same day with lifetime warranty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:5034009920"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2 shadow-lg"
            >
              Call (503) 400-9920
            </a>
            <a
              href="/#quote-form"
              className="bg-white hover:bg-gray-100 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all border-2 border-black inline-flex items-center justify-center gap-2"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}