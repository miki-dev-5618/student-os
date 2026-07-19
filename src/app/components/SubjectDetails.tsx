'use client';

import { useState } from 'react';
import { LuPencilLine, LuTrash2, LuCircleCheck, LuGraduationCap, LuClipboardCheck } from 'react-icons/lu';
import { Sparkle } from './Doodle';

type SubjectCardProps = {
  name: string;
  assignment: any[];
  task: any[];
  exam: any[];
  editForm?: React.ReactNode;
  deleteAction?: (formData: FormData) => void | Promise<void>;
};

export default function SubjectDetails({ name, assignment, task, exam, editForm, deleteAction }: SubjectCardProps) {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="p-6 bg-white border-2 border-auburn rounded-3xl shadow-soft space-y-6 mt-8 animate-fadeIn text-auburn">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="capitalize text-2xl font-serif font-black text-auburn leading-none mt-1">
              {name}
            </h1>
            <Sparkle size={16} className="text-auburn animate-pulse" />
          </div>
          <p className="text-[10px] font-extrabold uppercase tracking-wider text-auburn/60 mt-1.5">
            {task.length} Tasks &bull; {exam.length} Exams &bull; {assignment.length} Assignments
          </p>
        </div>
        <div className="flex items-center gap-2">
          {editForm && (
            <button
              onClick={() => setIsEdit(!isEdit)}
              className={`p-2 border border-auburn/20 text-auburn bg-nectar-cream/30 hover:bg-nectar-pink/40 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-bold cursor-pointer ${isEdit ? 'bg-sunset text-zinc-950 border-transparent shadow-sm' : ''}`}
            >
              <LuPencilLine className="w-4 h-4" />
              <span>{isEdit ? 'Close Edit' : 'Edit Name'}</span>
            </button>
          )}
          {deleteAction && (
            <form action={deleteAction} className="inline">
              <button
                type="submit"
                className="p-2 border border-auburn/25 text-auburn bg-auburn/5 hover:bg-auburn/15 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                onClick={(e) => {
                  if (!confirm('Are you sure you want to delete this subject? This will also delete all associated tasks, assignments, and exams!')) {
                    e.preventDefault();
                  }
                }}
              >
                <LuTrash2 className="w-4 h-4" />
                <span>Delete Subject</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {isEdit && editForm && (
        <div className="pt-5 border-t-2 border-dashed border-auburn/10">
          {editForm}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t-2 border-auburn/10">
        
        {/* Tasks List */}
        <div className="space-y-4">
          <h3 className="font-serif text-sm font-black text-auburn flex items-center gap-1.5">
            <LuCircleCheck size={16} className="text-auburn" />
            <span>Tasks ({task.length})</span>
          </h3>
          {task.length === 0 ? (
            <p className="text-xs font-bold text-auburn/50 italic py-2">No tasks assigned</p>
          ) : (
            <ul className="space-y-3">
              {task.map((t) => (
                <li key={t.taskId} className="text-sm bg-nectar-cream/30 p-4 rounded-2xl border-2 border-auburn/10 hover:bg-nectar-pink/20 transition-all duration-150">
                  <div className="font-bold text-auburn">{t.title}</div>
                  <div className="text-[10px] text-auburn/60 mt-1 flex flex-wrap gap-2 font-extrabold">
                    <span>Status: {t.status || 'To Do'}</span>
                    <span>&bull;</span>
                    <span>Due: {new Date(t.deadline).toLocaleDateString()}</span>
                  </div>
                  {t.description && <p className="text-xs text-auburn/70 mt-2 border-t border-auburn/10 pt-2 font-semibold">{t.description}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Exams List */}
        <div className="space-y-4">
          <h3 className="font-serif text-sm font-black text-auburn flex items-center gap-1.5">
            <LuGraduationCap size={16} className="text-burnt-sienna" />
            <span>Exams ({exam.length})</span>
          </h3>
          {exam.length === 0 ? (
            <p className="text-xs font-bold text-auburn/50 italic py-2">No exams scheduled</p>
          ) : (
            <ul className="space-y-3">
              {exam.map((e) => (
                <li key={e.examId} className="text-sm bg-nectar-cream/30 p-4 rounded-2xl border-2 border-auburn/10 hover:bg-nectar-pink/20 transition-all duration-150">
                  <div className="font-bold text-auburn font-serif">Exam preparation</div>
                  <div className="text-[10px] text-auburn/60 mt-1 font-extrabold">
                    Date: {new Date(e.examDate).toLocaleDateString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          <h3 className="font-serif text-sm font-black text-auburn flex items-center gap-1.5">
            <LuClipboardCheck size={16} className="text-jasper" />
            <span>Assignments ({assignment.length})</span>
          </h3>
          {assignment.length === 0 ? (
            <p className="text-xs font-bold text-auburn/50 italic py-2">No assignments pending</p>
          ) : (
            <ul className="space-y-3">
              {assignment.map((a) => (
                <li key={a.assignmentId} className="text-sm bg-nectar-cream/30 p-4 rounded-2xl border-2 border-auburn/10 hover:bg-nectar-pink/20 transition-all duration-150">
                  <div className="font-bold text-auburn">{a.name}</div>
                  <div className="text-[10px] text-auburn/60 mt-1 font-extrabold">
                    Deadline: {new Date(a.deadline).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
