import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className='w-full border-t border-black/10 bg-zinc-50 dark:border-white/10 dark:bg-zinc-950 py-12 px-6 sm:px-16 mt-auto transition-colors duration-300'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
        {/* Brand Column */}
        <div className='flex flex-col gap-3 md:col-span-1'>
          <div className='flex items-center gap-2'>
            <img src='/logo.jpeg' alt='Logo' className='h-8 w-auto rounded-md' />
            <span className='font-bold text-lg text-zinc-900 dark:text-zinc-50'>Student OS</span>
          </div>
          <p className='text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed'>
            The ultimate companion to streamline your assignments, track tasks, and prepare for exams. All in one place.
          </p>
        </div>

        {/* Links Column 1: Product */}
        <div className='flex flex-col gap-3'>
          <h4 className='text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500'>
            Product
          </h4>
          <ul className='flex flex-col gap-2 text-sm text-zinc-600 dark:text-zinc-300'>
            <li>
              <a href='#features' className='hover:text-zinc-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors'>
                Features
              </a>
            </li>
            <li>
              <a href='#how-it-works' className='hover:text-zinc-900 dark:hover:text-white hover:underline underline-offset-4 transition-colors'>
                How It Works
              </a>
            </li>

          </ul>
        </div>

        {/* Links Column 2: Resources */}
        <div className='flex flex-col gap-3'>
          
        </div>

        {/* Links Column 3: Social & Connect */}
        <div className='flex flex-col gap-3'>
          <h4 className='text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500'>
            Connect
          </h4>
          <div className='flex items-center gap-4 text-zinc-600 dark:text-zinc-300'>
            <a
              href='https://github.com/miki-dev-5618'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-zinc-900 dark:hover:text-white transition-colors p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5'
              aria-label='GitHub'
            >
              <FaGithub className='text-xl' />
            </a>
            <a
              href='https://www.linkedin.com/in/navyaa-taneja-41a023324/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-zinc-900 dark:hover:text-white transition-colors p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5'
              aria-label='LinkedIn'
            >
              <FaLinkedin className='text-xl' />
            </a>
            <a
              href='mailto:navyaataneja5618@gmail.com'
              className='hover:text-zinc-900 dark:hover:text-white transition-colors p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5'
              aria-label='Email'
            >
              <FaEnvelope className='text-xl' />
            </a>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto mt-12 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400'>
        <p>&copy; {new Date().getFullYear()} Student OS. All rights reserved.</p>
        <div className='flex gap-6'>
          <a href='/privacy' className='hover:underline'>Privacy Policy</a>
          <a href='/terms' className='hover:underline'>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
