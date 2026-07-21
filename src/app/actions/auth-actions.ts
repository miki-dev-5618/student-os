'use server';

import { signIn } from '@/services/auth';
import { AuthError } from 'next-auth';

export async function loginUser(prevState: any, formData: FormData) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirectTo: '/dashboard',
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      console.error('Login failed:', error.type);
      return { error: 'Invalid email or password' };
    }
    // Re-throw redirect errors so Next.js handles them
    throw error;
  }
}
