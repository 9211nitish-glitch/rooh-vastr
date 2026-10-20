import { NextRequest } from "next/server";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "rooh_admin_secret_key_rv2026";
const ADMIN_COOKIE_NAME = "rooh_admin_session";

/**
 * Validates whether an incoming request has verified Admin privileges.
 * Supports:
 * 1. Admin Session Cookie (`rooh_admin_session`)
 * 2. Header `x-admin-key` matching ADMIN_SECRET
 * 3. Header `authorization: Bearer <ADMIN_SECRET>`
 */
export function isAuthorizedAdmin(req: Request | NextRequest): boolean {
  // 1. Check HTTP Header x-admin-key or authorization
  const authHeader = req.headers.get("authorization");
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (token === ADMIN_SECRET) return true;
  }

  const customKey = req.headers.get("x-admin-key");
  if (customKey && customKey.trim() === ADMIN_SECRET) {
    return true;
  }

  // 2. Check Cookie
  const cookieHeader = req.headers.get("cookie") || "";
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE_NAME}=([^;]*)`));
  if (match && match[1]) {
    const cookieVal = decodeURIComponent(match[1]);
    if (cookieVal === ADMIN_SECRET || cookieVal === "authenticated_rooh_admin") {
      return true;
    }
  }

  return false;
}

export { ADMIN_COOKIE_NAME, ADMIN_SECRET };
