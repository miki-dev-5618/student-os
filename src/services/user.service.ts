'use server';

import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { forbidden, redirect } from 'next/navigation';
import { saltAndHashPassword } from '@/services/password';
import { userSchema } from '@/services/zod'
import { AuthError } from 'next-auth';
import { signIn } from '@/services/auth';
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });



const CreateUser = userSchema.omit({ userId: true });

export async function createUser(formData: FormData) {
  const { name, email, password } = CreateUser.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  const passwordHash = await saltAndHashPassword(password);

  try {
    await sql`
    INSERT INTO "User"(name, email, password) VALUES (${name}, ${email}, ${passwordHash})`;
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  // Automatically sign in the user after registration
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error('Auto-login failed:', error.type);
      redirect('/login');
    }
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  const [user] = await sql`
    SELECT * FROM "User" WHERE email = ${email}
  `;
  return user;
}

