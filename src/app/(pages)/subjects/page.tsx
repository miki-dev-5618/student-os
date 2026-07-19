'use client';

import { useEffect, useState } from 'react';
import SubjectCard from '@/app/components/SubjectCard';
import SearchBar from '@/app/components/SearchBar';
import SubjectDetails from '@/app/components/SubjectDetails';
import { createSubjectAction, updateSubjectAction, deleteSubjectAction } from '@/app/actions/subjects-actions';
import EditForm from '@/app/components/UpdateCard';
import { LuPlus, LuFolderOpen } from 'react-icons/lu';

export default function Page() {
  const [data, setData] = useState<{
    subjects: any[];
    assignments: any[];
    tasks: any[];
    exams: any[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/subjects')
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-app text-forest-green dark:text-cream">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-kiwi border-t-transparent" />
          <span className="text-sm font-bold">Loading subjects...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-app text-tomato-burst font-bold">
        Failed to load subjects!
      </div>
    );
  }

  const { subjects = [], assignments = [], tasks = [], exams = [] } = data;

  const filterAssignments = selectedSubject
    ? assignments.filter(
        (assignment) => assignment.subjectId === selectedSubject.subjectId,
      )
    : [];
  const filterTasks = selectedSubject
    ? tasks.filter((task) => task.subjectId === selectedSubject.subjectId)
    : [];
  const filterExams = selectedSubject
    ? exams.filter((exam) => exam.subjectId === selectedSubject.subjectId)
    : [];

  return (
    <div className="min-h-screen bg-app grid-bg py-10 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8 text-neutral-800 dark:text-neutral-100">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-forest-green dark:text-cream">Subjects</h1>
              <span className="bg-kiwi/15 text-kiwi font-bold text-xs px-2.5 py-1 rounded-full border border-kiwi/20">
                {subjects.length}
              </span>
            </div>
            <p className="text-xs font-semibold text-zinc-550 dark:text-zinc-450 mt-1">
              Manage and organize your courses.
            </p>
          </div>
          <button
            onClick={() => setFormOpen(true)}
            className="self-start sm:self-auto px-5 py-2.5 bg-kiwi hover:bg-kiwi/95 text-zinc-950 rounded-full font-extrabold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 text-xs border border-forest-green/10"
          >
            <LuPlus size={16} />
            <span>Add Subject</span>
          </button>
        </div>

        {/* Search */}
        <div className="w-full max-w-md">
          <SearchBar />
        </div>

        {/* Form to Add Subject */}
        {formOpen && (
          <div className="bg-white dark:bg-zinc-900/60 border-2 border-forest-green/10 dark:border-kiwi/15 p-6 rounded-3xl shadow-soft space-y-5 max-w-md animate-fadeIn">
            <div className="flex justify-between items-center border-b border-forest-green/5 dark:border-zinc-800 pb-3">
              <h3 className="text-lg font-black text-forest-green dark:text-cream">New Subject</h3>
              <button
                onClick={() => setFormOpen(false)}
                className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 transition-colors text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <form action={createSubjectAction} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500">
                  Subject Name
                </label>
                <input
                  type="text"
                  name="subjectName"
                  placeholder="Enter subject name (e.g. Mathematics)"
                  required
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all font-semibold"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-forest-green/5 dark:border-zinc-800">
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
                  Create Subject
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Subjects Card Grid */}
        <div>
          {subjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-zinc-900/60 border-2 border-dashed border-forest-green/10 dark:border-zinc-800 rounded-3xl">
              <LuFolderOpen size={36} className="text-zinc-300 dark:text-zinc-600 mb-2" />
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-300">No subjects found</p>
              <p className="text-xs text-zinc-550 dark:text-zinc-500 mt-0.5">Click "Add Subject" to start organizing your files.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <button
                  key={subject.subjectId}
                  onClick={() => setSelectedSubject(subject)}
                  className="focus:outline-none"
                >
                  <SubjectCard
                    name={subject.name}
                    assignment={
                      assignments.filter((a) => a.subjectId === subject.subjectId).length
                    }
                    task={
                      tasks.filter((t) => t.subjectId === subject.subjectId).length
                    }
                    exam={
                      exams.filter((e) => e.subjectId === subject.subjectId).length
                    }
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected Subject Details Drawer/Section */}
        {selectedSubject && (
          <SubjectDetails
            name={selectedSubject.name}
            assignment={filterAssignments}
            task={filterTasks}
            exam={filterExams}
            deleteAction={deleteSubjectAction.bind(null, selectedSubject.subjectId)}
            editForm={
              <EditForm
                formAction={updateSubjectAction.bind(null, selectedSubject.subjectId)}
              >
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Edit Name</label>
                  <input
                    type="text"
                    name="subjectName"
                    defaultValue={selectedSubject.name}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all"
                    required
                  />
                </div>
              </EditForm>
            }
          />
        )}
      </div>
    </div>
  );
}
