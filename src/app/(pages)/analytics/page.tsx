'use client';

import React from 'react';
import { LuTrendingUp, LuChartBar, LuCircleCheck, LuClock, LuGraduationCap } from 'react-icons/lu';
import { Sparkle, Star } from '@/app/components/Doodle';

export default function Page() {
  const subjectsData = [
    { name: 'Mathematics', hours: 14, tasks: 8, color: 'bg-kiwi' },
    { name: 'Physics', hours: 12, tasks: 5, color: 'bg-sunshine' },
    { name: 'Computer Science', hours: 18, tasks: 11, color: 'bg-crisp-carrot' },
    { name: 'English Literature', hours: 6, tasks: 3, color: 'bg-tomato-burst' },
  ];

  return (
    <div className="min-h-screen bg-app grid-bg py-10 px-6 sm:px-8 font-sans text-forest-green dark:text-cream">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-forest-green dark:text-cream">Analytics</h1>
            <p className="text-xs font-semibold text-zinc-550 dark:text-zinc-450 mt-1">
              Visualize your academic performance, weekly study trends, and task outputs.
            </p>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900/60 border-2 border-forest-green/10 dark:border-kiwi/15 rounded-3xl p-6 shadow-soft hover-lift flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Focus Hours</span>
              <h2 className="text-3xl font-black">50h</h2>
              <p className="text-[10px] font-bold text-kiwi">+8.2% from last week</p>
            </div>
            <div className="p-3.5 bg-kiwi/10 text-kiwi rounded-2xl border border-kiwi/20">
              <LuClock size={22} />
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900/60 border-2 border-forest-green/10 dark:border-kiwi/15 rounded-3xl p-6 shadow-soft hover-lift flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Tasks Cleared</span>
              <h2 className="text-3xl font-black">27</h2>
              <p className="text-[10px] font-bold text-sunshine">90% completion rate</p>
            </div>
            <div className="p-3.5 bg-sunshine/10 text-sunshine rounded-2xl border border-sunshine/20">
              <LuCircleCheck size={22} />
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900/60 border-2 border-forest-green/10 dark:border-kiwi/15 rounded-3xl p-6 shadow-soft hover-lift flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">Average Grade</span>
              <h2 className="text-3xl font-black">A-</h2>
              <p className="text-[10px] font-bold text-crisp-carrot">Top 5% of class</p>
            </div>
            <div className="p-3.5 bg-crisp-carrot/10 text-crisp-carrot rounded-2xl border border-crisp-carrot/20">
              <LuGraduationCap size={22} />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Custom SVG Study Hours Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900/60 border-2 border-forest-green/10 dark:border-kiwi/15 rounded-3xl p-6 shadow-soft flex flex-col justify-between min-h-[350px]">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-forest-green/60 dark:text-zinc-500 mb-6 flex items-center gap-2">
                <LuChartBar size={16} />
                <span>Weekly Study distribution (Hours)</span>
              </h3>
            </div>

            {/* Custom SVG bar chart */}
            <div className="flex-1 flex items-end justify-between px-6 pb-2 relative h-48 border-b-2 border-forest-green/5 dark:border-zinc-800">
              {/* Chart minimal background gridlines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-50">
                <span className="border-t border-dashed border-forest-green/5 dark:border-zinc-850 w-full h-0" />
                <span className="border-t border-dashed border-forest-green/5 dark:border-zinc-850 w-full h-0" />
                <span className="border-t border-dashed border-forest-green/5 dark:border-zinc-850 w-full h-0" />
              </div>

              {subjectsData.map((item, idx) => {
                const heightPercentage = (item.hours / 20) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center gap-2.5 w-16 group relative z-10">
                    <div
                      className={`w-full rounded-2xl transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100 ${item.color} shadow-sm border border-zinc-950/5`}
                      style={{ height: `${heightPercentage * 1.5}px`, transformOrigin: 'bottom', animation: 'growUp 0.8s forwards' }}
                    />
                    <span className="text-[10px] font-bold text-zinc-550 dark:text-zinc-450 truncate max-w-full block">
                      {item.name.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Task Completion gauge card */}
          <div className="bg-white dark:bg-zinc-900/60 border-2 border-forest-green/10 dark:border-kiwi/15 rounded-3xl p-6 shadow-soft hover-lift flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 text-sunshine animate-pulse">
              <Star size={16} />
            </div>

            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-forest-green/60 dark:text-zinc-500 mb-6 flex items-center gap-2">
                <LuTrendingUp size={16} />
                <span>Completion Velocity</span>
              </h3>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              {/* Circular Gauge */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" className="stroke-forest-green/5 dark:stroke-zinc-800 fill-none" strokeWidth="6" />
                  <circle cx="50" cy="50" r="40" className="fill-none stroke-kiwi stroke-dash-90" strokeWidth="6" strokeDasharray="251" strokeDashoffset="25" strokeLinecap="round" />
                </svg>
                <div className="text-center">
                  <span className="text-3xl font-black text-forest-green dark:text-cream">90%</span>
                  <p className="text-[9px] uppercase tracking-wider font-bold text-zinc-400 dark:text-zinc-500">rate</p>
                </div>
              </div>

              <p className="text-xs text-center font-semibold text-zinc-500 dark:text-zinc-400 max-w-[200px] leading-relaxed">
                Great job! You cleared 27 out of 30 assigned academic tasks this sprint.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}