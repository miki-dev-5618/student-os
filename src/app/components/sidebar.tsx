'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LuLayoutDashboard,
  LuBookOpen,
  LuClipboardCheck,
  LuCircleCheck,
  LuGraduationCap,
  LuCalendarDays,
  LuTimer,
  LuSettings,
} from 'react-icons/lu';
import { Sparkle } from './Doodle';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LuLayoutDashboard,
    },
    {
      title: 'Subjects',
      url: '/subjects',
      icon: LuBookOpen,
    },
    {
      title: 'Assignments',
      url: '/assignments',
      icon: LuClipboardCheck,
    },
    {
      title: 'Tasks',
      url: '/tasks',
      icon: LuCircleCheck,
    },
    {
      title: 'Exams',
      url: '/exams',
      icon: LuGraduationCap,
    },
    {
      title: 'Calendar',
      url: '/calender',
      icon: LuCalendarDays,
    },
    {
      title: 'Study Room',
      url: '/study-sessions',
      icon: LuTimer,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: LuSettings,
    },
  ],
};

interface SidebarProps extends React.ComponentPropsWithoutRef<'aside'> { }

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(url + '/');
  };

  return (
    <aside
      className={`w-64 min-h-screen flex flex-col bg-nectar-cream border-r-2 border-auburn transition-all duration-300 font-sans ${className || ''}`}
      {...props}
    >
      {/* Sidebar Header */}
      <div className="flex flex-col items-start gap-4 px-6 py-8 border-b-2 border-auburn/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="/logo.jpeg"
              alt="Logo"
              className="h-12 w-12 rounded-2xl shadow-soft border-2 border-auburn object-cover"
            />
            <Sparkle
              size={14}
              className="absolute -top-1 -right-1 text-auburn animate-pulse"
            />
          </div>
          <div>
            <h1 className="font-serif text-xl sm:text-2xl font-black tracking-tight text-auburn leading-none">
              Student OS
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation Content */}
      <nav className="flex-1 py-6 px-4 space-y-2.5 overflow-y-auto">
        {data.navMain.map((item) => {
          const active = isActive(item.url);
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.url}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl transition-all duration-150 group text-sm font-bold hover:scale-[1.02] border-2 ${active
                  ? 'bg-nectar-pink border-auburn text-auburn shadow-soft'
                  : 'text-auburn/80 hover:text-auburn hover:bg-nectar-pink/40 border-transparent hover:border-auburn/15'
                }`}
            >
              <div
                className={`p-2 rounded-xl transition-colors duration-150 ${active
                    ? 'bg-auburn text-white'
                    : 'bg-nectar-pink/20 text-auburn group-hover:bg-nectar-pink/40'
                  }`}
              >
                <Icon className="w-4.5 h-4.5 transition-colors" />
              </div>
              <span className="tracking-wide">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-5 border-t border-auburn/10 text-[10px] text-center text-auburn/50 font-bold uppercase tracking-wider">
        Student OS © {new Date().getFullYear()}
      </div>
    </aside>
  );
}

export default Sidebar;
