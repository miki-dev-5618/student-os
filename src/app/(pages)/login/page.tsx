import { auth, signIn } from '@/services/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

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

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950 font-sans'>
      <div className='w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900'>
        <h2 className='text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-1'>Welcome back</h2>
        <p className='text-xs text-zinc-500 dark:text-zinc-400 mb-6'>Enter your details to access your account</p>

        <form action={loginUser} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-zinc-500 dark:text-zinc-400' htmlFor='email'>
              Email Address
            </label>
            <input
              id='email'
              name='email'
              type='email'
              required
              className='w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100 text-zinc-900 dark:text-zinc-50'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-zinc-500 dark:text-zinc-400' htmlFor='password'>
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              required
              className='w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100 text-zinc-900 dark:text-zinc-50'
            />
          </div>

          <button
            type='submit'
            className='mt-2 w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 active:scale-[0.98] transition-all dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200'
          >
            Sign In
          </button>
        </form>

        <p className='mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400'>
          Don't have an account?{' '}
          <a href='/signup' className='font-semibold text-zinc-950 hover:underline dark:text-white'>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
