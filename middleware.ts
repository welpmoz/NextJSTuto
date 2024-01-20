import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// inicializamos la autenticacion
// con la configuracion y exportamos la
// propiedad auth
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  // especificamos las rutas
  // las rutas no se renderizan hasta que el middleware
  // verifique la autenticacion
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
