import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const url = request.nextUrl;
  const path = url.pathname;
  const isAdminPath = path.startsWith("/admin");
  const authRoutes = ["/auth/sign_in", "/auth/sign_up", "/auth/forgot_password"];
  const isResetPassword = path === "/auth/reset_password";
  const hasResetKey = url.searchParams.has("key");

  if (isAdminPath && !token) {
    return NextResponse.redirect(new URL("/auth/sign_in", request.url));
  }

  if ((authRoutes.includes(path) || isResetPassword) && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isResetPassword && !hasResetKey) {
    return NextResponse.redirect(new URL("/auth/sign_in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/auth/:path*"],
};
