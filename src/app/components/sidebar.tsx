'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GeistPixelSquare } from 'geist/font/pixel';
import {
    FaChartPie,
    FaBookOpen,
    FaClipboardCheck,
    FaTasks,
    FaGraduationCap,
    FaRegCalendarAlt,
    FaClock,
    FaCog
} from 'react-icons/fa';

const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: FaChartPie,
            color: 'text-red-500 dark:text-red-400',
            iconBg: 'bg-red-500/10 dark:bg-red-500/20',
        },
        {
            title: 'Subjects',
            url: '/subjects',
            icon: FaBookOpen,
            color: 'text-red-500 dark:text-red-400',
            iconBg: 'bg-red-500/10 dark:bg-red-500/20',
        },
        {
            title: 'Assignments',
            url: '/assignments',
            icon: FaClipboardCheck,
            color: 'text-red-500 dark:text-red-400',
            iconBg: 'bg-red-500/10 dark:bg-red-500/20',
        },
        {
            title: 'Tasks',
            url: '/tasks',
            icon: FaTasks,
            color: 'text-red-500 dark:text-red-400',
            iconBg: 'bg-red-500/10 dark:bg-red-500/20',
        },
        {
            title: 'Exams',
            url: '/exams',
            icon: FaGraduationCap,
            color: 'text-red-500 dark:text-red-400',
            iconBg: 'bg-red-500/10 dark:bg-red-500/20',
        },
        {
            title: 'Calendar',
            url: '/calender',
            icon: FaRegCalendarAlt,
            color: 'text-red-500 dark:text-red-400',
            iconBg: 'bg-red-500/10 dark:bg-red-500/20',
        },
        {
            title: 'Study Sessions',
            url: '/study-sessions',
            icon: FaClock,
            color: 'text-red-500 dark:text-red-400',
            iconBg: 'bg-red-500/10 dark:bg-red-500/20',
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: FaCog,
            color: 'text-red-500 dark:text-red-400',
            iconBg: 'bg-red-500/10 dark:bg-red-500/20',
        },
    ],
};

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className, ...props }: SidebarProps) {
    const pathname = usePathname();

    const isActive = (url: string) => {
        if (!url) return false;
        return pathname === url || pathname.startsWith(url + '/');
    };

    return (
        <aside
            className={`w-64 min-h-screen flex flex-col bg-white border-r border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 transition-colors duration-300 font-sans ${className || ''}`}
            {...props}
        >
            {/* Sidebar Header */}
            <div className='flex flex-col items-start gap-4 px-6 py-8 border-b border-zinc-100 dark:border-zinc-900'>
                <div className='flex items-center gap-3'>
                    <img src='/logo.jpeg' alt='Logo' className='h-12 w-auto rounded-md shadow-sm border border-zinc-100 dark:border-zinc-800' />
                    <h1
                        className={`${GeistPixelSquare.className} text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent dark:from-red-500 dark:to-orange-400`}
                    >
                        Student OS
                    </h1>
                </div>
            </div>

            {/* Navigation Content */}
            <nav className='flex-1 py-6 px-4 space-y-1.5 overflow-y-auto'>
                {data.navMain.map((item) => {
                    const active = isActive(item.url);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.title}
                            href={item.url}
                            className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium ${active
                                    ? 'bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-semibold'
                                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-zinc-50 dark:hover:bg-zinc-900/50'
                                }`}
                        >
                            <div
                                className={`p-2 rounded-lg transition-colors duration-200 ${active
                                        ? item.iconBg
                                        : 'bg-zinc-100 dark:bg-zinc-900 group-hover:bg-zinc-200/60 dark:group-hover:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400'
                                    }`}
                            >
                                <Icon className={`size-4.5 transition-colors ${active ? item.color : ''}`} />
                            </div>
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Sidebar Footer */}
            <div className='p-4 border-t border-zinc-100 dark:border-zinc-900 text-xs text-center text-zinc-400 dark:text-zinc-600'>
                Student OS © {new Date().getFullYear()}
            </div>
        </aside>
    );
}
