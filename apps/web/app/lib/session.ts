/**
 * Session management utilities for handling session IDs across requests
 */

export function getSessionId(request: Request): string {
  // Try to get session ID from X-Session-ID header first (for direct API calls)
  const headerSessionId = request.headers.get("X-Session-ID");
  if (headerSessionId) {
    return headerSessionId;
  }

  // Try to get session ID from cookies
  const cookieHeader = request.headers.get("Cookie");
  const sessionId = cookieHeader
    ?.split(";")
    .find(cookie => cookie.trim().startsWith("session-id="))
    ?.split("=")[1];

  // If no session ID exists, generate a new one
  if (!sessionId) {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }

  return sessionId;
}

export function setSessionIdCookie(sessionId: string): string {
  // Set session ID cookie that expires in 30 days
  return `session-id=${sessionId}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Lax`;
}