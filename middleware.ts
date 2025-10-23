// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  const protectedPaths = [
    '/profile',
    '/feed',
    '/map',
    '/albums',
    '/insights',
    '/terms',
    '/privacy'
  ];
  const isProtected = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    // redirect to login page
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
