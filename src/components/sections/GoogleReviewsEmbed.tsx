'use client'

export default function GoogleReviewsEmbed() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Real Customer Reviews from Google
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our customers are saying about ZipZap Computers on Google
          </p>
        </div>

        {/* Google Maps Embed showing business with reviews */}
        <div className="bg-white rounded-2xl shadow-xl p-4 mb-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2866.9245867716894!2d-123.0089297!3d44.9934315!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf8bf5b2d28f8fafe%3A0x87084405572eeaba!2sZipZap%20Computers!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl"
          ></iframe>
        </div>

        {/* Review CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.google.com/maps/place/ZipZap+Computers/@44.9934315,-123.0089297,17z/data=!4m8!3m7!1s0xf8bf5b2d28f8fafe:0x87084405572eeaba!8m2!3d44.9934315!4d-123.0089297!9m1!1b1!16s%2Fg%2F11c5q5j8xk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            Read All Google Reviews
          </a>

          <a
            href="https://g.page/r/CeruriFcECIfEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-400 transition-colors shadow-lg"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            Leave Us a Review
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-500 mb-2">4.8★</div>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-black mb-2">47+</div>
            <p className="text-gray-600">Google Reviews</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">✓</div>
            <p className="text-gray-600">Verified Business</p>
          </div>
        </div>
      </div>
    </section>
  )
}