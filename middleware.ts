export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - auth (NextAuth.js routes)
         * - reset (NextAuth.js routes)
         * - prisma (Prisma routes)
         * - static (static files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|auth|reset|prisma|static|favicon.ico|auth|reset).*)',
    ],
}