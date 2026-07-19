'use client';

import React, { useState, useEffect } from 'react';
import { LuPlay, LuPause, LuRotateCcw, LuFlame, LuCoffee } from 'react-icons/lu';
import { CoffeeCup, Sparkle } from '@/app/components/Doodle';

export default function Page() {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      // Toggle Pomodoro state
      if (!isBreak) {
        setIsBreak(true);
        setTime(5 * 60); // 5 min break
        setSessionCount((prev) => prev + 1);
        alert('Pomodoro session complete! Time for a short break.');
      } else {
        setIsBreak(false);
        setTime(25 * 60);
        alert('Break over! Time to focus.');
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, isBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const percentage = (time / (isBreak ? 5 * 60 : 25 * 60)) * 100;

  return (
    <div className="min-h-screen bg-app grid-bg py-10 px-6 sm:px-8 font-sans text-auburn">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-serif font-black tracking-tight text-auburn leading-none mt-1">Study Room</h1>
          <p className="text-xs font-bold text-auburn/70 mt-1.5">
            Boost focus and beat procrastination using the Pomodoro timer.
          </p>
        </div>

        {/* Timer Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Timer Display */}
          <div className="lg:col-span-2 bg-white border-2 border-auburn rounded-3xl p-8 shadow-soft flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute top-4 left-4 text-auburn animate-pulse">
              <Sparkle size={18} />
            </div>

            {/* Timer status badge */}
            <span className={`px-4 py-1 rounded-full text-xs font-bold border-2 mb-6 ${
              isBreak
                ? 'bg-sunset/15 text-zinc-950 border-auburn/20'
                : 'bg-nectar-pink/40 text-auburn border-auburn/30 animate-pulse'
            }`}>
              {isBreak ? '☕ BREAK TIME' : '🔥 FOCUS SESSION'}
            </span>

            {/* Big Ticking Circular timer visual */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-8 border-4 border-dashed border-auburn/10 rounded-full p-4">
              {/* Spinning progress gauge */}
              <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-auburn/10 fill-none"
                  strokeWidth="4"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className={`fill-none stroke-current transition-all duration-300 ${isBreak ? 'text-sunset' : 'text-auburn'}`}
                  strokeWidth="4"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * percentage) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-center relative z-10">
                <span className="text-5xl font-serif font-black tracking-tight text-auburn leading-none">
                  {formatTime(time)}
                </span>
                <p className="text-[10px] uppercase font-extrabold tracking-widest text-auburn/50 mt-2">
                  remaining
                </p>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex gap-4 items-center justify-center">
              <button
                onClick={toggleTimer}
                className="w-14 h-14 bg-auburn hover:bg-auburn/95 text-white rounded-full flex items-center justify-center shadow-soft hover:scale-105 active:scale-95 transition-all border border-auburn/20 cursor-pointer"
              >
                {isActive ? <LuPause size={20} /> : <LuPlay size={20} className="ml-1" />}
              </button>
              <button
                onClick={resetTimer}
                className="w-12 h-12 bg-white border-2 border-auburn hover:bg-nectar-pink/20 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all text-auburn cursor-pointer"
              >
                <LuRotateCcw size={16} />
              </button>
            </div>
          </div>

          {/* Stats & Tips sidebar */}
          <div className="space-y-8">
            {/* Session Stats card */}
            <section className="bg-white border-2 border-auburn rounded-3xl p-6 shadow-soft hover-lift flex flex-col justify-between h-fit">
              <h2 className="text-xl font-serif font-black tracking-tight mb-4 flex items-center gap-2.5 text-auburn">
                <span className="h-3 w-3 rounded-full bg-sunset border-2 border-white animate-pulse" />
                Session Stats
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2.5 border-b-2 border-auburn/10">
                  <span className="text-[10px] font-extrabold tracking-wider text-auburn/60">COMPLETED SESSIONS</span>
                  <span className="text-sm font-black text-auburn">{sessionCount}</span>
                </div>
                <div className="flex justify-between items-center py-2.5">
                  <span className="text-[10px] font-extrabold tracking-wider text-auburn/60">FOCUS TIME ACCRUED</span>
                  <span className="text-sm font-black text-auburn">{sessionCount * 25} mins</span>
                </div>
              </div>
            </section>

            {/* Coffee Cup / Advice card */}
            <section className="bg-white border-2 border-auburn rounded-3xl p-6 shadow-soft hover-lift relative overflow-hidden">
              <div className="absolute right-2 -bottom-2 text-auburn/10 pointer-events-none">
                <CoffeeCup size={80} />
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-nectar-pink/40 text-auburn rounded-xl border border-auburn/20">
                  <LuCoffee size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-black text-auburn">Study Tip</h3>
                  <p className="text-xs text-auburn/70 mt-1 leading-relaxed font-semibold">
                    Research shows that breaking study sessions into 25-minute intervals keeps your brain fresh and focused. Stretch or hydrate during break times!
                  </p>
                </div>
              </div>
            </section>
          </div>

        </div>
      </div>
    </div>
  );
}
