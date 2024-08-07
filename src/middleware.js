export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/dashboard', '/counter', '/counter/:path*', '/profile/:path*'],
};
