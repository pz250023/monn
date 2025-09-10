/* eslint-disable no-console */

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过不需要认证的路径
  if (shouldSkipAuth(pathname)) {
    return NextResponse.next();
  }

  // 移除所有认证检查，直接允许访问
  return NextResponse.next();
}



// 判断是否需要跳过认证的路径
function shouldSkipAuth(pathname: string): boolean {
  const skipPaths = [
    '/_next',
    '/favicon.ico',
    '/robots.txt',
    '/manifest.json',
    '/icons/',
    '/logo.png',
    '/screenshot.png',
  ];

  return skipPaths.some((path) => pathname.startsWith(path));
}

// 配置middleware匹配规则 - 简化匹配规则，移除认证相关路径
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/cron|api/server-config).*)',
  ],
};
