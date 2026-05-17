import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STUDENT_ROUTES = ["/dashboard", "/notes", "/tests"];
const ADMIN_ROUTES   = ["/admin"];
const AUTH_ROUTES    = ["/login", "/register", "/forgot-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  // Redirect authenticated users away from auth pages
  if (AUTH_ROUTES.some((r) => pathname.startsWith(r)) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protect student-only routes
  if (STUDENT_ROUTES.some((r) => pathname.startsWith(r)) && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Protect admin routes
  if (ADMIN_ROUTES.some((r) => pathname.startsWith(r)) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
