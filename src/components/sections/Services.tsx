import Link from 'next/link'
import { Smartphone, Laptop, Gamepad2, ArrowRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import HeaderElectric from '@/components/ui/HeaderElectric'

const services = [
  {
    icon: Smartphone,
    title: 'iPhone Repair',
    description: 'Screen replacements, battery fixes, water damage repair, and more for all iPhone models.',
    href: '/iphone-repair-services-in-salem',
    features: ['Screen Repair', 'Battery Replacement', 'Water Damage', 'Camera Issues']
  },
  {
    icon: Laptop,
    title: 'Mac & PC Repair',
    description: 'Hardware diagnostics, virus removal, data recovery, and performance optimization.',
    href: '/computer-repair-services-in-salem',
    features: ['Hardware Repair', 'Virus Removal', 'Data Recovery', 'Upgrades']
  },
  {
    icon: Gamepad2,
    title: 'Xbox & PlayStation',
    description: 'Controller repairs, console overheating fixes, disc drive issues, and more.',
    href: '/gaming-console-repair-services-in-salem',
    features: ['Controller Repair', 'Overheating Fix', 'Disc Drive', 'HDMI Issues']
  }
]

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-zz-black py-16 sm:py-20">
      {/* Subtle brand lightning to match the rest of the site */}
      <HeaderElectric sparkDensity={70} boltJitter={10} boltInterval={[1800, 3800]} intensity={0.4} />
      {/* Single soft glow instead of the old hex-grid + blades */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500/[0.06] blur-[140px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header — calm, warm, confident */}
        <Reveal as="div" className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            What can we fix for you?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">
            Phones, computers, and consoles — fast turnaround and a lifetime warranty on every repair.
          </p>
        </Reveal>

        {/* Services grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Reveal key={index} delay={index * 120}>
                <div className="group h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-500 transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="h-8 w-8 text-black" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-heading text-2xl font-bold text-black">{service.title}</h3>
                    <p className="leading-relaxed text-gray-600">{service.description}</p>

                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={service.href}
                      className="group/link mt-6 inline-flex items-center gap-2 font-semibold text-black transition-colors hover:text-yellow-600"
                    >
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <Reveal as="div" delay={120} className="mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400"
          >
            View all services
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
