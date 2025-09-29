'use client'

import { Star, Quote, ExternalLink } from 'lucide-react'
import { reviews as defaultReviews, reviewStats } from '@/data/reviews'
import { useEffect, useState } from 'react'
import { Review } from '@/data/reviews'

interface GoogleReview {
  author_name: string
  rating: number
  text: string
  time: number
  relative_time_description: string
  profile_photo_url: string
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(defaultReviews)
  const [googleRating, setGoogleRating] = useState(reviewStats.averageRating)
  const [totalGoogleReviews, setTotalGoogleReviews] = useState(reviewStats.totalReviews)
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)

  useEffect(() => {
    // Check for admin-added reviews in localStorage
    try {
      const savedReviews = localStorage.getItem('zipzap_reviews')
      if (savedReviews && savedReviews.trim() !== '' && savedReviews !== '""') {
        const adminReviews = JSON.parse(savedReviews)
        // Use admin reviews if they exist, otherwise use defaults
        if (Array.isArray(adminReviews) && adminReviews.length > 0) {
          setReviews(adminReviews)
        }
      }
    } catch (error) {
      // If there's an error parsing, clear the corrupted data and use defaults
      // Error parsing saved reviews - will load fresh data
      localStorage.removeItem('zipzap_reviews')
      setReviews(defaultReviews)
    }

    // Fetch Google reviews automatically
    fetchGoogleReviews()
  }, [])

  const fetchGoogleReviews = async () => {
    setIsLoadingGoogle(true)
    try {
      const response = await fetch('/api/google-reviews')
      const data = await response.json()

      if (data.reviews && data.reviews.length > 0) {
        // Convert Google reviews to our format
        const formattedReviews: Review[] = data.reviews.map((review: GoogleReview, index: number) => ({
          id: `google-${index}`,
          name: review.author_name,
          rating: review.rating,
          text: review.text.length > 200 ? review.text.substring(0, 200) + '...' : review.text,
          service: 'Google Review',
          date: review.relative_time_description,
          verified: true,
          avatar: review.profile_photo_url
        }))

        // Combine with existing reviews or replace based on preference
        // Option 1: Replace all reviews with Google reviews
        // setReviews(formattedReviews)

        // Option 2: Mix Google reviews with local/admin reviews
        const localReviews = localStorage.getItem('zipzap_reviews')
        if (localReviews && localReviews.trim() !== '' && localReviews !== '""') {
          try {
            const adminReviews = JSON.parse(localReviews)
            if (Array.isArray(adminReviews) && adminReviews.length > 0) {
              // Keep admin reviews and add Google reviews
              setReviews([...adminReviews.slice(0, 3), ...formattedReviews.slice(0, 3)])
            } else {
              setReviews(formattedReviews)
            }
          } catch {
            setReviews(formattedReviews)
          }
        } else {
          // Mix default reviews with Google reviews for variety
          setReviews([...formattedReviews.slice(0, 3), ...defaultReviews.slice(0, 3)])
        }

        // Update rating stats if available
        if (data.rating) setGoogleRating(data.rating)
        if (data.totalReviews) setTotalGoogleReviews(data.totalReviews)
      }
    } catch (error) {
      // Failed to fetch Google reviews - using cached data
      // Keep using default/admin reviews on error
    } finally {
      setIsLoadingGoogle(false)
    }
  }
  return (
    <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
      {/* Lightning Bolt Reviews Pattern Background */}
      <div className="absolute inset-0 opacity-15">
        <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="lightning-reviews-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              {/* Lightning bolt shapes */}
              <g transform="translate(8, 5)">
                <path d="M12,2 L16,2 L10,15 L14,15 L6,28 L10,15 L6,15 L12,2 Z" fill="#fbbf24" opacity="0.3" />
              </g>
              <g transform="translate(28, 22)">
                <path d="M6,1 L9,1 L5,8 L7,8 L3,14 L5,8 L3,8 L6,1 Z" fill="#fbbf24" opacity="0.4" />
              </g>
              <g transform="translate(2, 25)">
                <path d="M4,1 L6,1 L3,6 L5,6 L1,10 L3,6 L2,6 L4,1 Z" fill="#fbbf24" opacity="0.25" />
              </g>

              {/* Quote bubble shapes */}
              <circle cx="35" cy="8" r="3" fill="none" stroke="#fbbf24" strokeWidth="0.5" opacity="0.3" />
              <circle cx="37" cy="6" r="1" fill="#fbbf24" opacity="0.2" />
              <circle cx="8" cy="35" r="2.5" fill="none" stroke="#fbbf24" strokeWidth="0.4" opacity="0.25" />
              <circle cx="10" cy="33" r="0.8" fill="#fbbf24" opacity="0.2" />

              {/* Electrical connection lines */}
              <path d="M15,15 Q20,20 25,25" stroke="#fbbf24" strokeWidth="0.3" opacity="0.2" fill="none" />
              <path d="M5,30 Q15,25 25,30" stroke="#fbbf24" strokeWidth="0.25" opacity="0.15" fill="none" />
              <path d="M30,5 Q35,10 30,15" stroke="#fbbf24" strokeWidth="0.2" opacity="0.1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lightning-reviews-pattern)" />
        </svg>
      </div>

      {/* Floating Quote Decorations */}
      <div className="absolute top-20 left-10 text-yellow-500 opacity-20 text-6xl font-serif">"</div>
      <div className="absolute bottom-20 right-10 text-yellow-500 opacity-20 text-6xl font-serif transform rotate-180">"</div>
      <div className="absolute top-1/3 right-20 text-yellow-400 opacity-15 text-4xl font-serif">"</div>
      <div className="absolute bottom-1/3 left-20 text-yellow-400 opacity-15 text-4xl font-serif transform rotate-180">"</div>

      {/* Gradient Orbs */}
      <div className="absolute top-32 -right-24 w-48 h-48 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full opacity-5 blur-2xl"></div>
      <div className="absolute bottom-32 -left-24 w-40 h-40 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full opacity-8 blur-xl"></div>

      {/* Lightning Bolt Accent Elements */}
      <div className="absolute top-16 right-1/4">
        <svg className="w-6 h-6 text-yellow-500 opacity-30" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 4L7 14h3v6l4-10h-3l4-6z" />
        </svg>
      </div>
      <div className="absolute bottom-16 left-1/4">
        <svg className="w-4 h-4 text-yellow-400 opacity-25" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 4L7 14h3v6l4-10h-3l4-6z" />
        </svg>
      </div>
      <div className="absolute top-1/4 left-1/3">
        <svg className="w-5 h-5 text-yellow-500 opacity-20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 4L7 14h3v6l4-10h-3l4-6z" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 right-1/3">
        <svg className="w-3 h-3 text-yellow-400 opacity-15" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11 4L7 14h3v6l4-10h-3l4-6z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="bg-yellow-500 text-black py-8 px-6 rounded-2xl mx-auto max-w-4xl shadow-lg">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl max-w-3xl mx-auto">
              Don&apos;t just take our word for it - see why Salem trusts ZipZap with their devices
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-6 w-6 fill-black text-black" />
                ))}
              </div>
              <span className="text-xl font-bold">
                {googleRating}/5 on Google
              </span>
              <a
                href={reviewStats.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                View All {totalGoogleReviews} Reviews
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>


        {/* Custom Reviews Grid */}
        {reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group hover:-translate-y-1"
            >
              {/* Quote Icon */}
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
                &quot;{review.text}&quot;
              </p>

              {/* Service Badge */}
              {review.service && (
                <div className="mb-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
                    {review.service}
                  </span>
                </div>
              )}

              {/* Verified Badge */}
              {review.verified && (
                <div className="mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                    ✓ Verified Google Review
                  </span>
                </div>
              )}

              {/* Reviewer Info */}
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-black">{review.name}</div>
                  <div className="text-gray-500 text-sm">{review.date}</div>
                </div>
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-lg">
                    {review.name.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4">Reviews Coming Soon</h3>
              <p className="text-gray-600 mb-6">
                We're working on displaying customer reviews. In the meantime, check out our Google Reviews below!
              </p>
              <a
                href="https://g.page/r/CeruriFcECIfEAE/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-colors"
              >
                <Star className="h-5 w-5 fill-black" />
                Read Our Google Reviews
              </a>
            </div>
          </div>
        )}

        {/* Google Reviews CTA */}
        <div className="text-center mt-12 mb-8">
          <a
            href="https://g.page/r/CeruriFcECIfEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-black border-2 border-yellow-500 px-6 py-3 rounded-xl font-semibold text-lg hover:bg-yellow-50 transition-colors shadow-lg"
          >
            <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
            Write a Review on Google
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-black text-white py-8 px-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Join Hundreds of Happy Customers
            </h3>
            <p className="text-gray-300 mb-6">
              Experience the same excellent service that earned us these amazing reviews
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:5034009920"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-colors shadow-lg"
              >
                Call (503) 400-9920
              </a>
              <a
                href="/#quote-form"
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