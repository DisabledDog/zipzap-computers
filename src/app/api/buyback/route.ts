import { NextRequest, NextResponse } from 'next/server'

// Proxy to the POS — the POS owns buyback pricing (uses Atlas/Mercury Price Checker).
// Set POS_URL in env (dev: http://localhost:3002, prod: your deployed POS URL).
const POS_URL = process.env.POS_URL || 'http://localhost:3002'

export async function GET(request: NextRequest) {
  try {
    const res = await fetch(`${POS_URL}/api/public/buyback`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch (err: any) {
    console.error('POS settings proxy error:', err)
    return NextResponse.json({ error: 'Could not reach POS' }, { status: 502 })
  }
}

export async function POST(request: NextRequest) {
  let body: any = {}
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  try {
    const res = await fetch(`${POS_URL}/api/public/buyback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    })
    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch (err: any) {
    console.error('POS buyback proxy error:', err)
    return NextResponse.json({ error: 'Could not reach POS — try again in a moment' }, { status: 502 })
  }
}
