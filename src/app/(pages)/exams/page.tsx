'use client';

import { useEffect, useState } from 'react';
import { getUserSubjects } from '@/services/subjects.service';
import { createExamAction, updateExamAction, deleteExamAction } from '@/app/actions/exams-actions';
import { requireCurrentUser } from '@/services/user.service';
import SearchBar from '@/app/components/SearchBar';
import SubjectDropdown from '@/app/components/subjectDropdown';
import DetailsCard from '@/app/components/DetailsCard';
import EditForm from '@/app/components/UpdateCard';
import { LuPlus, LuGraduationCap } from 'react-icons/lu';

export default function Page() {
  const [data, setData] = useState<{
    exams: any[];
    subjects: any[];
  } | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/exams')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const { subjects = [], exams = [] } = data || {};

  const formattedDate = selectedExam?.examDate
    ? (() => {
        const d = new Date(selectedExam.examDate);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      })()
    : '';

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-app text-forest-green dark:text-cream">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-kiwi border-t-transparent" />
          <span className="text-sm font-bold">Loading exams...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-app text-tomato-burst font-bold">
        Failed to load exams!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app grid-bg py-10 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8 text-neutral-800 dark:text-neutral-100">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-forest-green dark:text-cream">Exams</h1>
              <span className="bg-kiwi/15 text-kiwi font-bold text-xs px-2.5 py-1 rounded-full border border-kiwi/20">
                {exams.length}
              </span>
            </div>
            <p className="text-xs font-semibold text-zinc-550 dark:text-zinc-450 mt-1">
              Track and manage all your academic exams.
            </p>
          </div>
          <button
            onClick={() => setFormOpen(true)}
            className="self-start sm:self-auto px-5 py-2.5 bg-kiwi hover:bg-kiwi/95 text-zinc-950 rounded-full font-extrabold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 text-xs border border-forest-green/10"
          >
            <LuPlus size={16} />
            <span>Add Exam</span>
          </button>
        </div>

        {/* Search */}
        <div className="w-full max-w-md">
          <SearchBar />
        </div>

        {/* Form to Add Exam */}
        {formOpen && (
          <div className="bg-white dark:bg-zinc-900/60 border-2 border-forest-green/10 dark:border-kiwi/15 p-6 rounded-3xl shadow-soft space-y-5 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-forest-green/5 dark:border-zinc-800 pb-3">
              <h3 className="text-lg font-black text-forest-green dark:text-cream">New Exam</h3>
              <button
                onClick={() => setFormOpen(false)}
                className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 transition-colors text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <form
              action={createExamAction}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500">
                  Name
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter exam name"
                  required
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500">
                  Subject
                </label>
                <SubjectDropdown subjectsList={subjects}></SubjectDropdown>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500">
                  Exam Date
                </label>
                <input
                  type="date"
                  name="examDate"
                  required
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all font-semibold text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="md:col-span-3 flex justify-end gap-3 pt-4 border-t border-forest-green/5 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-5 py-2.5 border-2 border-forest-green/10 dark:border-zinc-700/60 hover:bg-cream/10 dark:hover:bg-zinc-800 rounded-full text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-kiwi hover:bg-kiwi/95 text-zinc-950 rounded-full text-xs font-extrabold transition-all shadow-sm"
                >
                  Create Exam
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modern Card List for Exams */}
        <div className="space-y-3">
          {/* Card Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-555">
            <div className="col-span-5">Exam</div>
            <div className="col-span-3">Subject</div>
            <div className="col-span-2">Exam Date</div>
            <div className="col-span-2">Status</div>
          </div>

          {exams.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-zinc-900/60 border-2 border-dashed border-forest-green/10 dark:border-zinc-800 rounded-3xl">
              <LuGraduationCap size={36} className="text-zinc-300 dark:text-zinc-600 mb-2" />
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-300">No exams found</p>
              <p className="text-xs text-zinc-550 dark:text-zinc-500 mt-0.5">Click "Add Exam" to create one.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {exams.map((exam: any) => (
                <div
                  key={exam.examId}
                  onClick={() => setSelectedExam(exam)}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-4 rounded-2xl border-2 transition-all cursor-pointer shadow-soft hover-lift ${
                    selectedExam?.examId === exam.examId
                      ? 'border-kiwi bg-kiwi/5'
                      : 'border-forest-green/5 dark:border-zinc-850 bg-white dark:bg-zinc-900/60 hover:bg-cream/10 dark:hover:bg-zinc-850/60'
                  }`}
                >
                  <div className="col-span-1 md:col-span-5">
                    <span className="font-extrabold text-sm text-forest-green dark:text-cream">{exam.title}</span>
                  </div>
                  <div className="col-span-1 md:col-span-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-sunshine/10 text-sunshine border border-sunshine/20">
                      {exam.subjectName || 'General'}
                    </span>
                  </div>
                  <div className="col-span-1 md:col-span-2 text-xs font-bold text-zinc-500 dark:text-zinc-400">
                    {new Date(exam.examDate).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold ${
                        exam.status === 'Completed'
                          ? 'bg-kiwi/15 text-kiwi border border-kiwi/20'
                          : 'bg-sunshine/15 text-sunshine border border-sunshine/20'
                      }`}
                    >
                      {exam.status || 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Details Card */}
        {selectedExam && (
          <div className="pt-6 border-t-2 border-dashed border-forest-green/10 dark:border-zinc-800 animate-fadeIn">
            <DetailsCard
              title={selectedExam.title}
              deleteAction={deleteExamAction.bind(null, selectedExam.examId)}
              fields={[
                { label: 'Subject', value: selectedExam.subjectName || 'General' },
                { label: 'Exam Date', value: new Date(selectedExam.examDate).toLocaleDateString() },
                { label: 'Status', value: selectedExam.status || 'Pending' },
                { label: 'Reflection', value: selectedExam.reflection || 'No notes added.' }
              ]}
              editForm={
                <EditForm formAction={updateExamAction.bind(null, selectedExam.examId)}>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Exam Title</label>
                    <input
                      name="title"
                      defaultValue={selectedExam.title}
                      className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Exam Date</label>
                    <input
                      type="date"
                      name="examDate"
                      defaultValue={formattedDate}
                      className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Subject</label>
                    <SubjectDropdown subjectsList={subjects} defaultSubjectId={selectedExam.subjectId} />
                  </div>
                </EditForm>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
