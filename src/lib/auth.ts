import { cookies } from 'next/headers'

// Simple session storage (use Redis/database in production)
// Using a singleton pattern to ensure the same instance across imports
class AdminSessionManager {
  private static instance: AdminSessionManager
  private sessions = new Map<string, { expires: number }>()

  static getInstance(): AdminSessionManager {
    if (!AdminSessionManager.instance) {
      AdminSessionManager.instance = new AdminSessionManager()
    }
    return AdminSessionManager.instance
  }

  setSession(token: string, expires: number): void {
    this.sessions.set(token, { expires })
  }

  getSession(token: string): { expires: number } | undefined {
    return this.sessions.get(token)
  }

  deleteSession(token: string): void {
    this.sessions.delete(token)
  }

  cleanExpiredSessions(): void {
    const now = Date.now()
    for (const [token, session] of this.sessions.entries()) {
      if (session.expires < now) {
        this.sessions.delete(token)
      }
    }
  }
}

// Export singleton instance
export const adminSessions = AdminSessionManager.getInstance()

// Helper function to check admin authentication
export async function isAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('zipzap_admin_session')?.value

    if (!sessionToken) {
      return false
    }

    // Clean up expired sessions first
    adminSessions.cleanExpiredSessions()

    // Check if session exists and is not expired
    const session = adminSessions.getSession(sessionToken)
    if (!session || session.expires < Date.now()) {
      // Clean up expired session
      adminSessions.deleteSession(sessionToken)
      return false
    }

    return true
  } catch (error) {
    console.error('Authentication error:', error)
    return false
  }
}

export function generateSessionToken(): string {
  // Use crypto.randomUUID for cryptographically secure tokens
  return crypto.randomUUID() + '-' + crypto.randomUUID()
}