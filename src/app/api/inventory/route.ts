import { NextRequest, NextResponse } from 'next/server'
import { getInventory, getAllInventory, addInventoryItem, updateInventoryItem, deleteInventoryItem } from '@/lib/database'

// Simple auth check using environment password
function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  if (!authHeader) return false

  const [type, credentials] = authHeader.split(' ')
  if (type !== 'Basic') return false

  const [username, password] = Buffer.from(credentials, 'base64').toString().split(':')
  const serverPassword = process.env.ZIPZAP_ADMIN_PASSWORD
  return password === serverPassword
}

// GET - Fetch inventory (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeOutOfStock = searchParams.get('include_out_of_stock') === 'true'

    const inventory = includeOutOfStock ? await getAllInventory() : await getInventory()

    return NextResponse.json({
      success: true,
      data: inventory,
      count: inventory.length
    })
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inventory' },
      { status: 500 }
    )
  }
}

// POST - Add inventory item (admin only)
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
    const requiredFields = ['title', 'description', 'price', 'category', 'condition', 'brand']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Transform data to match database schema
    const inventoryData = {
      title: body.title,
      description: body.description,
      price: parseFloat(body.price),
      category: body.category,
      condition: body.condition,
      is_available: body.is_available ?? true,
      image_url: body.image_url || null,
      brand: body.brand,
      model: body.model || null
    }

    const newItem = await addInventoryItem(inventoryData)

    return NextResponse.json({
      success: true,
      data: newItem,
      message: 'Inventory item added successfully'
    })
  } catch (error) {
    console.error('Error adding inventory item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to add inventory item' },
      { status: 500 }
    )
  }
}

// PUT - Update inventory item (admin only)
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
        { success: false, error: 'Item ID is required' },
        { status: 400 }
      )
    }

    // Transform field names to match database schema
    const dbUpdates: any = {}
    if (updates.title !== undefined) dbUpdates.title = updates.title
    if (updates.description !== undefined) dbUpdates.description = updates.description
    if (updates.price !== undefined) dbUpdates.price = updates.price
    if (updates.category !== undefined) dbUpdates.category = updates.category
    if (updates.condition !== undefined) dbUpdates.condition = updates.condition
    if (updates.brand !== undefined) dbUpdates.brand = updates.brand
    if (updates.model !== undefined) dbUpdates.model = updates.model
    if (updates.is_available !== undefined) dbUpdates.is_available = updates.is_available
    if (updates.image_url !== undefined) dbUpdates.image_url = updates.image_url

    const updatedItem = await updateInventoryItem(id, dbUpdates)

    return NextResponse.json({
      success: true,
      data: updatedItem,
      message: 'Inventory item updated successfully'
    })
  } catch (error) {
    console.error('Error updating inventory item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update inventory item' },
      { status: 500 }
    )
  }
}

// DELETE - Delete inventory item (admin only)
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
        { success: false, error: 'Item ID is required' },
        { status: 400 }
      )
    }

    await deleteInventoryItem(id)

    return NextResponse.json({
      success: true,
      message: 'Inventory item deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting inventory item:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete inventory item' },
      { status: 500 }
    )
  }
}