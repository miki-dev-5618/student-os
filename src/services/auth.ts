import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { saltAndHashPassword, verifyPassword } from '@/services/password';
import { getUserByEmail } from '@/services/user.service';
import { loginSchema } from './zod';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (
          typeof credentials?.email !== 'string' ||
          typeof credentials?.password !== 'string'
        ) {
          return null;
        }
        let user = null;

        const { email, password } = await loginSchema.parseAsync(credentials);

        user = await getUserByEmail(credentials.email);
        if (!user) {
          throw new Error('Invalid credentials');
        }
        const valid = await verifyPassword(password, user.password);
        if (!valid) {
          return null;
        }
        return user;
      },
    }),
  ],
});
