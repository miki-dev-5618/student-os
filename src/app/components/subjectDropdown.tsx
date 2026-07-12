'use client';

import { useState } from 'react';

export default function SubjectDropdown({
  subjectsList,
}: {
  subjectsList: any[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any | null>(null);

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
        className="w-full px-4 py-2.5 text-left bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-neutral-50 transition-colors"
      >
        {selectedSubject ? selectedSubject.name : 'Select Subject'}
      </button>
      <input
        type="hidden"
        name="subjectId"
        value={selectedSubject ? selectedSubject.subjectId : ''}
      />
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {subjectsList.map((subject: any) => (
            <div
              key={subject.subjectId}
              onClick={() => handleSelect(subject)}
              className="cursor-pointer px-4 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              <p className="font-medium text-sm text-neutral-900 dark:text-neutral-50">{subject.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

