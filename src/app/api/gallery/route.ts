import { NextRequest, NextResponse } from 'next/server'
import { getGalleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem } from '@/lib/database'

// Simple auth check using environment password
function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return false

  const [type, credentials] = authHeader.split(' ')
  if (type !== 'Basic') return false

  const [username, password] = Buffer.from(credentials, 'base64').toString().split(':')
  const serverPassword = process.env.ZIPZAP_ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  return password === serverPassword
}

// GET - Fetch gallery items (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const galleryItems = await getGalleryItems()

    return NextResponse.json({
      success: true,
      data: galleryItems,
      count: galleryItems.length
    })
  } catch (error) {
    console.error('Error fetching gallery items:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery items' },
      { status: 500 }
    )
  }
}

// POST - Add gallery item (admin only)
export async function POST(request: NextRequest) {
  try {
    const isAdmin = isAuthorized(request)
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate required fields
    const requiredFields = ['title', 'before_image_url', 'after_image_url']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Transform data to match database schema
    const galleryData = {
      title: body.title,
      description: body.description || null,
      before_image_url: body.before_image_url,
      after_image_url: body.after_image_url,
      category: body.category || 'repair',
      device_type: body.device_type || null,
      repair_type: body.repair_type || null,
      is_featured: body.is_featured ?? false
    }

    const newItem = await addGalleryItem(galleryData)

    return NextResponse.json({
      success: true,
      data: newItem,
      message: 'Gallery item added successfully'
    })
  } catch (error) {
    console.error('Error adding gallery item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add gallery item' },
      { status: 500 }
    )
  }
}

// PUT - Update gallery item (admin only)
export async function PUT(request: NextRequest) {
  try {
    const isAdmin = isAuthorized(request)
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
        { success: false, error: 'Gallery item ID is required' },
        { status: 400 }
      )
    }

    // Transform field names to match database schema
    const dbUpdates: any = {}
    if (updates.title !== undefined) dbUpdates.title = updates.title
    if (updates.description !== undefined) dbUpdates.description = updates.description
    if (updates.before_image_url !== undefined) dbUpdates.before_image_url = updates.before_image_url
    if (updates.after_image_url !== undefined) dbUpdates.after_image_url = updates.after_image_url
    if (updates.category !== undefined) dbUpdates.category = updates.category
    if (updates.device_type !== undefined) dbUpdates.device_type = updates.device_type
    if (updates.repair_type !== undefined) dbUpdates.repair_type = updates.repair_type
    if (updates.is_featured !== undefined) dbUpdates.is_featured = updates.is_featured

    const updatedItem = await updateGalleryItem(id, dbUpdates)

    return NextResponse.json({
      success: true,
      data: updatedItem,
      message: 'Gallery item updated successfully'
    })
  } catch (error) {
    console.error('Error updating gallery item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update gallery item' },
      { status: 500 }
    )
  }
}

// DELETE - Delete gallery item (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = isAuthorized(request)
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
        { success: false, error: 'Gallery item ID is required' },
        { status: 400 }
      )
    }

    await deleteGalleryItem(id)

    return NextResponse.json({
      success: true,
      message: 'Gallery item deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting gallery item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete gallery item' },
      { status: 500 }
    )
  }
}