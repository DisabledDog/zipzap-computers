import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import { supabaseAdmin } from '@/lib/supabase'
import { adminSessions, generateSessionToken } from '@/lib/auth'

// Rate limiting storage
const loginAttempts = new Map<string, { count: number, lastAttempt: number }>()
const MAX_ATTEMPTS = 5
const LOCKOUT_TIME = 15 * 60 * 1000 // 15 minutes

// CSRF token storage (use Redis/database in production)
const csrfTokens = new Map<string, { expires: number }>()
const CSRF_TOKEN_EXPIRY = 30 * 60 * 1000 // 30 minutes

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0] ||
         request.headers.get('x-real-ip') ||
         'unknown'
}

function isRateLimited(ip: string): boolean {
  const attempts = loginAttempts.get(ip)
  if (!attempts) return false

  if (Date.now() - attempts.lastAttempt > LOCKOUT_TIME) {
    loginAttempts.delete(ip)
    return false
  }

  return attempts.count >= MAX_ATTEMPTS
}

function recordFailedAttempt(ip: string): void {
  const attempts = loginAttempts.get(ip) || { count: 0, lastAttempt: 0 }
  attempts.count++
  attempts.lastAttempt = Date.now()
  loginAttempts.set(ip, attempts)
}

function clearFailedAttempts(ip: string): void {
  loginAttempts.delete(ip)
}

function generateCSRFToken(): string {
  return crypto.randomUUID()
}

function isValidCSRFToken(token: string): boolean {
  const tokenData = csrfTokens.get(token)
  if (!tokenData) return false

  if (Date.now() > tokenData.expires) {
    csrfTokens.delete(token)
    return false
  }

  return true
}

export async function POST(request: NextRequest) {
  try {
    const clientIP = getClientIP(request)
    const isDevelopment = process.env.NODE_ENV !== 'production'

    // Check rate limiting
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: 'Too many failed attempts. Please try again in 15 minutes.' },
        { status: 429 }
      )
    }

    const { password, csrfToken } = await request.json()

    // CSRF token validation (more lenient in development)
    if (!csrfToken) {
      recordFailedAttempt(clientIP)
      return NextResponse.json(
        { error: 'CSRF token required' },
        { status: 403 }
      )
    }

    // In development, accept any token to avoid issues with server restarts
    if (!isDevelopment && !isValidCSRFToken(csrfToken)) {
      recordFailedAttempt(clientIP)
      return NextResponse.json(
        { error: 'Invalid CSRF token' },
        { status: 403 }
      )
    }

    // Basic input validation
    if (!password || typeof password !== 'string' || password.length > 200) {
      recordFailedAttempt(clientIP)
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      )
    }

    // Verify admin credentials using secure database authentication
    console.log('Attempting to verify credentials for password length:', password?.length)
    const isValidCredentials = await verifyAdminCredentials(password)
    console.log('Credential verification result:', isValidCredentials)

    if (isValidCredentials) {
      // Clear failed attempts on successful login
      clearFailedAttempts(clientIP)

      // Consume CSRF token (delete it after successful use) - but not in development
      if (!isDevelopment) {
        csrfTokens.delete(csrfToken)
      }

      // Create secure session
      const sessionToken = generateSessionToken()
      const expirationTime = Date.now() + parseInt(process.env.ADMIN_SESSION_TIMEOUT || '3600000') // 1 hour default

      // Set secure httpOnly cookie
      const cookieStore = await cookies()
      cookieStore.set('zipzap_admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: parseInt(process.env.ADMIN_SESSION_TIMEOUT || '3600000') / 1000,
        path: '/'
      })

      // Store session in memory (in production, use Redis or database)
      adminSessions.setSession(sessionToken, expirationTime)

      return NextResponse.json({ success: true })
    } else {
      // Record failed attempt
      recordFailedAttempt(clientIP)

      // Add delay to prevent brute force attacks
      await new Promise(resolve => setTimeout(resolve, 2000))
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    const clientIP = getClientIP(request)
    recordFailedAttempt(clientIP)

    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('zipzap_admin_session')?.value

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const session = adminSessions.getSession(sessionToken)
    if (!session || session.expires < Date.now()) {
      // Clean up expired session
      adminSessions.deleteSession(sessionToken)
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({ authenticated: true })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json({ authenticated: false }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Generate new CSRF token
    const csrfToken = generateCSRFToken()
    const expires = Date.now() + CSRF_TOKEN_EXPIRY

    // Store CSRF token
    csrfTokens.set(csrfToken, { expires })

    // Clean up expired tokens
    for (const [token, data] of csrfTokens.entries()) {
      if (Date.now() > data.expires) {
        csrfTokens.delete(token)
      }
    }

    return NextResponse.json({ csrfToken })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('zipzap_admin_session')?.value

    if (sessionToken) {
      adminSessions.deleteSession(sessionToken)
    }

    // Clear cookie
    cookieStore.delete('zipzap_admin_session')

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}


// Enhanced admin authentication with database
async function verifyAdminCredentials(password: string): Promise<boolean> {
  try {
    // First try legacy environment variable (for backwards compatibility)
    const envPassword = process.env.ZIPZAP_ADMIN_PASSWORD
    console.log('Environment password exists:', !!envPassword)
    console.log('Password lengths - input:', password?.length, 'env:', envPassword?.length)
    if (envPassword && password === envPassword) {
      console.log('Admin authenticated with environment password')
      return true
    }
    console.log('Environment password authentication failed')

    // Only check database if service role key is configured
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!serviceKey || serviceKey === 'your-service-role-key-here') {
      console.log('Supabase service key not configured, skipping database check')
      return false
    }

    // Check database for hashed password
    const { data: adminUser, error } = await supabaseAdmin
      .from('admin_users')
      .select('password_hash')
      .eq('email', 'admin@zipzapcomputers.com')
      .single()

    if (error || !adminUser) {
      console.log('Admin user not found in database, checking environment password again')
      // Double-check environment password as fallback
      return envPassword && password === envPassword
    }

    // Verify password against hash
    const isValid = await bcrypt.compare(password, adminUser.password_hash)
    console.log('Database authentication result:', isValid)
    return isValid
  } catch (error) {
    console.error('Error verifying admin credentials:', error)
    // Fallback to environment password if database fails
    const envPassword = process.env.ZIPZAP_ADMIN_PASSWORD
    return envPassword && password === envPassword
  }
}

// Migrate legacy plaintext password to hashed database storage
async function migrateAdminToDatabase(password: string): Promise<void> {
  try {
    const hashedPassword = await bcrypt.hash(password, 12)

    const { error } = await supabaseAdmin
      .from('admin_users')
      .upsert({
        email: 'admin@zipzapcomputers.com',
        password_hash: hashedPassword
      })

    if (error) {
      console.error('Error migrating admin to database:', error)
    } else {
      console.log('Admin password migrated to database successfully')
    }
  } catch (error) {
    console.error('Error hashing password:', error)
  }
}