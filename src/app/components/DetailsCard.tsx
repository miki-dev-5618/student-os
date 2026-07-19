'use client';

import { useState } from 'react';
import { LuPencilLine, LuTrash2 } from 'react-icons/lu';
import { Sparkle } from './Doodle';

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
    <div className="rounded-3xl border-2 border-auburn bg-white p-6 shadow-soft relative overflow-hidden transition-all hover:scale-[1.01] text-auburn">
      {/* Decorative top header strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-auburn via-sunset to-burnt-sienna" />
      
      <div className="flex justify-between items-center mb-4 pt-1">
        <div className="flex items-center gap-2">
          {editForm && (
            <button
              onClick={() => setIsEdit(!isEdit)}
              className={`p-2 border border-auburn/20 text-auburn bg-nectar-cream/30 hover:bg-nectar-pink/40 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-1 text-xs font-bold cursor-pointer ${isEdit ? 'bg-sunset text-zinc-950 border-transparent shadow-sm' : ''}`}
            >
              <LuPencilLine className="w-4 h-4" />
              <span>{isEdit ? 'Close Edit' : 'Edit Details'}</span>
            </button>
          )}
          {deleteAction && (
            <form action={deleteAction} className="inline">
              <button
                type="submit"
                className="p-2 border border-auburn/25 text-auburn bg-auburn/5 hover:bg-auburn/15 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-1 text-xs font-bold cursor-pointer"
                onClick={(e) => {
                  if (!confirm('Are you sure you want to delete this?')) {
                    e.preventDefault();
                  }
                }}
              >
                <LuTrash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </form>
          )}
        </div>
        <Sparkle size={16} className="text-auburn animate-pulse" />
      </div>

      <div className="space-y-4">
        {title && (
          <h3 className="text-xl font-serif font-black tracking-tight text-auburn capitalize leading-none">
            {title}
          </h3>
        )}

        {fields && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-nectar-cream/30 p-4 rounded-2xl border-2 border-auburn/10">
            {fields.map((field, idx) => (
              <div key={idx} className="flex flex-col gap-0.5">
                {field.label && (
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-auburn/50">
                    {field.label}
                  </span>
                )}
                <span className="text-sm font-bold text-auburn">
                  {field.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {isEdit && editForm && (
        <div className="mt-5 pt-5 border-t-2 border-dashed border-auburn/10 animate-fadeIn">
          {editForm}
        </div>
      )}
    </div>
  );
}
