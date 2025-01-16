import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  trustHost: true, // ADDED BY Suhas
  pages: {
    signIn: '/login',
    newUser: '/',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnChat = nextUrl.pathname.startsWith('/');
      const isOnRegister = nextUrl.pathname.startsWith('/register');
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      // Check for invertbio.com email domain
      const hasValidEmail = auth?.user?.email?.endsWith('@invertbio.com') ?? false;

      if (isLoggedIn && !hasValidEmail) {
        // Redirect non-invertbio users to login page
        return Response.redirect(new URL('/login', nextUrl as unknown as URL));
      }

      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/', nextUrl as unknown as URL));
      }

      if (isOnRegister || isOnLogin) {
        return true; // Always allow access to register and login pages
      }

      if (isOnChat) {
        if (isLoggedIn && hasValidEmail) return true;
        return false; // Redirect unauthenticated users to login page
      }

      if (isLoggedIn && hasValidEmail) {
        return Response.redirect(new URL('/', nextUrl as unknown as URL));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
