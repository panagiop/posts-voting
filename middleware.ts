export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/', '/api/posts/:path*', '/posts']
};
