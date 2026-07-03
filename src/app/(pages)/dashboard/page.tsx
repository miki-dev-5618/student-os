import { auth, signOut } from '@/services/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6'>
      <div className='w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 text-center'>
        <p className='text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-6'>
          Welcome to your Dashboard, {session.user?.name || session.user?.email || 'User'}!
        </p>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/login' });
          }}
        >
          <button
            type='submit'
            className='w-full rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-500 active:scale-[0.98] transition-all'
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
