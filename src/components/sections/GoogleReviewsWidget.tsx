'use client'

export default function GoogleReviewsWidget() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Google Reviews</h2>

        {/* Option 1: Simple Google Reviews Badge */}
        <div className="flex justify-center mb-8">
          <a
            href="https://www.google.com/maps/place/ZipZap+Computers/@44.9934315,-123.0089297,17z/data=!3m1!4b1!4m6!3m5!1s0xf8bf5b2d28f8fafe:0x87084405572eeaba!8m2!3d44.9934315!4d-123.0089297!16s%2Fg%2F11c5q5j8xk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img
              src={`https://www.google.com/maps/api/staticmap?center=44.9934315,-123.0089297&zoom=15&size=400x300&markers=color:red%7C44.9934315,-123.0089297&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`}
              alt="ZipZap Computers on Google Maps"
              className="rounded-lg shadow-lg"
            />
          </a>
        </div>

        {/* Option 2: Embed Google Reviews (requires Place ID) */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Our Google Reviews</h3>

            {/* Google Places Widget - This would normally be an iframe embed */}
            <div className="bg-gray-100 p-8 rounded">
              <p className="text-gray-600 mb-4">
                To embed live Google Reviews here:
              </p>
              <ol className="text-left max-w-2xl mx-auto space-y-2">
                <li>1. Go to your Google Business Profile</li>
                <li>2. Click "Get more reviews" or "Share"</li>
                <li>3. Select "Embed reviews"</li>
                <li>4. Copy the embed code</li>
                <li>5. Replace this section with the embed code</li>
              </ol>

              <div className="mt-6">
                <a
                  href={`https://search.google.com/local/writereview?placeid=ChIJ--jQLVv_v1QR6u6uIVwQIh8`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Leave Us a Review on Google
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Option 3: Direct Link to Google Reviews */}
        <div className="mt-8 text-center">
          <a
            href={`https://search.google.com/local/reviews?placeid=ChIJ--jQLVv_v1QR6u6uIVwQIh8`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-semibold text-lg"
          >
            View All Our Google Reviews →
          </a>
        </div>
      </div>
    </section>
  )
}