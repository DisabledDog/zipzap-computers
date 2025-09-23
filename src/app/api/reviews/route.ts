import { NextRequest, NextResponse } from 'next/server'
import { getReviews, addReview, updateReview, deleteReview } from '@/lib/database'
import { isAdminAuthenticated } from '@/lib/auth'

// GET - Fetch reviews (public endpoint)
export async function GET() {
  try {
    const reviews = await getReviews()

    return NextResponse.json({
      success: true,
      data: reviews,
      count: reviews.length
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST - Add review (admin only)
export async function POST(request: NextRequest) {
  try {
    const isAdmin = await isAdminAuthenticated()
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate required fields
    const requiredFields = ['name', 'rating', 'text', 'date']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const reviewData = {
      name: body.name,
      rating: parseInt(body.rating),
      text: body.text,
      service: body.service || null,
      date: body.date,
      verified: body.verified ?? false
    }

    const newReview = await addReview(reviewData)

    return NextResponse.json({
      success: true,
      data: newReview,
      message: 'Review added successfully'
    })
  } catch (error) {
    console.error('Error adding review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add review' },
      { status: 500 }
    )
  }
}

// PUT - Update review (admin only)
export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await isAdminAuthenticated()
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Review ID is required' },
        { status: 400 }
      )
    }

    const updatedReview = await updateReview(id, updates)

    return NextResponse.json({
      success: true,
      data: updatedReview,
      message: 'Review updated successfully'
    })
  } catch (error) {
    console.error('Error updating review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update review' },
      { status: 500 }
    )
  }
}

// DELETE - Delete review (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await isAdminAuthenticated()
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Review ID is required' },
        { status: 400 }
      )
    }

    await deleteReview(id)

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete review' },
      { status: 500 }
    )
  }
}