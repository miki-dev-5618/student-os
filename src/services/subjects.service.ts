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
export async function createSubject(subjectName: string, userId: number) {
  try {
    await sql`
  INSERT INTO "Subject" ("name", "userId" )
  VALUES (${subjectName}, ${userId})
`;
  } catch (error) {
    console.error('Error creating subject: ', error);
    throw error;
  }
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

export async function updateSubject(subjectId: number, name: string) {
  try {
    await sql`
      UPDATE "Subject"
      SET "name" = ${name}
      WHERE "subjectId" = ${subjectId}
    `;
  } catch (error) {
    console.error('Error updating subject: ', error);
    throw error;
  }
}

export async function deleteSubject(subjectId: number) {
  try {
    await sql.begin(async (sql) => {
      await sql`DELETE FROM "Assignment" WHERE "subjectId" = ${subjectId}`;
      await sql`DELETE FROM "Exam" WHERE "subjectId" = ${subjectId}`;
      await sql`DELETE FROM "Task" WHERE "subjectId" = ${subjectId}`;
      await sql`DELETE FROM "Subject" WHERE "subjectId" = ${subjectId}`;
    });
  } catch (error) {
    console.error('Error deleting subject: ', error);
    throw error;
  }
}


