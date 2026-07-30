// luminousheaven/src/middleware.js
import { NextResponse } from "next/server";

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  // Protect admin routes
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const sessionToken =
      request.cookies.get("better-auth.session_token")?.value ||
      request.cookies.get("__Secure-better-auth.session_token")?.value;

    if (!sessionToken) {
      const url = new URL("/admin/login", request.url);
      url.searchParams.set("from", path);
      return NextResponse.redirect(url);
    }
  }

  // Protect user dashboard routes
  if (path.startsWith("/dashboard")) {
    const sessionToken =
      request.cookies.get("better-auth.session_token")?.value ||
      request.cookies.get("__Secure-better-auth.session_token")?.value;

    if (!sessionToken) {
      const url = new URL("/login", request.url);
      url.searchParams.set("from", path);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
