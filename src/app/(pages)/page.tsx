import Footer from '../components/footer';
import { GeistPixelSquare } from 'geist/font/pixel';
import { FaArrowRight } from 'react-icons/fa';
import { LuBookOpen, LuClipboardCheck, LuCalendar, LuTrendingUp, LuArrowRight } from 'react-icons/lu';
import { auth } from '@/services/auth';
import { redirect } from 'next/navigation';
import { getUserByEmail } from '@/services/user.service';
import { Sparkle, Star, Smiley, PaperAirplane, Arrow } from '../components/Doodle';

export default async function Home() {
  const session = await auth();
  const dbUser = session?.user?.email ? await getUserByEmail(session.user.email) : null;
  if (dbUser) {
    redirect('/dashboard');
  }

  return (
    <div className="flex flex-col min-h-screen bg-app grid-bg font-sans text-forest-green dark:text-cream transition-colors duration-300">
      <main className="flex-1 flex flex-col items-center w-full px-6 sm:px-8 md:px-16 py-16 sm:py-24 max-w-7xl mx-auto relative overflow-hidden">

        {/* Floating background doodle assets */}
        <div className="absolute top-12 left-10 text-sunshine/30 animate-bounce pointer-events-none hidden md:block">
          <Star size={48} />
        </div>
        <div className="absolute top-36 right-16 text-kiwi/30 animate-pulse pointer-events-none hidden md:block">
          <Sparkle size={36} />
        </div>
        <div className="absolute bottom-48 left-16 text-crisp-carrot/20 pointer-events-none hidden md:block">
          <PaperAirplane size={42} />
        </div>

        {/* Hero Section */}
        <div className="text-center flex flex-col items-center max-w-3xl mx-auto mb-16 relative">
          <div className="inline-flex items-center gap-1.5 bg-kiwi/10 text-kiwi border border-kiwi/20 px-4 py-1.5 rounded-full text-xs font-black mb-6 animate-pulse">
            <Sparkle size={12} />
            <span>THE STUDENT WORKSPACE</span>
          </div>

          <h1
            className="font-serif text-6xl sm:text-8xl font-black tracking-tight mb-6 text-auburn leading-none"
          >
            Student OS
          </h1>

          <p className="text-lg sm:text-xl text-zinc-650 dark:text-zinc-350 font-medium leading-relaxed mb-8 max-w-2xl">
            Streamline your academic life. Manage assignments, track tasks, and prepare for exams in one unified, playful workspace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto relative">
            {/* Draw a handdrawn decorative arrow pointing to get started button */}
            <div className="absolute -left-20 -top-8 text-kiwi hidden lg:block transform -rotate-12">
              <Arrow size={42} />
              <span className="text-[10px] font-black uppercase tracking-wider block mt-1 text-zinc-400">Join now</span>
            </div>

            <a
              href="/signup"
              className="group flex items-center justify-center gap-2 bg-kiwi hover:bg-kiwi/95 text-zinc-950 font-extrabold py-3.5 px-8 rounded-full shadow-lg shadow-kiwi/15 hover:shadow-kiwi/20 hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 w-full sm:w-auto border border-forest-green/10"
            >
              Get Started Free
              <LuArrowRight className="text-sm transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#features"
              className="flex items-center justify-center bg-white dark:bg-zinc-900 border-2 border-forest-green/10 dark:border-zinc-800 text-forest-green dark:text-cream hover:bg-cream/10 dark:hover:bg-zinc-800/80 font-bold py-3.5 px-8 rounded-full hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 w-full sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Dashboard Preview Image */}
        <div className="w-full relative mb-24 rounded-3xl border-2 border-forest-green/10 dark:border-kiwi/20 bg-white/50 dark:bg-zinc-900/50 p-3 shadow-soft overflow-hidden backdrop-blur-sm group hover:scale-[1.01] transition-transform">
          <img
            src="/dashboard.png"
            alt="Student OS Dashboard Preview"
            className="rounded-2xl w-full object-cover shadow-inner border-2 border-forest-green/5 dark:border-zinc-800"
          />
        </div>

        {/* Features Section */}
        <div id="features" className="w-full mb-28 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif text-auburn mb-4">
              Everything you need to excel
            </h2>
            <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Stay on top of your studies with tools designed to remove academic clutter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="flex flex-col p-6 rounded-3xl border-2 border-forest-green/10 dark:border-kiwi/15 bg-white dark:bg-zinc-900/60 hover-lift shadow-soft group">
              <div className="p-3 bg-kiwi/15 text-kiwi rounded-xl w-fit mb-4 border border-kiwi/25 group-hover:bg-kiwi group-hover:text-zinc-950 transition-colors">
                <LuBookOpen className="text-xl" />
              </div>
              <h3 className="text-lg font-black text-forest-green dark:text-cream mb-2">Subjects</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed font-semibold">
                Organize your studies by course, keeping related notes, assignments, and goals grouped logically.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col p-6 rounded-3xl border-2 border-forest-green/10 dark:border-kiwi/15 bg-white dark:bg-zinc-900/60 hover-lift shadow-soft group">
              <div className="p-3 bg-sunshine/15 text-sunshine rounded-xl w-fit mb-4 border border-sunshine/25 group-hover:bg-sunshine group-hover:text-zinc-950 transition-colors">
                <LuClipboardCheck className="text-xl" />
              </div>
              <h3 className="text-lg font-black text-forest-green dark:text-cream mb-2">Assignments</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed font-semibold">
                Monitor progress, prioritize deadlines, and check off completed coursework with ease.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col p-6 rounded-3xl border-2 border-forest-green/10 dark:border-kiwi/15 bg-white dark:bg-zinc-900/60 hover-lift shadow-soft group">
              <div className="p-3 bg-tomato-burst/15 text-tomato-burst rounded-xl w-fit mb-4 border border-tomato-burst/25 group-hover:bg-tomato-burst group-hover:text-white transition-colors">
                <LuCalendar className="text-xl" />
              </div>
              <h3 className="text-lg font-black text-forest-green dark:text-cream mb-2">Exam Planner</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed font-semibold">
                Plan study sessions, set reminders, and log syllabus milestones so you are fully prepared.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="flex flex-col p-6 rounded-3xl border-2 border-forest-green/10 dark:border-kiwi/15 bg-white dark:bg-zinc-900/60 hover-lift shadow-soft group">
              <div className="p-3 bg-crisp-carrot/15 text-crisp-carrot rounded-xl w-fit mb-4 border border-crisp-carrot/25 group-hover:bg-crisp-carrot group-hover:text-white transition-colors">
                <LuTrendingUp className="text-xl" />
              </div>
              <h3 className="text-lg font-black text-forest-green dark:text-cream mb-2">Analytics</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed font-semibold">
                Visualize your performance over time, study patterns, and see exactly where to focus next.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="w-full mb-16 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif text-auburn mb-4">
              How it works
            </h2>
            <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              Get started in minutes and optimize your learning path.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 bg-white dark:bg-zinc-900/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-3xl relative hover-lift">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-kiwi text-zinc-950 text-lg font-black mb-6 shadow-md border-2 border-forest-green/10">
                1
              </div>
              <h3 className="text-xl font-black text-forest-green dark:text-cream mb-3">Create Subjects</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed max-w-xs font-semibold">
                Set up folders and tags for all of your current courses to organize information instantly.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 bg-white dark:bg-zinc-900/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-3xl relative hover-lift">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-sunshine text-zinc-950 text-lg font-black mb-6 shadow-md border-2 border-forest-green/10">
                2
              </div>
              <h3 className="text-xl font-black text-forest-green dark:text-cream mb-3">Add Assignments</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed max-w-xs font-semibold">
                Input your assignment details, select deadlines, and attach tasks to stay organized.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left p-6 bg-white dark:bg-zinc-900/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-3xl relative hover-lift">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-crisp-carrot text-white text-lg font-black mb-6 shadow-md border-2 border-forest-green/10">
                3
              </div>
              <h3 className="text-xl font-black text-forest-green dark:text-cream mb-3">Never Miss Deadlines</h3>
              <p className="text-xs text-zinc-550 dark:text-zinc-450 leading-relaxed max-w-xs font-semibold">
                Get reminders, view dashboard calendars, and optimize schedules so you can study stress-free.
              </p>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}
