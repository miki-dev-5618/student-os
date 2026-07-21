import { PrismaClient, WorkStatus, ExamStatus, EntityType, Action } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import argon2 from 'argon2';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

function daysFromNow(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

function daysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

async function main() {
  console.log('Clearing database...');
  await prisma.activityLog.deleteMany({});
  await prisma.assignment.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.exam.deleteMany({});
  await prisma.subject.deleteMany({});

  console.log('Seeding user...');
  const passwordHash = await argon2.hash('password123', {
    type: argon2.argon2id,
  });
  const userId = 3;



  console.log('Seeding subjects...');
  const subjects = await prisma.subject.createManyAndReturn({
    data: [
      { name: "Mathematics", userId: 3 },
      { name: "Computer Science", userId: 3 },
      { name: "Physics", userId: 3 },
      { name: "Chemistry", userId: 3 },
      { name: "English", userId: 3 },
      { name: "Operating Systems", userId: 3 },
      { name: "Database Systems", userId: 3 },
      { name: "Artificial Intelligence", userId: 3 },
    ],
  });
  const subjectMap = Object.fromEntries(
    subjects.map((s) => [s.name, s.subjectId])
  );

  console.log('Seeding assignments...');
  const assignments = await prisma.assignment.createManyAndReturn({
    data: [
      // Mathematics
      {
        name: 'Calculus Homework 5',
        deadline: daysFromNow(2),
        subjectId: subjectMap['Mathematics'],
        status: WorkStatus.TODO,
      },
      {
        name: 'Integration Worksheet',
        deadline: daysFromNow(4),
        subjectId: subjectMap['Mathematics'],
        status: WorkStatus.IN_PROGRESS,
      },
      {
        name: 'Calculus Homework 4',
        deadline: daysAgo(3),
        subjectId: subjectMap['Mathematics'],
        status: WorkStatus.DONE,
      },
      // Computer Science
      {
        name: 'Programming Assignment 4',
        deadline: daysFromNow(3),
        subjectId: subjectMap['Computer Science'],
        status: WorkStatus.IN_PROGRESS,
      },
      {
        name: 'Sorting Algorithms Report',
        deadline: daysFromNow(6),
        subjectId: subjectMap['Computer Science'],
        status: WorkStatus.TODO,
      },
      {
        name: 'Binary Tree Lab',
        deadline: daysAgo(2),
        subjectId: subjectMap['Computer Science'],
        status: WorkStatus.DONE,
      },
      // Physics
      {
        name: 'Electromagnetism Problems',
        deadline: daysFromNow(5),
        subjectId: subjectMap['Physics'],
        status: WorkStatus.TODO,
      },
      {
        name: 'Mechanics Worksheet',
        deadline: daysAgo(6),
        subjectId: subjectMap['Physics'],
        status: WorkStatus.DONE,
      },
      // Chemistry
      {
        name: 'Organic Chemistry Lab Report',
        deadline: daysFromNow(9),
        subjectId: subjectMap['Chemistry'],
        status: WorkStatus.IN_PROGRESS,
      },
      {
        name: 'Acid Base Report',
        deadline: daysAgo(4),
        subjectId: subjectMap['Chemistry'],
        status: WorkStatus.DONE,
      },
      // English
      {
        name: 'Essay on Shakespeare',
        deadline: daysFromNow(7),
        subjectId: subjectMap['English'],
        status: WorkStatus.TODO,
      },
      {
        name: 'Poetry Analysis',
        deadline: daysAgo(8),
        subjectId: subjectMap['English'],
        status: WorkStatus.DONE,
      },
      // Operating Systems
      {
        name: 'Process Synchronization Assignment',
        deadline: daysFromNow(6),
        subjectId: subjectMap['Operating Systems'],
        status: WorkStatus.IN_PROGRESS,
      },
      {
        name: 'CPU Scheduling Report',
        deadline: daysFromNow(11),
        subjectId: subjectMap['Operating Systems'],
        status: WorkStatus.TODO,
      },
      {
        name: 'Shell Lab Submission',
        deadline: daysAgo(5),
        subjectId: subjectMap['Operating Systems'],
        status: WorkStatus.DONE,
      },
    ],
  });
  const assignmentMap = Object.fromEntries(
    assignments.map((a) => [a.name, a.assignmentId])
  );

  console.log('Seeding tasks...');
  const tasks = await prisma.task.createManyAndReturn({
    data: [
      // Mathematics
      {
        title: 'Math Integration Drills',
        description: 'Complete the 20 practice questions on integration by parts.',
        deadline: daysFromNow(1),
        status: WorkStatus.TODO,
        subjectId: subjectMap['Mathematics'],
      },
      {
        title: 'Review Linear Algebra Notes',
        description: 'Read notes on eigenvalues and eigenvectors.',
        deadline: daysFromNow(3),
        status: WorkStatus.IN_PROGRESS,
        subjectId: subjectMap['Mathematics'],
      },
      // Computer Science
      {
        title: 'Implement Redux Store',
        description: 'Set up state management for the client dashboard project.',
        deadline: daysFromNow(2),
        status: WorkStatus.IN_PROGRESS,
        subjectId: subjectMap['Computer Science'],
      },
      {
        title: 'Practice LeetCode Trees',
        description: 'Solve 5 medium questions on Binary Search Trees.',
        deadline: daysFromNow(4),
        status: WorkStatus.TODO,
        subjectId: subjectMap['Computer Science'],
      },
      // Physics
      {
        title: 'Read Chapter 5: Quantum Mechanics',
        description: 'Read textbook pages 200-225 and summarize.',
        deadline: daysFromNow(3),
        status: WorkStatus.TODO,
        subjectId: subjectMap['Physics'],
      },
      {
        title: 'Review Physics Formulas',
        description: 'Make a formula sheet for electromagnetism.',
        deadline: daysFromNow(5),
        status: WorkStatus.TODO,
        subjectId: subjectMap['Physics'],
      },
      // Chemistry
      {
        title: 'Chemistry Lab Safety Video',
        description: 'Watch the safety guidelines video on portal.',
        deadline: daysAgo(2),
        status: WorkStatus.DONE,
        subjectId: subjectMap['Chemistry'],
      },
      {
        title: 'Balance Redox Equations',
        description: 'Complete worksheet on acidic and basic solutions.',
        deadline: daysFromNow(2),
        status: WorkStatus.IN_PROGRESS,
        subjectId: subjectMap['Chemistry'],
      },
      // English
      {
        title: 'Review Vocabulary List 8',
        description: 'Study terms for the upcoming English comprehension test.',
        deadline: daysAgo(1),
        status: WorkStatus.DONE,
        subjectId: subjectMap['English'],
      },
      {
        title: 'Draft Thesis for Term Paper',
        description: 'Outline the arguments for the literature assignment.',
        deadline: daysFromNow(6),
        status: WorkStatus.TODO,
        subjectId: subjectMap['English'],
      },
      // Operating Systems
      {
        title: 'Read Concurrency Chapter',
        description: 'Read about semaphores and mutexes in textbook.',
        deadline: daysFromNow(1),
        status: WorkStatus.TODO,
        subjectId: subjectMap['Operating Systems'],
      },
      {
        title: 'OS Lab 3 Setup',
        description: 'Install requirements and set up Pintos directory.',
        deadline: daysFromNow(3),
        status: WorkStatus.IN_PROGRESS,
        subjectId: subjectMap['Operating Systems'],
      },
    ],
  });
  const taskMap = Object.fromEntries(
    tasks.map((t) => [t.title, t.taskId])
  );

  console.log('Seeding exams...');
  const exams = await prisma.exam.createManyAndReturn({
    data: [
      // Mathematics
      {
        title: 'Calculus Midterm Exam',
        examDate: daysAgo(15),
        subjectId: subjectMap['Mathematics'],
        status: ExamStatus.COMPLETED,
        reflection: 'Scored well on derivatives but struggled with limits.',
      },
      {
        title: 'Linear Algebra Test',
        examDate: daysAgo(5),
        subjectId: subjectMap['Mathematics'],
        status: ExamStatus.COMPLETED,
        reflection: 'Understood vector spaces well. Great result.',
      },
      {
        title: 'Calculus Final Exam',
        examDate: daysFromNow(12),
        subjectId: subjectMap['Mathematics'],
        status: ExamStatus.UPCOMING,
      },
      // Computer Science
      {
        title: 'Data Structures Midterm',
        examDate: daysAgo(10),
        subjectId: subjectMap['Computer Science'],
        status: ExamStatus.COMPLETED,
        reflection: 'Time complexity analysis was tricky, need to practice more.',
      },
      {
        title: 'Software Engineering Quiz',
        examDate: daysAgo(2),
        subjectId: subjectMap['Computer Science'],
        status: ExamStatus.COMPLETED,
        reflection: 'Easy questions on design patterns.',
      },
      {
        title: 'Computer Science Final',
        examDate: daysFromNow(8),
        subjectId: subjectMap['Computer Science'],
        status: ExamStatus.UPCOMING,
      },
      // Physics
      {
        title: 'Classical Mechanics Exam',
        examDate: daysAgo(20),
        subjectId: subjectMap['Physics'],
        status: ExamStatus.COMPLETED,
        reflection: 'Struggled with rotational dynamics.',
      },
      {
        title: 'Physics Quiz 2',
        examDate: daysAgo(4),
        subjectId: subjectMap['Physics'],
        status: ExamStatus.COMPLETED,
        reflection: 'Got 90%. Need to review thermodynamics formulas before the midterm.',
      },
      {
        title: 'Electromagnetism Final Exam',
        examDate: daysFromNow(15),
        subjectId: subjectMap['Physics'],
        status: ExamStatus.UPCOMING,
      },
      // Chemistry
      {
        title: 'Organic Chemistry Midterm',
        examDate: daysAgo(12),
        subjectId: subjectMap['Chemistry'],
        status: ExamStatus.COMPLETED,
        reflection: 'Functional groups identification was easy.',
      },
      {
        title: 'Chemistry Lab Exam',
        examDate: daysAgo(3),
        subjectId: subjectMap['Chemistry'],
        status: ExamStatus.COMPLETED,
        reflection: 'Excellent performance, lab preparation helped.',
      },
      {
        title: 'Inorganic Chemistry Quiz',
        examDate: daysFromNow(5),
        subjectId: subjectMap['Chemistry'],
        status: ExamStatus.UPCOMING,
      },
      // English
      {
        title: 'Shakespearean Drama Test',
        examDate: daysAgo(8),
        subjectId: subjectMap['English'],
        status: ExamStatus.COMPLETED,
        reflection: 'Analysis of Hamlet was well-received.',
      },
      {
        title: 'English Lit Midterm',
        examDate: daysFromNow(7),
        subjectId: subjectMap['English'],
        status: ExamStatus.UPCOMING,
      },
      // Operating Systems
      {
        title: 'Process Management Quiz',
        examDate: daysAgo(6),
        subjectId: subjectMap['Operating Systems'],
        status: ExamStatus.COMPLETED,
        reflection: 'Found CPU scheduling algorithms easy.',
      },
      {
        title: 'OS Memory Management Exam',
        examDate: daysFromNow(10),
        subjectId: subjectMap['Operating Systems'],
        status: ExamStatus.UPCOMING,
      },
    ],
  });
  const examMap = Object.fromEntries(
    exams.map((e) => [e.title, e.examId])
  );

  console.log('Seeding activity logs...');
  await prisma.activityLog.createMany({
    data: [
      {
        userId,
        entityType: EntityType.EXAM,
        entityId: examMap['Physics Quiz 2'],
        titleSnapshot: 'Physics Quiz 2',
        action: Action.EXAM_COMPLETED,
        createdAt: daysAgo(4),
      },
      {
        userId,
        entityType: EntityType.EXAM,
        entityId: examMap['Chemistry Lab Exam'],
        titleSnapshot: 'Chemistry Lab Exam',
        action: Action.EXAM_COMPLETED,
        createdAt: daysAgo(3),
      },
      {
        userId,
        entityType: EntityType.EXAM,
        entityId: examMap['Calculus Final Exam'],
        titleSnapshot: 'Calculus Final Exam',
        action: Action.EXAM_CREATED,
        createdAt: daysAgo(1),
      },
      {
        userId,
        entityType: EntityType.ASSIGNMENT,
        entityId: assignmentMap['Programming Assignment 4'],
        titleSnapshot: 'Programming Assignment 4',
        action: Action.ASSIGNMENT_CREATED,
        createdAt: daysAgo(2),
      },
      {
        userId,
        entityType: EntityType.TASK,
        entityId: taskMap['Implement Redux Store'],
        titleSnapshot: 'Implement Redux Store',
        action: Action.TASK_CREATED,
        createdAt: daysAgo(1),
      },
      {
        userId,
        entityType: EntityType.TASK,
        entityId: taskMap['Review Vocabulary List 8'],
        titleSnapshot: 'Review Vocabulary List 8',
        action: Action.TASK_COMPLETED,
        createdAt: daysAgo(1),
      },
    ],
  });

  console.log('Database seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
