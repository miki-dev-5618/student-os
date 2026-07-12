import { auth, signOut } from '@/services/auth';
import { getUserByEmail } from '@/services/user.service';
import Link from 'next/link';
import PathName from './PathName';

export default async function Navbar() {
  const session = await auth();
  const email = session?.user?.email;
  const user = email ? await getUserByEmail(email) : null;

  return (
    <header className='sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-900/80'>
      <div className='mx-auto flex max-w-6xl h-16 items-center justify-between px-6'>
        <div className='flex items-center gap-2.5'>
          {session ? (
            <PathName />
          ) : (
            <Link
              href='/'
              className='text-xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent dark:from-red-500 dark:to-orange-400 font-sans'
            >
              Student OS
            </Link>
          )}
        </div>

        <div className='flex items-center gap-4'>
          {session ? (
            <>
              <div className='hidden sm:flex flex-col text-right'>
                <span className='text-sm font-semibold text-zinc-800 dark:text-zinc-200'>
                  {session.user?.name || 'Student'}
                </span>
                <span className='text-xs text-zinc-500 dark:text-zinc-450'>
                  {session.user?.email}
                </span>
              </div>
              <div className='h-9 w-9 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-700 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700'>
                {(session.user?.name || session.user?.email || 'U')
                  .charAt(0)
                  .toUpperCase()}
              </div>
              <form
                action={async () => {
                  'use server';
                  await signOut({ redirectTo: '/login' });
                }}
              >
                <button
                  type='submit'
                  className='rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-[0.98] transition-all'
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <div className='flex items-center gap-4'>
              <Link
                href='/login'
                className='text-sm font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors'
              >
                Sign In
              </Link>
              <Link
                href='/signup'
                className='rounded-xl bg-red-500 hover:bg-red-600 dark:bg-red-650 dark:hover:bg-red-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98]'
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
