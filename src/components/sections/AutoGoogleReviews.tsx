'use client'

import { useState, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'

interface GoogleReview {
  author_name: string
  rating: number
  text: string
  time: number
  relative_time_description: string
  profile_photo_url?: string
}

export default function AutoGoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadGoogleReviews()
  }, [])

  const loadGoogleReviews = async () => {
    try {
      const response = await fetch('/api/google-reviews')
      const data = await response.json()

      if (data.success && data.reviews) {
        setReviews(data.reviews)
        setLoading(false)
      } else {
        setError(data.error || 'Unable to load reviews')
        setLoading(false)
      }
    } catch (err) {
      console.error('Error loading Google reviews:', err)
      setError('Failed to load reviews from server')
      setLoading(false)
    }
  }


  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Loading Google Reviews...</h2>
            <div className="animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-6 shadow">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || reviews.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
            <p className="text-gray-600 mb-6">
              {error || 'Reviews are loading. Please check our Google Business Profile for the latest reviews.'}
            </p>
            <a
              href="https://g.page/r/CeruriFcECIfEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-colors"
            >
              <Star className="h-5 w-5 fill-black" />
              View Our Google Reviews
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Real Customer Reviews from Google
          </h2>
          <p className="text-lg text-gray-600">
            Automatically pulled from our Google Business Profile
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <Quote className="h-8 w-8 text-yellow-500" />
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                "{review.text}"
              </p>

              {/* Verified Badge */}
              <div className="mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                  ✓ Verified Google Review
                </span>
              </div>

              {/* Author Info */}
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-black">{review.author_name}</div>
                  <div className="text-gray-500 text-sm">{review.relative_time_description}</div>
                </div>
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  {review.profile_photo_url ? (
                    <img
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <span className="text-black font-bold text-lg">
                      {review.author_name.charAt(0)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://g.page/r/CeruriFcECIfEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-yellow-400 transition-colors shadow-lg"
          >
            <Star className="h-5 w-5 fill-black" />
            Leave Us a Review
          </a>
        </div>
      </div>
    </section>
  )
}