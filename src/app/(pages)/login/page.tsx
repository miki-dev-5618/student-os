import { signIn } from '@/services/auth';
import { AuthError } from 'next-auth';
async function loginUser(formData: FormData) {
  "use server"
  try {
    // 1. Convert formData to a plain object so NextAuth reads the redirectTo option
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirectTo: '/dashboard',
    });
  } catch (error) {
    // 2. Catch the CallbackRouteError/AuthError so the app doesn't crash!
    if (error instanceof AuthError) {
      console.error('Login failed:', error.type);
      throw new Error('Invalid email or password');
    }
    // 3. You MUST re-throw the Next.js redirect error so the redirect happens
    throw error;
  }
}

export default function Page() {
  return (
    <form
      action={loginUser}
    >
      <label>
        Email
        <input name='email' type='email' />
      </label>
      <label>
        Password
        <input name='password' type='password' />
      </label>
      <button>Sign In</button>
    </form>
  );
}
