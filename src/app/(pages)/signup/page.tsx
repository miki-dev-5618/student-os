import { createUser, getUserByEmail } from '@/services/user.service';
import { auth } from '@/services/auth';
import { redirect } from 'next/navigation';
import { Sparkle, Smiley } from '@/app/components/Doodle';
import { LuUser, LuMail, LuLock } from 'react-icons/lu';

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
          <h2 className="text-3xl font-extrabold tracking-tight text-forest-green dark:text-cream">Create Account</h2>
          <Smiley size={24} className="text-kiwi" />
        </div>
        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-6">Enter your details below to get started with Student OS.</p>

        <form action={createUser} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5 relative">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500" htmlFor="name">
              Full Name
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-zinc-450 dark:text-zinc-500">
                <LuUser size={16} />
              </span>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-forest-green/10 bg-zinc-50/50 dark:bg-zinc-950/40 text-sm font-semibold outline-none transition-all placeholder:text-zinc-400 focus:border-kiwi dark:border-zinc-800 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-zinc-50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 relative">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500" htmlFor="email">
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-zinc-450 dark:text-zinc-500">
                <LuMail size={16} />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-forest-green/10 bg-zinc-50/50 dark:bg-zinc-950/40 text-sm font-semibold outline-none transition-all placeholder:text-zinc-400 focus:border-kiwi dark:border-zinc-800 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-zinc-50"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 relative">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-zinc-450 dark:text-zinc-500">
                <LuLock size={16} />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-forest-green/10 bg-zinc-50/50 dark:bg-zinc-950/40 text-sm font-semibold outline-none transition-all placeholder:text-zinc-400 focus:border-kiwi dark:border-zinc-800 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-zinc-50"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-3 w-full rounded-full bg-kiwi py-3 text-sm font-extrabold text-zinc-950 hover:bg-kiwi/95 shadow-md shadow-kiwi/15 border-2 border-forest-green/10 hover:scale-[1.01] active:scale-[0.99] transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          Already have an account?{' '}
          <a href="/login" className="font-extrabold text-kiwi hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
