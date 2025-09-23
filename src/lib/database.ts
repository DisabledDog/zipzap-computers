import { supabase, supabaseAdmin, InventoryItem, Review, GalleryItem } from './supabase'

// Error handling utility
function handleSupabaseError(error: any, operation: string) {
  console.error(`Database error during ${operation}:`, error)
  throw new Error(`Failed to ${operation}: ${error.message}`)
}

// INVENTORY FUNCTIONS
export async function getInventory(): Promise<InventoryItem[]> {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .eq('is_available', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    handleSupabaseError(error, 'fetch inventory')
  }
}

export async function getAllInventory(): Promise<InventoryItem[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('inventory')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    handleSupabaseError(error, 'fetch all inventory')
  }
}

export async function addInventoryItem(item: Omit<InventoryItem, 'id' | 'created_at' | 'updated_at'>): Promise<InventoryItem> {
  try {
    const { data, error } = await supabaseAdmin
      .from('inventory')
      .insert([item])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    handleSupabaseError(error, 'add inventory item')
  }
}

export async function updateInventoryItem(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem> {
  try {
    const { data, error } = await supabaseAdmin
      .from('inventory')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    handleSupabaseError(error, 'update inventory item')
  }
}

export async function deleteInventoryItem(id: string): Promise<void> {
  try {
    const { error } = await supabaseAdmin
      .from('inventory')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    console.error('Error deleting inventory item:', error)
    handleSupabaseError(error, 'delete inventory item')
  }
}

// REVIEWS FUNCTIONS
export async function getReviews(): Promise<Review[]> {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    handleSupabaseError(error, 'fetch reviews')
  }
}

export async function addReview(review: Omit<Review, 'id' | 'created_at' | 'updated_at'>): Promise<Review> {
  try {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .insert([review])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    handleSupabaseError(error, 'add review')
  }
}

export async function updateReview(id: string, updates: Partial<Review>): Promise<Review> {
  try {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    handleSupabaseError(error, 'update review')
  }
}

export async function deleteReview(id: string): Promise<void> {
  try {
    const { error } = await supabaseAdmin
      .from('reviews')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    handleSupabaseError(error, 'delete review')
  }
}

// GALLERY FUNCTIONS
export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    handleSupabaseError(error, 'fetch gallery items')
  }
}

export async function addGalleryItem(item: Omit<GalleryItem, 'id' | 'created_at' | 'updated_at'>): Promise<GalleryItem> {
  try {
    const { data, error } = await supabaseAdmin
      .from('gallery')
      .insert([item])
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    handleSupabaseError(error, 'add gallery item')
  }
}

export async function updateGalleryItem(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem> {
  try {
    const { data, error } = await supabaseAdmin
      .from('gallery')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    handleSupabaseError(error, 'update gallery item')
  }
}

export async function deleteGalleryItem(id: string): Promise<void> {
  try {
    const { error } = await supabaseAdmin
      .from('gallery')
      .delete()
      .eq('id', id)

    if (error) throw error
  } catch (error) {
    handleSupabaseError(error, 'delete gallery item')
  }
}

// MIGRATION HELPERS
export async function migrateLocalStorageToDatabase() {
  try {
    // This function helps migrate existing localStorage data to database
    // Call it from admin panel after setting up Supabase

    console.log('Migration helper created. Call this from admin panel after Supabase setup.')
    return { success: true, message: 'Migration functions ready' }
  } catch (error) {
    console.error('Migration error:', error)
    throw error
  }
}

// IMAGE UPLOAD HELPER (for future use with Supabase Storage)
export async function uploadImage(file: File, bucket: string, path: string): Promise<string> {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return urlData.publicUrl
  } catch (error) {
    handleSupabaseError(error, 'upload image')
  }
}