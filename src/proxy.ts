import type { NextRequest} from "next/server";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  role: "ADMIN" | "USER";
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  const token = req.cookies.get("accessToken")?.value;
  const publicRoutes = [
    "/auth/login",
    "/auth/register",
    "/adminLogin",
    "/",
    "/search",
    "/cart",
    "/product"
  ];

  if (publicRoutes.some(route => pathname === route)) {
    const res = NextResponse.next();
    return res;
  }


  if (!token) {
    const res = NextResponse.redirect(new URL("/", req.url));
    return res;
  }

  let payload: JwtPayload;
  try {
    payload = jwtDecode<JwtPayload>(token);
  } catch {
    const res = NextResponse.redirect(new URL("/auth/login", req.url));
    return res;
  }


  if (pathname.startsWith("/adminLogin/") && pathname !== "/adminLogin") {
    if (payload.role !== "ADMIN") {
      const res = NextResponse.redirect(new URL("/", req.url));
      return res;
    }
  }

  const res = NextResponse.next();
  return res;
}
