'use client'

import { Star, ExternalLink } from 'lucide-react'

export default function GoogleReviewWidget() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Google Reviews
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our customers are saying about ZipZap Computers
          </p>
        </div>

        {/* Google Reviews Widget */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">

          {/* Rating Summary */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-3xl font-bold text-gray-900 ml-2">4.8</span>
            </div>
            <p className="text-gray-600 text-lg">Based on 47+ Google Reviews</p>
          </div>

          {/* Google Business Profile Embed */}
          <div className="space-y-6">

            {/* Option 1: Google Maps Business Listing */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4 text-center">Our Google Business Profile</h3>
              <div className="rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2866.924586771689!2d-123.00892970000001!3d44.9934315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xf8bf5b2d28f8fafe%3A0x87084405572eeaba!2sZipZap%20Computers!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <p className="text-sm text-gray-600 text-center mt-3">
                Click on our business marker above to see reviews and business details
              </p>
            </div>

            {/* Option 2: Third-Party Widget Placeholder */}
            <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-xl p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Google Reviews Widget
                </h3>
                <p className="text-blue-700 mb-6">
                  To display live Google reviews here, you can use a third-party widget service like:
                </p>
                <div className="space-y-3 text-left max-w-lg mx-auto">
                  <div className="bg-white p-3 rounded-lg">
                    <strong>Elfsight Google Reviews:</strong> Free widget, easy setup
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <strong>Trustindex:</strong> Free Google Reviews widget
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <strong>POWR:</strong> Customizable review widgets
                  </div>
                </div>
                <p className="text-sm text-blue-600 mt-4">
                  These services provide embed codes that you paste here to show live reviews
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a
                href="https://www.google.com/maps/place/ZipZap+Computers/@44.9934315,-123.0089297,17z/data=!4m8!3m7!1s0xf8bf5b2d28f8fafe:0x87084405572eeaba!8m2!3d44.9934315!4d-123.0089297!9m1!1b1!16s%2Fg%2F11c5q5j8xk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-colors shadow-lg"
              >
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                Read All Reviews on Google
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
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-3">
              💡 How to Add Live Google Reviews Widget
            </h3>
            <ol className="text-yellow-700 space-y-2 text-sm">
              <li><strong>1.</strong> Go to <a href="https://elfsight.com/google-reviews-widget/" target="_blank" className="underline">Elfsight Google Reviews Widget</a></li>
              <li><strong>2.</strong> Enter your Google Business URL</li>
              <li><strong>3.</strong> Customize the widget design</li>
              <li><strong>4.</strong> Copy the embed code</li>
              <li><strong>5.</strong> Replace the placeholder above with the embed code</li>
            </ol>
            <p className="text-yellow-600 text-xs mt-3">
              This will show your actual Google reviews automatically updated in real-time
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}