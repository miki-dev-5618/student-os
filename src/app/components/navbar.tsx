export function Navbar() {
  return (
    <nav className='flex w-full items-center py-3 border-b border-black/10'>
      <img src='/logo.jpeg' alt='Logo' className='h-15 w-auto pl-15'></img>
      <div className='ml-auto flex items-center gap-4 pr-15 text-sm font-medium'>
        <a href='/login' className='hover:underline underline-offset-4'>
          Login
        </a>
        <a
          href='/signup'
          className='rounded-md px-3 py-1.5 border border-black/20 hover:bg-black/5 transition-colors'
        >
          Signup
        </a>
      </div>
    </nav>
  );
}
