import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { customer_name, customer_phone, customer_email, contact_preference, device_category, device_model, repairs, notes } = body

    // Validation
    if (!customer_name || customer_name.trim().length < 2) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    if (!customer_phone && !customer_email) {
      return NextResponse.json({ error: 'Phone or email is required' }, { status: 400 })
    }

    // Honeypot check
    if (body.website) {
      return NextResponse.json({ success: true, quote_id: 'ok' })
    }

    const shopUserId = process.env.SHOP_USER_ID
    if (!shopUserId) {
      console.error('SHOP_USER_ID not configured')
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const { data, error } = await supabaseAdmin
      .from('quotes')
      .insert({
        user_id: shopUserId,
        customer_name: customer_name.trim(),
        customer_phone: customer_phone?.trim() || null,
        customer_email: customer_email?.trim() || null,
        contact_preference: contact_preference || 'phone',
        device_category: device_category || null,
        device_model: device_model?.trim() || null,
        repairs: repairs || [],
        notes: notes?.trim() || null,
        source: 'website',
        status: 'new',
      })
      .select('id')
      .single()

    if (error) {
      console.error('Error creating quote:', error)
      return NextResponse.json({ error: 'Failed to submit quote' }, { status: 500 })
    }

    // Create notification for the shop owner
    await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: shopUserId,
        title: `New quote from ${customer_name.trim()}`,
        message: `${device_category || 'Device'}${device_model ? ` - ${device_model}` : ''}. ${repairs?.length || 0} repair(s) requested.`,
        type: 'info',
        read: false,
        link: '/quotes',
      })
      .then(() => {})
      .catch(() => {})

    return NextResponse.json({ success: true, quote_id: data.id })
  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
