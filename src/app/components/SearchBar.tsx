'use client';

import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';

export default function SearchBar() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex items-center w-full max-w-md relative">
      <div className="absolute left-4 text-zinc-400 pointer-events-none">
        <LuSearch size={16} />
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search subjects, tasks, assignments..."
        className="w-full pl-11 pr-24 py-2.5 bg-white dark:bg-zinc-850 border-2 border-forest-green/10 dark:border-zinc-750/80 rounded-full text-xs font-semibold outline-none transition-all placeholder:text-zinc-400 focus:border-kiwi dark:focus:border-kiwi text-zinc-900 dark:text-zinc-50 shadow-soft"
      />
      <button className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-kiwi hover:bg-kiwi/95 hover:scale-[1.02] active:scale-[0.98] text-zinc-950 rounded-full font-extrabold text-xs transition-all border border-forest-green/10">
        Search
      </button>
    </div>
  );
}
