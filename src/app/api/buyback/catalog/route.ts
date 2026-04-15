import { NextRequest, NextResponse } from 'next/server'

const POS_URL = process.env.POS_URL || 'http://localhost:3002'

export async function GET() {
  try {
    const res = await fetch(`${POS_URL}/api/public/buyback/catalog`, { cache: 'no-store' })
    const data = await res.json().catch(() => ({}))
    return NextResponse.json(data, { status: res.status })
  } catch (err: any) {
    return NextResponse.json({ error: 'Could not reach POS' }, { status: 502 })
  }
}
