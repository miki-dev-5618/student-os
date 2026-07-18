'use client';
import { useState } from 'react';
import { LuPencilLine, LuTrash2 } from 'react-icons/lu';

type DetailsCardProps = {
  title: string;
  editForm?: React.ReactNode;
  deleteAction?: (formData: FormData) => void | Promise<void>;
  fields?: Field[];
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
  deleteAction,
}: DetailsCardProps) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className='rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all hover:shadow-md'>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex items-center gap-2'>
          {editForm && (
            <button
              onClick={() => setIsEdit(!isEdit)}
              className='p-1.5 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-350 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors'
            >
              <LuPencilLine className='w-4 h-4' />
            </button>
          )}
          {deleteAction && (
            <form action={deleteAction} className='inline'>
              <button
                type='submit'
                className='p-1.5 text-rose-500 hover:text-rose-700 dark:hover:text-rose-450 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors'
                onClick={(e) => {
                  if (!confirm('Are you sure you want to delete this?')) {
                    e.preventDefault();
                  }
                }}
              >
                <LuTrash2 className='w-4 h-4' />
              </button>
            </form>
          )}
        </div>
      </div>
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
