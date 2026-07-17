'use client';
import { useState } from 'react';
import { LuPencilLine } from 'react-icons/lu';

type DetailsCardProps = {
  title: string;
  date?: Date;
  subject: string;
  subtitle?: string;
  reflection?: string;
  status: string;
  editForm?: React.ReactNode;
};

export default function DetailsCard({
  title,
  date,
  subject,
  subtitle,
  reflection,
  status,
  editForm,
}: DetailsCardProps) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all hover:shadow-md'>
      {editForm && (
        <button onClick={() => setIsEdit(!isEdit)} className='mb-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-350 transition-colors'>
          <LuPencilLine />{' '}
        </button>
      )}
      <div className='flex items-start justify-between'>
        <div className='space-y-1.5'>
          {title && (
            <h3 className='text-sm font-medium text-zinc-500 dark:text-zinc-400'>
              {title}
            </h3>
          )}
          {date && (
            <p className='text-xs text-zinc-500 dark:text-zinc-400'>
              {date.toLocaleDateString()}
            </p>
          )}
          {subject && (
            <p className='text-xs text-zinc-500 dark:text-zinc-400'>
              {subject}
            </p>
          )}
          {subtitle && (
            <p className='text-xs text-zinc-500 dark:text-zinc-400'>
              {subtitle}
            </p>
          )}
          {reflection && (
            <p className='text-xs text-zinc-500 dark:text-zinc-400'>
              {reflection}
            </p>
          )}
          {status && (
            <p className='text-xs text-zinc-500 dark:text-zinc-400'>{status}</p>
          )}
        </div>
      </div>

      {isEdit && editForm && (
        <div className='mt-4 pt-4 border-t border-zinc-150 dark:border-zinc-800'>
          {editForm}
        </div>
      )}
    </div>
  );
}

