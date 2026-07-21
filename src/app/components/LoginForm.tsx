'use client';

import { useActionState } from 'react';
import { loginUser } from '@/app/actions/auth-actions';
import { LuMail, LuLock } from 'react-icons/lu';

export default function LoginForm() {
  const [state, action, isPending] = useActionState(loginUser, null);

  return (
    <form action={action} className="flex flex-col gap-4">
      {state?.error && (
        <div className="text-xs font-bold text-tomato-burst bg-tomato-burst/10 border border-tomato-burst/20 p-3 rounded-xl">
          {state.error}
        </div>
      )}

      <div className="flex flex-col gap-1.5 relative">
        <label
          className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500"
          htmlFor="email"
        >
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
        <label
          className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500"
          htmlFor="password"
        >
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
        disabled={isPending}
        className="mt-3 w-full rounded-full bg-kiwi py-3 text-sm font-extrabold text-zinc-950 hover:bg-kiwi/95 shadow-md shadow-kiwi/15 border-2 border-forest-green/10 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}
