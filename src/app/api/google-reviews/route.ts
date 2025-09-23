import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY
    const placeId = process.env.GOOGLE_PLACE_ID || 'ChIJ--jQLVv_v1QR6u6uIVwQIh8'

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Places API key not configured' },
        { status: 500 }
      )
    }

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`

    const response = await fetch(url)
    const data = await response.json()

    if (data.status === 'OK' && data.result.reviews) {
      // Log debug info to see what Google is returning
      console.log('Total reviews from Google:', data.result.reviews.length)
      console.log('Review ratings:', data.result.reviews.map((r: any) => r.rating))

      // Filter for 5-star reviews only and return up to 6
      const fiveStarReviews = data.result.reviews
        .filter((review: any) => review.rating === 5)
        .slice(0, 6)
        .map((review: any) => ({
        author_name: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.time,
        relative_time_description: review.relative_time_description,
        profile_photo_url: review.profile_photo_url
      }))

      console.log('Filtered 5-star reviews:', fiveStarReviews.length)

      return NextResponse.json({
        success: true,
        reviews: fiveStarReviews,
        rating: data.result.rating,
        user_ratings_total: data.result.user_ratings_total
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to fetch reviews from Google Places API', details: data },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}