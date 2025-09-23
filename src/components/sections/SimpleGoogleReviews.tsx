'use client'

import { Star, ExternalLink } from 'lucide-react'

export default function SimpleGoogleReviews() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="bg-yellow-500 text-black py-8 px-6 rounded-2xl mx-auto max-w-4xl shadow-lg">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Real reviews from our Google Business Profile
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 fill-black text-black" />
                ))}
              </div>
              <span className="text-xl font-bold">
                4.8/5 on Google
              </span>
              <a
                href="https://www.google.com/maps/place/ZipZap+Computers/@44.9934315,-123.0089297,17z/data=!4m8!3m7!1s0xf8bf5b2d28f8fafe:0x87084405572eeaba!8m2!3d44.9934315!4d-123.0089297!9m1!1b1!16s%2Fg%2F11c5q5j8xk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                View All 47+ Reviews
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Google Business Profile Embed */}
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-12">
          <h3 className="text-2xl font-bold text-center mb-6">Our Google Business Profile</h3>

          {/* Google Maps Embed with Business Info */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2866.924586771689!2d-123.00892970000001!3d44.9934315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf8bf5b2d28f8fafe%3A0x87084405572eeaba!2sZipZap%20Computers!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="text-center mt-6">
            <p className="text-gray-600 mb-4">
              Click on our business in the map above to see our latest Google reviews!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="https://www.google.com/maps/place/ZipZap+Computers/@44.9934315,-123.0089297,17z/data=!4m8!3m7!1s0xf8bf5b2d28f8fafe:0x87084405572eeaba!8m2!3d44.9934315!4d-123.0089297!9m1!1b1!16s%2Fg%2F11c5q5j8xk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
            Read All Our Google Reviews
            <ExternalLink className="h-4 w-4" />
          </a>

          <a
            href="https://g.page/r/CeruriFcECIfEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-400 transition-colors shadow-lg"
          >
            <Star className="h-5 w-5 fill-black text-black" />
            Leave Us a Review
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl font-bold text-yellow-500 mb-2">4.8★</div>
            <p className="text-white">Google Rating</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl font-bold text-yellow-500 mb-2">47+</div>
            <p className="text-white">Customer Reviews</p>
          </div>
          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl font-bold text-yellow-500 mb-2">✓</div>
            <p className="text-white">Verified Business</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-black text-white py-8 px-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Experience Our Award-Winning Service
            </h3>
            <p className="text-gray-300 mb-6">
              Join the hundreds of satisfied customers who trust ZipZap Computers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5034009920"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg"
              >
                Call (503) 400-9920
              </a>
              <a
                href="/contact"
                className="bg-white border-2 border-yellow-500 text-black hover:bg-yellow-50 px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg"
              >
                Book Your Repair
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}