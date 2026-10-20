import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const ADMIN_SECRET = process.env.ADMIN_SECRET || "rooh_admin_secret_key_rv2026";
  const ADMIN_COOKIE_NAME = "rooh_admin_session";

  const sessionCookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const authHeader = request.headers.get("authorization");
  const customHeader = request.headers.get("x-admin-key");

  const isAuthed =
    sessionCookie === "authenticated_rooh_admin" ||
    sessionCookie === ADMIN_SECRET ||
    (authHeader && authHeader.replace(/^Bearer\s+/i, "").trim() === ADMIN_SECRET) ||
    customHeader === ADMIN_SECRET;

  // 1. Protect Admin UI pages (except /admin/login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!isAuthed) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Protect Admin APIs (/api/admin/*) except /api/admin/auth
  if (pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth")) {
    if (!isAuthed) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin authorization required" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
