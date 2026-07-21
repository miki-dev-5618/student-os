import { auth } from '@/services/auth';
import { redirect } from 'next/navigation';
import { Sparkle, Smiley } from '@/app/components/Doodle';
import { getUserByEmail } from '@/services/user.service';
import LoginForm from '@/app/components/LoginForm';

export default async function Page() {
  const session = await auth();
  const dbUser = session?.user?.email ? await getUserByEmail(session.user.email) : null;
  if (dbUser) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-app grid-bg px-4 font-sans text-forest-green dark:text-cream">
      <div className="w-full max-w-md rounded-3xl border-2 border-forest-green bg-white p-8 shadow-soft dark:border-kiwi dark:bg-zinc-900 relative overflow-hidden">
        {/* Decorative corner doodle */}
        <div className="absolute top-4 right-4 text-sunshine animate-pulse">
          <Sparkle size={20} />
        </div>

        <div className="flex items-center gap-2.5 mb-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-forest-green dark:text-cream">Welcome Back</h2>
          <Smiley size={24} className="text-kiwi" />
        </div>
        <div className="mb-6 rounded-2xl border border-kiwi/30 bg-kiwi/10 p-3.5 text-xs text-forest-green dark:text-cream">
          <p className="font-extrabold uppercase tracking-wider text-[10px] text-kiwi-700 dark:text-kiwi-300 mb-1">
            Demo Credentials
          </p>
          <div className="flex flex-col gap-0.5 font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
            <p><span className="font-semibold text-zinc-500 dark:text-zinc-400">Email:</span> test123@gmail.com</p>
            <p><span className="font-semibold text-zinc-500 dark:text-zinc-400">Password:</span> test@123</p>
          </div>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          Don't have an account?{' '}
          <a href="/signup" className="font-extrabold text-kiwi hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
