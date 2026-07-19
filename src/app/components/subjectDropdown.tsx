'use client';

import { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

export default function SubjectDropdown({
  subjectsList,
  defaultSubjectId,
}: {
  subjectsList: any[];
  defaultSubjectId?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any | null>(
    defaultSubjectId !== undefined
      ? subjectsList.find((s) => s.subjectId === defaultSubjectId) || null
      : null
  );

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (subject: any) => {
    setSelectedSubject(subject);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className="w-full flex items-center justify-between px-4 py-2.5 text-left bg-white dark:bg-zinc-800 border-2 border-forest-green/10 dark:border-zinc-700/60 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-kiwi focus:border-transparent text-zinc-900 dark:text-zinc-50 font-semibold text-sm transition-all"
      >
        <span>{selectedSubject ? selectedSubject.name : 'Select Subject'}</span>
        <LuChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <input
        type="hidden"
        name="subjectId"
        value={selectedSubject ? selectedSubject.subjectId : ''}
      />
      {isOpen && (
        <div className="absolute z-20 w-full mt-1.5 bg-white dark:bg-zinc-800 border-2 border-forest-green/10 dark:border-zinc-700 rounded-xl shadow-lg max-h-60 overflow-y-auto p-1.5 space-y-1">
          {subjectsList.map((subject: any) => (
            <div
              key={subject.subjectId}
              onClick={() => handleSelect(subject)}
              className="cursor-pointer px-3.5 py-2.5 hover:bg-kiwi/15 dark:hover:bg-kiwi/20 rounded-lg transition-colors font-bold text-xs text-zinc-800 dark:text-zinc-200"
            >
              <p className="font-semibold text-sm">{subject.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
