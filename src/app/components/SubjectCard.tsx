import React from 'react';
import { LuFolder, LuCircleCheck, LuGraduationCap, LuClipboardCheck } from 'react-icons/lu';
import { Sparkle } from './Doodle';

type SubjectCardProps = {
  name: string;
  assignment: string | number;
  task: string | number;
  exam: string | number;
};

export default function SubjectCard({
  name,
  assignment,
  task,
  exam,
}: SubjectCardProps) {
  return (
    <div className="w-full text-left rounded-3xl border-2 border-auburn bg-white p-6 shadow-soft hover-lift relative overflow-hidden group">
      {/* Visual folder tab decoration */}
      <div className="absolute top-0 left-0 w-24 h-1.5 bg-gradient-to-r from-auburn to-sunset" />
      <div className="absolute -right-4 -bottom-4 text-auburn/5 group-hover:scale-125 transition-transform duration-350 pointer-events-none">
        <LuFolder size={110} />
      </div>

      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-nectar-pink/40 text-auburn rounded-xl border border-auburn/20 group-hover:bg-auburn group-hover:text-white transition-colors">
            <LuFolder size={20} />
          </div>
          <Sparkle size={14} className="text-auburn opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <h3 className="capitalize text-lg font-serif font-black tracking-tight text-auburn">
          {name}
        </h3>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t-2 border-auburn/10">
          <div className="flex flex-col items-center p-2 bg-nectar-cream/30 rounded-xl border-2 border-auburn/10">
            <LuCircleCheck size={14} className="text-auburn mb-1" />
            <span className="text-xs font-black text-auburn">{task}</span>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-auburn/60">Tasks</span>
          </div>

          <div className="flex flex-col items-center p-2 bg-nectar-cream/30 rounded-xl border-2 border-auburn/10">
            <LuGraduationCap size={14} className="text-burnt-sienna mb-1" />
            <span className="text-xs font-black text-auburn">{exam}</span>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-auburn/60">Exams</span>
          </div>

          <div className="flex flex-col items-center p-2 bg-nectar-cream/30 rounded-xl border-2 border-auburn/10">
            <LuClipboardCheck size={14} className="text-jasper mb-1" />
            <span className="text-xs font-black text-auburn">{assignment}</span>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-auburn/60">Assgs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
