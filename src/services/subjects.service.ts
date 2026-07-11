import postgres from 'postgres';
import { requireCurrentUser } from '@/services/user.service';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });


export async function getUserSubjects(userId: number) {
  return await sql`
    SELECT * FROM "Subject"
    WHERE "subjectId" IN (
      SELECT "subjectId" FROM "Subject" WHERE "userId" = ${userId}
    )
  `;
}

export async function getSubjectExams(userId: number) {
  return await sql`
    SELECT e.*, s.name as "subjectName"
    FROM "Exam" e
    LEFT JOIN "Subject" s ON e."subjectId" = s."subjectId"
    WHERE e."subjectId" IN (
      SELECT "subjectId" FROM "Subject" WHERE "userId" = ${userId}
    )
  `;
}
export async function getSubjectTasks(userId: number) {
  return await sql`
    SELECT t.*, s.name as "subjectName"
    FROM "Task" t
    LEFT JOIN "Subject" s ON t."subjectId" = s."subjectId"
    WHERE t."subjectId" IN (
      SELECT "subjectId" FROM "Subject" WHERE "userId" = ${userId}
    )
  `;
}
export async function getSubjectAssignments(userId: number) {
  return await sql`
    SELECT a.*, s.name as "subjectName"
    FROM "Assignment" a
    LEFT JOIN "Subject" s ON a."subjectId" = s."subjectId"
    WHERE a."subjectId" IN (
      SELECT "subjectId" FROM "Subject" WHERE "userId" = ${userId}
    )
  `;
}

export async function createSubject(userId: number){
  
}