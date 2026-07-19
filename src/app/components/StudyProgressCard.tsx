import React from 'react';
import { LuTimer, LuTrophy } from 'react-icons/lu';
import { Sparkle } from './Doodle';

export default function StudyProgressCard() {
  const currentHours = 12;
  const targetHours = 20;
  const percentage = (currentHours / targetHours) * 100;

  return (
    <div className="w-full space-y-4 text-auburn">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <LuTimer className="text-auburn animate-pulse" size={18} />
          <span className="text-[10px] font-black uppercase tracking-wider text-auburn/60">
            Weekly Goal
          </span>
        </div>
        <div className="flex items-center gap-1 bg-sunset px-2.5 py-0.5 rounded-full border border-auburn/20">
          <LuTrophy className="text-zinc-950" size={12} />
          <span className="text-[10px] font-extrabold text-zinc-950">60% Done</span>
        </div>
      </div>

      <div className="flex items-baseline gap-2 relative">
        <h2 className="text-4xl font-serif font-black text-auburn leading-none mt-1">
          {currentHours}
        </h2>
        <span className="text-sm font-bold text-auburn/50">
          / {targetHours} hours
        </span>
        <Sparkle size={14} className="text-auburn absolute top-1 right-2" />
      </div>

      <div className="space-y-2">
        <div className="w-full bg-nectar-pink/20 h-4 rounded-full overflow-hidden border-2 border-auburn p-0.5 shadow-sm">
          <div
            className="bg-gradient-to-r from-sunset via-burnt-sienna to-auburn h-full rounded-full transition-all duration-550 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[9px] text-auburn/60 font-bold uppercase tracking-wider">
          <span>0h</span>
          <span>Halfway (10h)</span>
          <span>Goal (20h)</span>
        </div>
      </div>
    </div>
  );
}
