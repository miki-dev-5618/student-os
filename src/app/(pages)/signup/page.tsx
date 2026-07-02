import { createUser } from '@/services/user.service';

export default function Page() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950 font-sans'>
      <div className='w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900'>
        <h2 className='text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-1'>Create an account</h2>
        <p className='text-xs text-zinc-500 dark:text-zinc-400 mb-6'>Enter your details below to get started</p>

        <form action={createUser} className='flex flex-col gap-4'>
          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-zinc-500 dark:text-zinc-400' htmlFor='name'>
              Full Name
            </label>
            <input
              id='name'
              name='name'
              type='text'
              required
              placeholder='John Doe'
              className='w-full rounded-lg border border-zinc-200 bg-transparent px-3 py-2 text-sm outline-none transition-all placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-800 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100 text-zinc-900 dark:text-zinc-50'
            />
          </div>

          <div className='flex flex-col gap-1.5'>
            <label className='text-xs font-medium text-zinc-500 dark:text-zinc-400' htmlFor='email'>
              Email Address
            </label>
            <input
              id='email'
              name='email'
              type='email'
              required
              placeholder='name@example.com'
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
            Sign Up
          </button>
        </form>

        <p className='mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400'>
          Already have an account?{' '}
          <a href='/login' className='font-semibold text-zinc-950 hover:underline dark:text-white'>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
