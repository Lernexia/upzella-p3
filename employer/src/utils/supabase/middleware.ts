import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: DO NOT REMOVE auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  
  // Public routes that don't require authentication
  const publicRoutes = [
    "/auth/login",
    "/auth/signup",
    "/legal/terms",
    "/legal/privacy",
  ];
  
  // If accessing a public route, allow access
  if (publicRoutes.some((route) => pathname.includes(route))) {
    if (user && pathname.includes("/auth")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return supabaseResponse;
  }
  
  // If no user, redirect to login
  if (!user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  
  // If user exists, check their completion status
  try {
    // Get employer data with company

    const { data: employer, error } = await supabase
      .from("employers")
      .select(`*`)
      .eq("id", user.id)
      .single();


    if (error || !employer) {
      // If employer not found, redirect to signup
      return NextResponse.redirect(new URL("/auth/signup", request.url));
    }

    // Check if user is verified
    if (!employer.is_verified) {
      // If not verified, only allow access to auth routes
      if (!pathname.startsWith("/auth/")) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }
      return supabaseResponse;
    }

    if (!employer.company_id) {
      // No company linked - redirect to company creation
      if (pathname !== "/onboarding/company-setup") {
        return NextResponse.redirect(
          new URL("/onboarding/company-setup", request.url)
        );
      }
    }

    return supabaseResponse;
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
