import Image from 'next/image'
import {
  Phone, Clock, Shield, MapPin, CheckCircle2, ArrowRight,
  Smartphone, Laptop, Gamepad2, Tablet, Droplets, Battery, ScreenShare, HardDrive,
  Star,
} from 'lucide-react'

// IMPORTANT — vocabulary policy for this page:
// Apple, Samsung, Microsoft, and other manufacturers actively report Google Ads
// landing pages that use their trademarks. Disapproved ads / suspended accounts
// are common. This page deliberately uses ONLY device-class language:
//   - "device repair"            (not "iPhone repair")
//   - "smartphone screen"        (not "iPhone screen")
//   - "tablet"                   (not "iPad")
//   - "laptop"                   (not "MacBook")
//   - "gaming console"           (not "PlayStation" / "Xbox")
//   - "third-party / independent" repair angle
// Do NOT add brand names to this page. If a service-specific page is needed,
// build a separate one and link it only from organic, never from paid ads.

export default function GetRepairQuoteLanding() {
  return (
    <div className="min-h-screen bg-white antialiased">
      {/* Minimal LP header — brand + phone only, no nav */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-base leading-none">Z</span>
            </div>
            <span className="font-heading font-bold text-gray-900">ZipZap Computers</span>
          </div>
          <a
            href="tel:5034009920"
            className="hidden sm:inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            <Phone className="h-4 w-4" />
            (503) 400-9920
          </a>
          <a
            href="tel:5034009920"
            className="sm:hidden inline-flex items-center gap-1.5 bg-yellow-500 text-black font-semibold text-xs px-3 py-2 rounded-lg"
          >
            <Phone className="h-3.5 w-3.5" />
            Call
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="lp-hex" x="0" y="0" width="20" height="17.32" patternUnits="userSpaceOnUse">
                <polygon points="10,2 17.32,6 17.32,14 10,18 2.68,14 2.68,6" fill="none" stroke="#fbbf24" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lp-hex)" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
              Open Today · Walk-Ins Welcome
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight tracking-tight">
              Same-day device repair{' '}
              <span className="text-yellow-500">in Salem</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Cracked screens, dead batteries, water damage, slow computers, gaming consoles —
              fixed fast by Salem&apos;s top-rated independent repair shop. Free diagnostic.
              Lifetime warranty.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="tel:5034009920"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-7 py-4 rounded-xl font-semibold text-lg shadow-lg inline-flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
              >
                <Phone className="h-5 w-5" />
                Call (503) 400-9920
              </a>
              <a
                href="#quote"
                className="bg-black hover:bg-gray-900 text-yellow-400 hover:text-yellow-300 px-7 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2 border-2 border-yellow-500"
              >
                Get a Free Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 justify-center lg:justify-start">
              <Pill icon={Shield}>Lifetime Warranty</Pill>
              <Pill icon={Clock}>Same-Day Service</Pill>
              <Pill icon={MapPin}>3945 Rich Dr NE B</Pill>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/store-interior.jpg"
                alt="ZipZap Computers Salem repair shop interior"
                width={800}
                height={600}
                priority
                className="w-full h-full object-cover aspect-[4/3]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-yellow-500 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 text-center text-black text-sm sm:text-base font-semibold">
          <TrustItem icon={Star}>Top-rated locally</TrustItem>
          <TrustItem icon={CheckCircle2}>Free diagnostic</TrustItem>
          <TrustItem icon={Clock}>Most repairs in 1 hour</TrustItem>
          <TrustItem icon={Shield}>Lifetime warranty</TrustItem>
        </div>
      </section>

      {/* What we fix — strictly device-class language */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 tracking-tight mb-3">
              What we fix
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every major device class. If it has a battery and an issue, walk it in — we&apos;ll diagnose for free.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            <ServiceTile icon={Smartphone}  label="Smartphones"      sub="Screen, battery, charging port" />
            <ServiceTile icon={Tablet}      label="Tablets"           sub="Screen, battery, glass" />
            <ServiceTile icon={Laptop}      label="Laptops"           sub="Screen, battery, keyboard, SSD" />
            <ServiceTile icon={HardDrive}   label="Desktop Computers" sub="Diagnostics, hardware, virus removal" />
            <ServiceTile icon={Gamepad2}    label="Gaming Consoles"   sub="HDMI, disc drive, controller drift" />
            <ServiceTile icon={Droplets}    label="Water Damage"      sub="Same-day rescue, ultrasonic cleaning" />
            <ServiceTile icon={Battery}     label="Battery Service"   sub="Replacements for any device" />
            <ServiceTile icon={ScreenShare} label="Screen Replacement" sub="Cracks, touch issues, LCD damage" />
          </div>

          <p className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
            Independent third-party repair. We service every major brand without manufacturer restrictions or appointment delays.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 tracking-tight mb-3">
              How it works
            </h2>
            <p className="text-lg text-gray-600">Three steps, no appointment needed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Step n={1} title="Walk in or call" body="Bring your device to 3945 Rich Dr NE B, Salem, or call us first for a quick estimate." />
            <Step n={2} title="Free diagnostic" body="We&apos;ll inspect your device, identify the issue, and give you an exact written quote. No surprises." />
            <Step n={3} title="Same-day fix" body="Most repairs are done in under 60 minutes. Wait in our lounge or grab coffee — we&apos;ll text you when it&apos;s ready." />
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 mb-3">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" strokeWidth={1.5} />
              ))}
              <span className="ml-2 text-gray-700 font-semibold">Trusted by Salem locals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 tracking-tight">
              Real reviews from real customers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <ReviewCard
              text="Brought in my smartphone with a shattered screen at lunch — it was ready before I left work. Honest pricing, no upsell, lifetime warranty was real."
              author="Marcus T."
              context="Smartphone screen, Salem"
            />
            <ReviewCard
              text="My laptop wouldn&apos;t boot. They diagnosed it for free and had it back to me the next morning with all my files intact. Saved me from buying a new one."
              author="Jennifer K."
              context="Laptop diagnostic, Keizer"
            />
            <ReviewCard
              text="Console wouldn&apos;t output to the TV anymore. Walked in, they fixed the HDMI port same day. Whole family thrilled. Highly recommend."
              author="Brandon R."
              context="Gaming console HDMI, Woodburn"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 tracking-tight mb-10 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-3">
            <FaqItem
              q="How long do most repairs take?"
              a="Most screen and battery jobs are finished in 30–60 minutes. Water damage, complex diagnostics, and parts orders may take longer — we&apos;ll always give you an exact ETA before starting."
            />
            <FaqItem
              q="Do you charge for diagnostics?"
              a="No. Diagnostics are always free, in-shop or over the phone. You only pay if you authorize the repair."
            />
            <FaqItem
              q="What&apos;s covered by the lifetime warranty?"
              a="Every part we install — screen, battery, charging port, etc. — is warranted against defects for as long as you own the device. If it fails, we replace it free."
            />
            <FaqItem
              q="Are you authorized by manufacturers?"
              a="We&apos;re an independent third-party repair shop. That means faster service, fairer prices, and no appointment system to navigate. We use high-quality parts and stand behind every repair."
            />
            <FaqItem
              q="Can I drop off and come back?"
              a="Yes — most customers prefer this. We&apos;ll text you when the repair is complete, usually the same day."
            />
            <FaqItem
              q="What if my device can&apos;t be fixed?"
              a="If we can&apos;t fix it, you don&apos;t pay. Period. We&apos;ll also recycle it responsibly or apply trade-in credit toward a refurbished device from our store."
            />
          </div>
        </div>
      </section>

      {/* Final CTA + form */}
      <section id="quote" className="py-16 sm:py-20 bg-gradient-to-br from-yellow-500 to-yellow-400">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-black tracking-tight mb-4">
            Get your free quote
          </h2>
          <p className="text-lg sm:text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Tell us what&apos;s wrong and we&apos;ll get back to you with an exact price — usually within an hour during shop hours.
          </p>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <iframe
              src="https://www.clearsalehq.com/quote-embed/9bf0d320-e15c-4a51-a83f-7d2f9c4dcb67"
              className="w-full border-0"
              style={{ minHeight: 720 }}
              title="Get a free repair quote"
              loading="lazy"
            />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-black/80 text-sm font-medium">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> No obligation
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Reply within 1 hour
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Lifetime warranty included
            </span>
          </div>
        </div>
      </section>

      {/* Footer NAP */}
      <footer className="bg-black text-white py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <div className="font-heading font-bold text-yellow-500 text-lg mb-2">ZipZap Computers</div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Independent device repair, Salem, Oregon. Locally owned since 2021.
            </p>
          </div>
          <div>
            <div className="text-yellow-500 font-semibold text-sm uppercase tracking-wide mb-2">Visit</div>
            <a
              href="https://maps.google.com/?q=ZipZap+Computers+Salem+Oregon"
              target="_blank" rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-sm leading-relaxed inline-flex items-center gap-1"
            >
              <MapPin className="h-3.5 w-3.5 text-yellow-500" />
              3945 Rich Dr NE B<br/>Salem, OR 97305
            </a>
          </div>
          <div>
            <div className="text-yellow-500 font-semibold text-sm uppercase tracking-wide mb-2">Contact</div>
            <a href="tel:5034009920" className="text-gray-300 hover:text-white text-sm font-semibold inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-yellow-500" />
              (503) 400-9920
            </a>
            <p className="text-gray-400 text-xs mt-1">Mon–Fri 10–6 · Sat–Sun Closed</p>
          </div>
        </div>
      </footer>

      {/* Sticky bottom mobile call bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-yellow-500 border-t-2 border-black/10 shadow-2xl">
        <a
          href="tel:5034009920"
          className="flex items-center justify-center gap-2 py-4 text-black font-bold text-base"
        >
          <Phone className="h-5 w-5" />
          Call (503) 400-9920
        </a>
      </div>
    </div>
  )
}

/* ============== Building blocks ============== */

function Pill({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
      <Icon className="h-3.5 w-3.5 text-yellow-700" strokeWidth={2} />
      <span className="text-gray-800 text-xs sm:text-sm font-medium">{children}</span>
    </div>
  )
}

function TrustItem({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center justify-center gap-1.5">
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2} />
      <span>{children}</span>
    </div>
  )
}

function ServiceTile({ icon: Icon, label, sub }: { icon: React.ElementType; label: string; sub: string }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white hover:border-yellow-400 hover:shadow-lg transition-all p-5 sm:p-6 text-center">
      <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-xl bg-yellow-50 group-hover:bg-yellow-100 flex items-center justify-center mb-3 transition-colors">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-yellow-600" strokeWidth={1.7} />
      </div>
      <div className="font-semibold text-gray-900 text-sm sm:text-base">{label}</div>
      <div className="text-xs sm:text-sm text-gray-500 mt-1 leading-snug">{sub}</div>
    </div>
  )
}

function Step({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-9 h-9 rounded-full bg-yellow-500 text-black font-bold flex items-center justify-center text-base mb-4">
        {n}
      </div>
      <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
    </div>
  )
}

function ReviewCard({ text, author, context }: { text: string; author: string; context: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-0.5 mb-3">
        {[1,2,3,4,5].map((i) => (
          <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" strokeWidth={1.5} />
        ))}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
      <div className="text-sm">
        <div className="font-semibold text-gray-900">{author}</div>
        <div className="text-gray-500 text-xs">{context}</div>
      </div>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
      <summary className="cursor-pointer px-5 py-4 flex items-center justify-between gap-4 list-none">
        <span className="font-semibold text-gray-900 text-base">{q}</span>
        <span className="text-yellow-600 text-xl group-open:rotate-45 transition-transform">+</span>
      </summary>
      <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">{a}</div>
    </details>
  )
}
