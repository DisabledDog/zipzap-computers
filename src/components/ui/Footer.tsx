import Link from 'next/link'
import { Zap, Phone, MapPin, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-yellow-500" />
              <span className="text-xl font-heading font-bold">
                ZipZap Computers
              </span>
            </Link>
            <p className="text-gray-300 leading-relaxed">
              Fast, reliable electronics repair in Salem, OR. Phones, computers, and consoles
              with lifetime repair warranty and same-day service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-500">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-300 hover:text-yellow-500 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/repairs"
                className="text-gray-300 hover:text-yellow-500 transition-colors"
              >
                Repairs
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-yellow-500 transition-colors"
              >
                About
              </Link>
              <Link
                href="/warranty"
                className="text-gray-300 hover:text-yellow-500 transition-colors"
              >
                Warranty
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-500">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-yellow-500" />
                <a
                  href="tel:5034009920"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  (503) 400-9920
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-yellow-500" />
                <a
                  href="mailto:support@zipzapcomputers.com"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  support@zipzapcomputers.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-yellow-500" />
                <span className="text-gray-300">
                  3945 Rich Dr NE B<br />
                  Salem, OR 97305
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-500" />
                <div className="text-gray-300">
                  <div>Mon-Fri: 10:00 AM - 6:00 PM</div>
                  <div>Sat: 11:00 AM - 5:00 PM</div>
                  <div>Sun: Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ZipZap Computers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}