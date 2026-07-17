'use client';
import { useState } from 'react';
import { LuPencilLine } from 'react-icons/lu';

type DetailsCardProps = {
  title: string;
  editForm?: React.ReactNode;
  fields: Field[];
  //legacy props for backward compatibility
  date?: Date;
  subject?: string;
  subtitle?: string;
  reflection?: string;
  status?: string;
};

type Field = {
  label?: string;
  value: React.ReactNode;
};

export default function DetailsCard({
  fields,
  title,

  editForm,
}: DetailsCardProps) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all hover:shadow-md'>
      {editForm && (
        <button
          onClick={() => setIsEdit(!isEdit)}
          className='mb-2 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-350 transition-colors'
        >
          <LuPencilLine />{' '}
        </button>
      )}
      <div className='flex items-start justify-between'>
        <div className='space-y-1.5'>
          {fields &&
            fields.map((field, idx) => (
              <div
                key={idx}
                className='text-xs text-zinc-550 dark:text-zinc-400'
              >
                {field.label && (
                  <span className='font-semibold text-zinc-400 dark:text-zinc-550 mr-1'>
                    {field.label}:
                  </span>
                )}
                <span>{field.value}</span>
              </div>
            ))}
          {title && (
            <h3 className='text-sm font-medium text-zinc-500 dark:text-zinc-400'>
              {title}
            </h3>
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
