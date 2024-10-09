export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/counter', '/counter/:path*', '/profile/:path*'],
};
