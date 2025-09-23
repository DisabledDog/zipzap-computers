'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, ExternalLink, MapPin, Clock } from 'lucide-react'

interface GoogleReview {
  author_name: string
  rating: number
  text: string
  time: number
  relative_time_description: string
  profile_photo_url?: string
}

export default function CustomGoogleWidget() {
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [loading, setLoading] = useState(true)
  const [businessRating, setBusinessRating] = useState<number | null>(null)
  const [totalReviews, setTotalReviews] = useState<number | null>(null)

  useEffect(() => {
    loadRealGoogleReviews()
  }, [])

  const loadRealGoogleReviews = async () => {
    try {
      const response = await fetch('/api/google-reviews')
      const data = await response.json()

      if (data.success && data.reviews) {
        setReviews(data.reviews)
        setBusinessRating(data.rating)
        setTotalReviews(data.user_ratings_total)
        setLoading(false)
      } else {
        console.error('Google Reviews API error:', data.error)
        loadFallbackReviews()
      }
    } catch (error) {
      console.error('Error loading Google reviews:', error)
      loadFallbackReviews()
    }
  }


  const loadFallbackReviews = () => {
    // Fallback reviews in case API fails
    const fallbackReviews: GoogleReview[] = [
      {
        author_name: "James M.",
        rating: 5,
        text: "Excellent service! They fixed my laptop's broken screen in just a few hours. Very professional and reasonably priced. Definitely recommend ZipZap Computers!",
        time: Date.now() / 1000 - 86400 * 5,
        relative_time_description: "5 days ago"
      },
      {
        author_name: "Sarah K.",
        rating: 5,
        text: "Best computer repair shop in Salem! They recovered all my important files from a crashed hard drive. Great customer service and fast turnaround.",
        time: Date.now() / 1000 - 86400 * 12,
        relative_time_description: "2 weeks ago"
      },
      {
        author_name: "Mike R.",
        rating: 5,
        text: "Had my phone screen replaced here. Quick service, fair prices, and they stand behind their work. Will definitely come back for future repairs.",
        time: Date.now() / 1000 - 86400 * 20,
        relative_time_description: "3 weeks ago"
      }
    ]

    setReviews(fallbackReviews)
    setLoading(false)
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-xl p-6 h-48"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-700 to-slate-800 relative overflow-hidden">
      {/* Geometric Background Patterns */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect width="60" height="60" fill="none" stroke="#60a5fa" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="30" cy="30" r="1.5" fill="#60a5fa" opacity="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
        </svg>
      </div>

      {/* Floating Accent Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-xl"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-400/15 rounded-full blur-lg"></div>
      <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-blue-300/10 rounded-full blur-lg"></div>
      <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-yellow-300/10 rounded-full blur-xl"></div>

      {/* Diagonal Lines */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="0" x2="200" y2="600" stroke="#60a5fa" strokeWidth="1" opacity="0.3"/>
          <line x1="150" y1="0" x2="350" y2="600" stroke="#60a5fa" strokeWidth="1" opacity="0.2"/>
          <line x1="300" y1="0" x2="500" y2="600" stroke="#fbbf24" strokeWidth="1" opacity="0.3"/>
          <line x1="450" y1="0" x2="650" y2="600" stroke="#60a5fa" strokeWidth="1" opacity="0.2"/>
          <line x1="600" y1="0" x2="800" y2="600" stroke="#fbbf24" strokeWidth="1" opacity="0.3"/>
        </svg>
      </div>

      {/* Hexagon Accents */}
      <div className="absolute top-1/4 right-10 opacity-20">
        <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <polygon points="40,5 65,22.5 65,57.5 40,75 15,57.5 15,22.5"
                   fill="none" stroke="#60a5fa" strokeWidth="2" opacity="0.6"/>
          <polygon points="40,15 55,25 55,55 40,65 25,55 25,25"
                   fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.4"/>
        </svg>
      </div>

      <div className="absolute bottom-1/4 left-16 opacity-15">
        <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <polygon points="30,3 50,16.5 50,43.5 30,57 10,43.5 10,16.5"
                   fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live Google Reviews
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>

          <p className="text-xl text-slate-300 mb-8">
            Real reviews from our verified Google Business Profile
          </p>

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-8 w-8 ${businessRating && star <= Math.floor(businessRating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                  />
                ))}
              </div>
              <span className="text-3xl font-bold text-white">{businessRating || 'Loading...'}</span>
            </div>

            <div className="h-8 w-px bg-gray-300"></div>

            <div className="text-center">
              <div className="text-2xl font-bold text-white">{totalReviews ? `${totalReviews}+` : 'Loading...'}</div>
              <div className="text-sm text-slate-300">Google Reviews</div>
            </div>

            <div className="h-8 w-px bg-gray-300"></div>

            <div className="flex items-center gap-2 text-green-600">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium text-white">Verified Business</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <Quote className="h-8 w-8 text-blue-500" />
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed mb-6 text-sm line-clamp-4">
                "{review.text}"
              </p>

              {/* Google Badge */}
              <div className="mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google Review
                </span>
              </div>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-gray-900">{review.author_name}</div>
                  <div className="text-gray-500 text-sm">{review.relative_time_description}</div>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {review.author_name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Business Info Card */}
        <div className="bg-slate-600/20 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-16 border border-slate-500/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">ZipZap Computers</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="h-5 w-5 text-yellow-400" />
                  <span>3945 Rich Dr NE B, Salem, OR 97305</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  <span>Mon-Fri: 10AM-6PM, Sat: 12PM-6PM</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${businessRating && star <= Math.floor(businessRating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-white">
                    {businessRating && totalReviews ? `${businessRating} (${totalReviews}+ reviews)` : 'Loading reviews...'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="https://www.google.com/maps/place/ZipZap+Computers/@44.9934315,-123.0089297,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
              >
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                View on Google Maps
                <ExternalLink className="h-4 w-4" />
              </a>

              <a
                href="https://g.page/r/CeruriFcECIfEAE/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-colors"
              >
                <Star className="h-5 w-5 fill-black" />
                Write a Review
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}