import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
// credentials podria ser otros
// como oath, email, etc
import credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { User } from "./app/lib/definitions";
import bcrypt from "bcrypt";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [credentials({
    async authorize(credentials) {
      const parsedCredentials = z
        .object({ email: z.string().email(), password: z.string().min(6)})
       .safeParse(credentials);

      if (parsedCredentials.success) {
        const { email, password } = parsedCredentials.data;
        const user = await getUser(email);
        if (!user) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);

        // retornar el usuario si coinciden contrase;as
        if (passwordMatch) return user;
      }

      console.log('Invalid credentials');
      return null;
    },
  })],
});

async function getUser(email:string) {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
