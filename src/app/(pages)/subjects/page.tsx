'use client';
import { useEffect, useState } from 'react';
import SubjectCard from '@/app/components/SubjectCard';
import SearchBar from '@/app/components/SearchBar';
import SubjectDetails from '@/app/components/SubjectDetails';
import { createSubjectAction, updateSubjectAction, deleteSubjectAction } from '@/app/actions/subjects-actions';
import EditForm from '@/app/components/UpdateCard';

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
    return <div>Loading subjects...</div>;
  }

  if (!data) {
    return <div>Failed to load subjects!</div>;
  }

  const { subjects, assignments, tasks, exams } = data;

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
    <div>
      <div>
        <h2>Manage all your subjects.</h2>
        <button type='button' onClick={() => setFormOpen(true)}>
          Add Subject +
        </button>

        {formOpen && (
          <form action={createSubjectAction} className='subject-form'>
            <div>
              <input
                type='text'
                name='subjectName'
                placeholder='Enter subject name'
              />
              <button type='submit'>Create Subject</button>
            </div>
          </form>
        )}
      </div>

      <div>
        <SearchBar />
      </div>
      <div>
        {subjects.map((subject) => (
          <button
            key={subject.subjectId}
            onClick={() => setSelectedSubject(subject)}
          >
            <SubjectCard
              name={subject.name}
              assignment={
                assignments.filter((a) => a.subjectId === subject.subjectId)
                  .length
              }
              task={
                tasks.filter((t) => t.subjectId === subject.subjectId).length
              }
              exam={
                exams.filter((e) => e.subjectId === subject.subjectId).length
              }
            />
            View Details
          </button>
        ))}
      </div>
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
              <input
                type='text'
                name='subjectName'
                defaultValue={selectedSubject.name}
                className='w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                required
              />
            </EditForm>
          }
        />
      )}
    </div>
  );
}
