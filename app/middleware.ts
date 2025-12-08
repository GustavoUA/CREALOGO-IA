import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const { data: { session } } = await supabase.auth.getSession();

  const protectedRoutes = ["/generator", "/dashboard"];

  const isProtected = protectedRoutes.some((p) =>
    req.nextUrl.pathname.startsWith(p)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}
