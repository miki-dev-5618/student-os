'use client';
import { useEffect, useState } from 'react';
import SubjectCard from '@/app/components/SubjectCard';
import SearchBar from '@/app/components/SearchBar';
import SubjectDetails from '@/app/components/SubjectDetails';

export default function Page() {
  const [data, setData] = useState<{
    subjects: any[];
    assignments: any[];
    tasks: any[];
    exams: any[];
  } | null>(null)

  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState<
    any | null
  >(null);
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
      })
  }, [])

  if (loading) {
    return <div>Loading subjects...</div>
  }

  if (!data) {
    return <div>Failed to load subjects!</div>
  }

  const { subjects, assignments, tasks, exams } = data;



  const filterAssignments = selectedSubject ? assignments.filter((assignment) => assignment.subjectId === selectedSubject.subjectId) : [];
  const filterTasks = selectedSubject ? tasks.filter((task) => task.subjectId === selectedSubject.subjectId) : [];
  const filterExams = selectedSubject ? exams.filter((exam) => exam.subjectId === selectedSubject.subjectId) : [];

  console.log(filterAssignments, filterTasks, filterExams);


  return (
    <div>
      <div>
        <h2>Manage all your subjects.</h2>
        <form>
          <button type='submit'>Add Subject +</button>
        </form>
      </div>

      <div>
        <SearchBar />
      </div>
      <div>
        {subjects.map((subject) => (
          <button key={subject.subjectId} onClick={() => setSelectedSubject(subject)}>
            <SubjectCard
              name={subject.name}
              assignment={assignments.filter((a)=> a.subjectId===subject.subjectId).length}
              task={tasks.filter((t)=> t.subjectId===subject.subjectId).length}
              exam={exams.filter((e)=> e.subjectId===subject.subjectId).length}
            />
            View Details
          </button>
        ))}
      </div>
      {selectedSubject && <SubjectDetails name={selectedSubject.name}
        assignment={filterAssignments}
        task={filterTasks}
        exam={filterExams} />}

    </div>
  );
}
