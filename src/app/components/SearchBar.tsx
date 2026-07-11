'use client';

import { useState } from 'react';

export default function SearchBar() {
  const [search, setSearch] = useState('');

  return (
    <div className='flex items-center w-full max-w-md mx-auto'>
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search...'
        className='w-full px-4 py-2 border rounded-l-lg'
      />
      <button className='px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700'>
        Search
      </button>
    </div>
  );
}
