import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("access");
  const pathname = req.nextUrl.pathname;
  if (token && pathname.startsWith("/auth")) {
    const targetUrl = req.nextUrl.clone();
    targetUrl.pathname = "/todos";
    return NextResponse.redirect(targetUrl);
  }

  if (
    !token &&
    (pathname.startsWith("/todos") || pathname.startsWith("/profile"))
  ) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/auth/login";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/todos/:path*", "/profile", "/auth/:path*"],
};
