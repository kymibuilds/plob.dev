import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // Extract subdomain
  // Handles: nyahh.plob.dev, nyahh.localhost:3000
  const hostname = host.split(":")[0]; // Remove port
  const parts = hostname.split(".");

  // Check if it's a subdomain (not www, not the main domain)
  const isLocalhost = hostname.includes("localhost");
  const isSubdomain = isLocalhost
    ? parts.length > 1 && parts[0] !== "localhost"
    : parts.length > 2 && parts[0] !== "www";

  if (isSubdomain) {
    const subdomain = parts[0];
    
    // Skip API routes and static files
    if (url.pathname.startsWith("/api") || 
        url.pathname.startsWith("/_next") ||
        url.pathname.startsWith("/u/")) {
      return NextResponse.next();
    }
    
    // Rewrite to /u/[username] route
    url.pathname = `/u/${subdomain}${url.pathname === "/" ? "" : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
