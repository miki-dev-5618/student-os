'use client';
import { usePathname } from 'next/navigation';

export default function PathName() {
  const pathname = usePathname();
  const pageName = pathname === '/' ? 'home' : pathname.split('/').pop();

  console.log(pageName);

  return (
    <h1 className='capitalize text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50'>
      {pageName}
    </h1>
  );
}
