import Image from 'next/image';
import { Footer } from '../components/footer';
import { GeistPixelSquare } from 'geist/font/pixel';
import { FaArrowRight, FaBookOpen, FaClipboardCheck, FaRegCalendarAlt, FaChartLine } from 'react-icons/fa';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300'>
      <main className='flex-1 flex flex-col items-center w-full px-4 sm:px-8 md:px-16 py-16 sm:py-24 max-w-7xl mx-auto'>

        {/* Hero Section */}
        <div className='text-center flex flex-col items-center max-w-3xl mx-auto mb-16'>


          <h1
            className={`${GeistPixelSquare.className} text-6xl sm:text-8xl font-black tracking-tight mb-6 bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent dark:from-red-500 dark:to-orange-400`}
          >
            Student OS
          </h1>

          <p className='text-xl sm:text-2xl text-zinc-600 dark:text-zinc-300 font-light leading-relaxed mb-8'>
            Streamline your academic life. Manage assignments, track tasks, and prepare for exams in one unified workspace.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto'>
            <a
              href='/signup'
              className='group flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 text-white font-semibold py-3.5 px-8 rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/30 transition-all duration-200 w-full sm:w-auto'
            >
              Get Started Free
              <FaArrowRight className='text-sm transition-transform group-hover:translate-x-1' />
            </a>
            <a
              href='#features'
              className='flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 font-semibold py-3.5 px-8 rounded-xl transition-all duration-200 w-full sm:w-auto'
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Dashboard Preview Image */}
        <div className='w-full relative mb-24 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 p-2 shadow-2xl overflow-hidden backdrop-blur-sm'>
          <img
            src='/dashboard.jpeg'
            alt='Student OS Dashboard Preview'
            className='rounded-xl w-full object-cover shadow-inner border border-zinc-100 dark:border-zinc-800'
          />
        </div>

        {/* Features Section */}
        <div id='features' className='w-full mb-28 scroll-mt-20'>
          <div className='text-center max-w-2xl mx-auto mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold tracking-tight mb-4'>
              Everything you need to excel
            </h2>
            <p className='text-zinc-500 dark:text-zinc-400'>
              Stay on top of your studies with tools designed to remove academic clutter.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {/* Feature 1 */}
            <div className='flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:scale-[1.02] transition-transform duration-200 shadow-sm'>
              <div className='p-3 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl w-fit mb-4'>
                <FaBookOpen className='text-xl' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>Subjects</h3>
              <p className='text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed'>
                Organize your studies by course, keeping related notes, assignments, and goals grouped logically.
              </p>
            </div>

            {/* Feature 2 */}
            <div className='flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:scale-[1.02] transition-transform duration-200 shadow-sm'>
              <div className='p-3 bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl w-fit mb-4'>
                <FaClipboardCheck className='text-xl' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>Assignment Tracking</h3>
              <p className='text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed'>
                Monitor progress, prioritize deadlines, and check off completed coursework with ease.
              </p>
            </div>

            {/* Feature 3 */}
            <div className='flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:scale-[1.02] transition-transform duration-200 shadow-sm'>
              <div className='p-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl w-fit mb-4'>
                <FaRegCalendarAlt className='text-xl' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>Exam Planner</h3>
              <p className='text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed'>
                Plan study sessions, set reminders, and log syllabus milestones so you are fully prepared.
              </p>
            </div>

            {/* Feature 4 */}
            <div className='flex flex-col p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:scale-[1.02] transition-transform duration-200 shadow-sm'>
              <div className='p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl w-fit mb-4'>
                <FaChartLine className='text-xl' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>Analytics</h3>
              <p className='text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed'>
                Visualize your performance over time, study patterns, and see exactly where to focus next.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div id='how-it-works' className='w-full mb-16 scroll-mt-20'>
          <div className='text-center max-w-2xl mx-auto mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold tracking-tight mb-4'>
              How it works
            </h2>
            <p className='text-zinc-500 dark:text-zinc-400'>
              Get started in minutes and optimize your learning path.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 relative'>
            {/* Step 1 */}
            <div className='flex flex-col items-center md:items-start text-center md:text-left relative p-4'>
              <div className='flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-lg font-bold text-red-500 mb-6'>
                1
              </div>
              <h3 className='text-xl font-bold mb-3'>Create Subjects</h3>
              <p className='text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs'>
                Set up folders and tags for all of your current courses to organize information instantly.
              </p>
            </div>

            {/* Step 2 */}
            <div className='flex flex-col items-center md:items-start text-center md:text-left relative p-4'>
              <div className='flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-lg font-bold text-red-500 mb-6'>
                2
              </div>
              <h3 className='text-xl font-bold mb-3'>Add Assignments</h3>
              <p className='text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs'>
                Input your assignment details, select deadlines, and attach tasks to stay organized.
              </p>
            </div>

            {/* Step 3 */}
            <div className='flex flex-col items-center md:items-start text-center md:text-left relative p-4'>
              <div className='flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-lg font-bold text-red-500 mb-6'>
                3
              </div>
              <h3 className='text-xl font-bold mb-3'>Never Miss Deadlines</h3>
              <p className='text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs'>
                Get reminders, view dashboard calendars, and optimize schedules so you can study stress-free.
              </p>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
