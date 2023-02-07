import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  // SECRET
  const secret_Key = process.env.SECRET_KEY;

  const session = await getToken({ req: req, secret: secret_Key });

  const role = req.cookies.get("role") ? req.cookies.get("role") : null;

  const {
    nextUrl: { pathname },
  } = req;

  if (!session && pathname.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/admin", req.url));
  } else if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //   if (!session) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }

  // Admin Role
  // Here Admin Account Can't Access Any Route not Inclueds dashboard like profile or  checkout
  if (session && role === "admin" && !pathname.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  // User Role
  if (session && role === "user" && pathname.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/checkout",
    "/api/user/getUser",
    "/api/user/setUser",
    "/api/user/changePassword",
    "/admin/dashboard",
  ],
};
