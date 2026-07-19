import { auth, signOut } from '@/services/auth';
import { getUserByEmail } from '@/services/user.service';
import Link from 'next/link';
import PathName from './PathName';

export default async function Navbar() {
  const session = await auth();
  const email = session?.user?.email;
  const user = email ? await getUserByEmail(email) : null;

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-auburn bg-nectar-pink text-auburn shadow-soft transition-all duration-300">
      <div className="mx-auto flex max-w-6xl h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          {session ? (
            <div className="bg-white/80 px-4 py-1.5 rounded-full border border-auburn/20 text-xs font-black shadow-sm text-auburn">
              <PathName />
            </div>
          ) : (
            <Link
              href="/"
              className="text-xl font-serif font-black tracking-tight text-auburn hover:scale-[1.01] transition-transform"
            >
              Student OS
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {session ? (
            <>
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-bold text-auburn">
                  {session.user?.name || 'Student'}
                </span>
                <span className="text-[10px] font-bold text-auburn/70 tracking-wider">
                  {session.user?.email}
                </span>
              </div>
              <div className="h-9 w-9 rounded-full bg-sunset text-zinc-950 flex items-center justify-center font-black text-sm border-2 border-auburn shadow-soft transform hover:rotate-12 transition-transform">
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
                  type="submit"
                  className="rounded-full bg-auburn hover:bg-auburn/95 px-4 py-1.5 text-xs font-bold text-white shadow-soft hover:scale-[1.03] active:scale-[0.97] transition-all border border-auburn/20 cursor-pointer"
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center gap-5">
              <Link
                href="/login"
                className="text-sm font-bold text-auburn hover:text-auburn/70 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-auburn hover:bg-auburn/95 hover:scale-[1.03] text-white px-5 py-2 text-sm font-bold shadow-soft active:scale-[0.97] transition-all border border-auburn/20"
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
