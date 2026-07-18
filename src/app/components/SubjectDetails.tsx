"use client"
import { useState } from 'react';
import { LuPencilLine, LuTrash2 } from 'react-icons/lu';

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
    <div className='p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm space-y-6 mt-6'>
      <div className='flex justify-between items-start'>
        <div>
          <h1 className='capitalize text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50'>
            {name}
          </h1>
          <p className='text-sm text-zinc-500 dark:text-zinc-400 mt-1'>
            {task.length} Tasks | {exam.length} Exams | {assignment.length} Assignments
          </p>
        </div>
        <div className='flex items-center gap-2'>
          {editForm && (
            <button
              onClick={() => setIsEdit(!isEdit)}
              className='p-2 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors'
            >
              <LuPencilLine className='w-5 h-5' />
            </button>
          )}
          {deleteAction && (
            <form action={deleteAction} className='inline'>
              <button
                type='submit'
                className='p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors'
                onClick={(e) => {
                  if (!confirm('Are you sure you want to delete this subject? This will also delete all associated tasks, assignments, and exams!')) {
                    e.preventDefault();
                  }
                }}
              >
                <LuTrash2 className='w-5 h-5' />
              </button>
            </form>
          )}
        </div>
      </div>

      {isEdit && editForm && (
        <div className='pt-4 border-t border-zinc-150 dark:border-zinc-800'>
          {editForm}
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-850'>
        <div>
          <h3 className='font-bold text-sm uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3'>Tasks</h3>
          {task.length === 0 ? (
            <p className='text-sm text-zinc-500'>No tasks</p>
          ) : (
            <ul className='space-y-2.5'>
              {task.map((t) => (
                <li key={t.taskId} className='text-sm bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800'>
                  <div className='font-semibold text-zinc-850 dark:text-zinc-200'>{t.title}</div>
                  <div className='text-xs text-zinc-500 mt-1'>
                    Status: <span className='font-medium'>{t.status || 'To Do'}</span> | Deadline: {new Date(t.deadline).toLocaleDateString()}
                  </div>
                  {t.description && <p className='text-xs text-zinc-555 mt-1.5'>{t.description}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className='font-bold text-sm uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3'>Exams</h3>
          {exam.length === 0 ? (
            <p className='text-sm text-zinc-500'>No exams</p>
          ) : (
            <ul className='space-y-2.5'>
              {exam.map((e) => (
                <li key={e.examId} className='text-sm bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800'>
                  <div className='text-xs text-zinc-500'>
                    Exam Date: <span className='font-medium'>{new Date(e.examDate).toLocaleDateString()}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className='font-bold text-sm uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3'>Assignments</h3>
          {assignment.length === 0 ? (
            <p className='text-sm text-zinc-500'>No assignments</p>
          ) : (
            <ul className='space-y-2.5'>
              {assignment.map((a) => (
                <li key={a.assignmentId} className='text-sm bg-zinc-50 dark:bg-zinc-800/40 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800'>
                  <div className='font-semibold text-zinc-850 dark:text-zinc-200'>{a.name}</div>
                  <div className='text-xs text-zinc-500 mt-1'>
                    Deadline: <span className='font-medium'>{new Date(a.deadline).toLocaleDateString()}</span>
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
