import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Lazy initialization to avoid build-time errors when env vars aren't set
let _supabase: SupabaseClient | null = null
let _supabaseAdmin: SupabaseClient | null = null

function getSupabaseClient(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      throw new Error('Supabase environment variables not configured')
    }
    _supabase = createClient(url, key)
  }
  return _supabase
}

function getSupabaseAdminClient(): SupabaseClient {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) {
      throw new Error('Supabase environment variables not configured')
    }
    _supabaseAdmin = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  }
  return _supabaseAdmin
}

// Client for browser usage (with RLS enabled)
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return Reflect.get(getSupabaseClient(), prop)
  }
})

// Admin client for server-side operations (bypasses RLS)
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return Reflect.get(getSupabaseAdminClient(), prop)
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