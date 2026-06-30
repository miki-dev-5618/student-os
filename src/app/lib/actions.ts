'use server';

import postgres from 'postgres';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { saltAndHashPassword } from '@/services/password';
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

const userSchema = z.object({
  userId: z.number().int(),
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

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
    INSERT INTO "Users"(name, email, passwordHash) VALUES (${name}, ${email}, ${passwordHash})`;
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, message: 'Error creating user' };
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}
