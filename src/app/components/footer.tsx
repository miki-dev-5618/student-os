import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Sparkle } from './Doodle';

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-auburn bg-nectar-pink text-auburn py-12 px-6 sm:px-16 mt-auto transition-all duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="flex flex-col gap-3 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="relative">
              <img src="/logo.jpeg" alt="Logo" className="h-8 w-auto rounded-lg object-cover border border-auburn/20" />
              <Sparkle size={10} className="absolute -top-1 -right-1 text-auburn" />
            </div>
            <span className="font-serif font-black text-lg text-auburn">Student OS</span>
          </div>
          <p className="text-xs text-auburn/70 max-w-xs leading-relaxed font-bold">
            The ultimate companion to streamline your assignments, track tasks, and prepare for exams. All in one place.
          </p>
        </div>

        {/* Links Column 1: Product */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-auburn/60">
            Product
          </h4>
          <ul className="flex flex-col gap-2 text-xs font-bold text-auburn/80">
            <li>
              <a href="/#features" className="hover:text-auburn hover:underline underline-offset-4 transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="/#how-it-works" className="hover:text-auburn hover:underline underline-offset-4 transition-colors">
                How It Works
              </a>
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-3">
          {/* Kept empty for spacing */}
        </div>

        {/* Links Column 3: Social & Connect */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-auburn/60">
            Connect
          </h4>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/miki-dev-5618"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:bg-auburn/20 transition-all p-2 rounded-full border border-transparent hover:border-auburn/30 text-auburn"
              aria-label="GitHub"
            >
              <FaGithub className="text-lg" />
            </a>
            <a
              href="https://www.linkedin.com/in/navyaa-taneja-41a023324/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white hover:bg-auburn/20 transition-all p-2 rounded-full border border-transparent hover:border-auburn/30 text-auburn"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-lg" />
            </a>
            <a
              href="mailto:navyaataneja5618@gmail.com"
              className="hover:text-white hover:bg-auburn/20 transition-all p-2 rounded-full border border-transparent hover:border-auburn/30 text-auburn"
              aria-label="Email"
            >
              <FaEnvelope className="text-lg" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t-2 border-auburn/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold text-auburn/60 uppercase tracking-wider">
        <p>&copy; {new Date().getFullYear()} Student OS. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
