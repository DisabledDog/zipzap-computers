import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for browser usage (with RLS enabled)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types for TypeScript
export interface InventoryItem {
  id: string
  title: string
  description: string
  price: number
  category: string
  condition: 'New' | 'Used' | 'Refurbished'
  is_available: boolean
  brand: string
  model?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  name: string
  rating: number
  text: string
  service?: string
  date: string
  verified: boolean
  created_at: string
  updated_at: string
}

export interface GalleryItem {
  id: string
  title: string
  description?: string
  before_image_url: string
  after_image_url: string
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
  password_hash: string
  created_at: string
  updated_at: string
}