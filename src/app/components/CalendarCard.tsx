'use client';

import React from 'react';

export default function CalendarCard() {
  const today = new Date();
  const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
  
  // Get Monday of current week
  const monday = new Date(today);
  const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
  monday.setDate(diff);

  const days = Array.from({ length: 7 }).map((_, idx) => {
    const current = new Date(monday);
    current.setDate(monday.getDate() + idx);
    const isToday = current.toDateString() === today.toDateString();
    
    // Add decorative indicator dots for visual fidelity (mocking task/exam events)
    let dots: string[] = [];
    if (idx === 1) dots = ['bg-sunset'];
    if (idx === 3) dots = ['bg-auburn', 'bg-burnt-sienna'];
    if (idx === 4) dots = ['bg-jasper'];
    
    return {
      name: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx],
      date: current.getDate(),
      isToday,
      dots,
    };
  });

  return (
    <div className="w-full py-2 text-auburn">
      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-between p-2 rounded-xl transition-all ${
              day.isToday
                ? 'bg-sunset text-zinc-950 font-black shadow-soft scale-105 border-2 border-auburn'
                : 'hover:bg-nectar-pink/20'
            }`}
          >
            <span className={`text-[10px] uppercase font-extrabold tracking-wider ${day.isToday ? 'text-zinc-950' : 'text-auburn/50'}`}>
              {day.name}
            </span>
            <span className="text-sm font-black mt-1 block">
              {day.date}
            </span>
            
            {/* Visual indicator dots */}
            <div className="flex gap-0.5 justify-center mt-1.5 h-1">
              {day.dots.map((dot, dIdx) => (
                <span
                  key={dIdx}
                  className={`w-1 h-1 rounded-full ${dot}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
