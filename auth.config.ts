import { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  pages: {
    // custom login page, en lugar
    // de defualt de la liberia
    signIn: '/login',
  },
  callbacks: {
    // verifica si la peticion esta autorizada via middleware
    authorized({ auth, request: { nextUrl }}) {
      // recibe la propiedad auth que contiene
      // la sesion de usuario
      // request la peticion entrante
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // rediccionar a login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // proveedores
} satisfies NextAuthConfig;