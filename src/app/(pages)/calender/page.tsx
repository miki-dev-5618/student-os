'use client';

import React, { useState } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { Sparkle } from '@/app/components/Doodle';

export default function Page() {
  const [currentMonth, setCurrentMonth] = useState('July 2026');

  // Hardcode days of July 2026 for visual representation
  // July 2026 starts on Wednesday, so 2 blank/empty spaces at the beginning (Mon, Tue)
  const emptyDays = 2; 
  const totalDays = 31;

  const days = Array.from({ length: totalDays }).map((_, idx) => {
    const dayNumber = idx + 1;
    
    // Add mock academic events
    let events: { title: string; type: 'exam' | 'assignment' | 'task'; color: string }[] = [];
    if (dayNumber === 8) {
      events.push({ title: 'Physics Assignment', type: 'assignment', color: 'bg-sunset text-zinc-950 border-auburn/20' });
    }
    if (dayNumber === 15) {
      events.push({ title: 'Math Midterm', type: 'exam', color: 'bg-auburn text-white border-auburn/30' });
    }
    if (dayNumber === 22) {
      events.push({ title: 'Submit Essay', type: 'task', color: 'bg-cambridge-blue text-white border-auburn/20' });
    }
    if (dayNumber === 27) {
      events.push({ title: 'Chemistry Lab', type: 'task', color: 'bg-burnt-sienna text-white border-auburn/20' });
    }

    return {
      dayNumber,
      events,
    };
  });

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="min-h-screen bg-app grid-bg py-10 px-6 sm:px-8 font-sans text-auburn">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-black tracking-tight text-auburn leading-none mt-1">Calendar</h1>
            <p className="text-xs font-bold text-auburn/70 mt-1.5">
              View your deadlines, exams, and study events in a monthly schedule.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-white border-2 border-auburn px-4 py-2 rounded-full shadow-soft">
            <button className="p-1 hover:bg-nectar-pink/25 rounded-full transition-colors cursor-pointer">
              <LuChevronLeft size={16} />
            </button>
            <span className="text-sm font-black px-2">{currentMonth}</span>
            <button className="p-1 hover:bg-nectar-pink/25 rounded-full transition-colors cursor-pointer">
              <LuChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Calendar Grid Container */}
        <div className="bg-white border-2 border-auburn rounded-3xl p-6 shadow-soft space-y-4">
          {/* Weekday columns */}
          <div className="grid grid-cols-7 gap-2 text-center border-b-2 border-auburn/10 pb-3">
            {weekDays.map((day) => (
              <span key={day} className="text-xs font-extrabold uppercase tracking-wider text-auburn/50">
                {day}
              </span>
            ))}
          </div>

          {/* Calendar days grid */}
          <div className="grid grid-cols-7 gap-3 min-h-[450px]">
            {/* Render blank spaces before start of month */}
            {Array.from({ length: emptyDays }).map((_, idx) => (
              <div key={`empty-${idx}`} className="bg-nectar-cream/10 rounded-2xl border-2 border-dashed border-auburn/10" />
            ))}

            {/* Render July days */}
            {days.map((day) => {
              const isToday = day.dayNumber === 18; // Mock current date (matching current date mockup)
              return (
                <div
                  key={day.dayNumber}
                  className={`p-3 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[90px] ${
                    isToday
                      ? 'border-auburn bg-sunset/35 shadow-soft'
                      : 'border-auburn/10 bg-nectar-cream/30 hover:border-auburn/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-black w-6 h-6 rounded-full flex items-center justify-center ${
                      isToday ? 'bg-auburn text-white' : 'text-auburn/60'
                    }`}>
                      {day.dayNumber}
                    </span>
                    {isToday && <Sparkle size={10} className="text-auburn" />}
                  </div>

                  <div className="space-y-1.5 mt-2">
                    {day.events.map((event, eIdx) => (
                      <div
                        key={eIdx}
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-lg truncate shadow-sm border border-auburn/15 ${event.color}`}
                        title={event.title}
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 items-center justify-center text-xs font-bold bg-white p-4 border-2 border-auburn rounded-2xl shadow-soft">
          <div className="flex items-center gap-1.5 text-auburn">
            <span className="w-2.5 h-2.5 rounded-full bg-auburn" />
            <span>Exams</span>
          </div>
          <div className="flex items-center gap-1.5 text-auburn">
            <span className="w-2.5 h-2.5 rounded-full bg-sunset" />
            <span>Assignments</span>
          </div>
          <div className="flex items-center gap-1.5 text-auburn">
            <span className="w-2.5 h-2.5 rounded-full bg-cambridge-blue" />
            <span>Tasks</span>
          </div>
        </div>

      </div>
    </div>
  );
}