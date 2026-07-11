"use client"
import { useState } from 'react'; // keep if needed or remove if unused, but let's just make it a pure component without useState
type SubjectCardProps = {
  name: string;
  assignment: any[];
  task:any[];
  exam: any[];
};

export default function SubjectDetails({ name, assignment, task, exam }: SubjectCardProps) {
  return (
    <div>
      <h1 className='capitalize text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50'>
        {name}
      </h1>
      <p>{task.length} Tasks | {exam.length} Exams | {assignment.length} Assignments</p>
      <div>
        <div>
          <h3>Tasks</h3>
          {task.length === 0 ? (
            <p>No tasks</p>
          ) : (
            <ul>
              {task.map((t) => (
                <li key={t.taskId}>
                  <strong>{t.title}</strong> - {t.status} (Deadline: {new Date(t.deadline).toLocaleDateString()})
                  {t.description && <p>{t.description}</p>}
                </li>
              ))}
            </ul>
          )}

          <h3>Exams</h3>
          {exam.length === 0 ? (
            <p>No exams</p>
          ) : (
            <ul>
              {exam.map((e) => (
                <li key={e.examId}>
                  Exam Date: {new Date(e.examDate).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}

          <h3>Assignments</h3>
          {assignment.length === 0 ? (
            <p>No assignments</p>
          ) : (
            <ul>
              {assignment.map((a) => (
                <li key={a.assignmentId}>
                  <strong>{a.name}</strong> (Deadline: {new Date(a.deadline).toLocaleDateString()})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
