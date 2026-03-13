import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const shopUserId = process.env.SHOP_USER_ID
    if (!shopUserId) {
      return NextResponse.json({ error: 'Not configured' }, { status: 500 })
    }

    const { data: devices, error } = await supabase
      .from('quote_devices')
      .select('id, name, sort_order, quote_repairs(id, name, description, price, sort_order), quote_models(id, name, sort_order)')
      .eq('user_id', shopUserId)
      .eq('active', true)
      .order('sort_order')

    if (error) {
      console.error('Error fetching quote services:', error)
      return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
    }

    const sorted = (devices || []).map((d: any) => ({
      category: d.name,
      models: (d.quote_models || [])
        .sort((a: any, b: any) => b.sort_order - a.sort_order)
        .filter((m: any) => !m.name.startsWith('Other'))
        .map((m: any) => m.name)
        .concat(
          (d.quote_models || []).filter((m: any) => m.name.startsWith('Other')).map((m: any) => m.name)
        ),
      services: (d.quote_repairs || [])
        .sort((a: any, b: any) => a.sort_order - b.sort_order)
        .map((r: any) => ({
          name: r.name,
          description: r.description || '',
          price: r.price || undefined,
        })),
    }))

    return NextResponse.json(sorted, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' },
    })
  } catch (error) {
    console.error('Quote services error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
