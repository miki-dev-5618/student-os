'use client';

import { useEffect, useState } from 'react';
import { LuSun, LuMoon } from 'react-icons/lu';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Determine the initial theme preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      setTheme('light');
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 border-2 border-forest-green/10 dark:border-kiwi/15 bg-white dark:bg-zinc-800 text-forest-green dark:text-cream rounded-full hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer flex items-center justify-center"
      aria-label="Toggle Dark Mode"
      title="Toggle Vibe Theme"
    >
      {theme === 'light' ? (
        <LuMoon className="w-[18px] h-[18px]" />
      ) : (
        <LuSun className="w-[18px] h-[18px] text-sunshine" />
      )}
    </button>
  );
}
