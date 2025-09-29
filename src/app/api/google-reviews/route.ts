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

    // Try multiple API calls with different parameters to get more reviews
    const urls = [
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`,
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&language=en&key=${apiKey}`,
      // Try with different review sorting
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&reviews_sort=newest&key=${apiKey}`
    ]

    let allReviews: any[] = []
    let rating = 4.9
    let totalReviews = 226

    for (const url of urls) {
      try {
        const response = await fetch(url)
        const data = await response.json()

        if (data.status === 'OK' && data.result?.reviews) {
          // Add unique reviews only
          const newReviews = data.result.reviews.filter((review: any) =>
            !allReviews.some(existing =>
              existing.author_name === review.author_name &&
              existing.text === review.text
            )
          )

          allReviews.push(...newReviews)

          if (data.result.rating) rating = data.result.rating
          if (data.result.user_ratings_total) totalReviews = data.result.user_ratings_total
        }
      } catch (error) {
        console.log('Failed API call:', url)
      }
    }

    // Filter for 5-star reviews and format - limit to exactly 6
    const fiveStarReviews = allReviews
      .filter(review => review.rating === 5)
      .sort((a, b) => b.time - a.time)
      .slice(0, 6)
      .map(review => ({
        author_name: review.author_name,
        rating: review.rating,
        text: review.text,
        time: review.time,
        relative_time_description: review.relative_time_description,
        profile_photo_url: review.profile_photo_url
      }))

    console.log('Total unique reviews found:', allReviews.length)
    console.log('5-star reviews:', fiveStarReviews.length)

    return NextResponse.json({
      success: true,
      reviews: fiveStarReviews,
      rating: rating,
      user_ratings_total: totalReviews
    })
  } catch (error) {
    console.error('Error fetching Google reviews:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}