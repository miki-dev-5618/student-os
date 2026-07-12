import postgres from 'postgres';
import { requireCurrentUser } from './user.service';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function getUserTasks(userId: number) {
  return await sql`
  SELECT * FROM "Task"
    WHERE "subjectId" IN (
      SELECT "subjectId" FROM "Subject" WHERE "userId" = ${userId}
    )
  `;
}
export async function createTask(
  title: string,
  description: string,
  subjectId: number,
  deadline: Date,
) {
  try {
    await sql`
  INSERT INTO "Task" ("title", "description", "subjectId", "deadline")
  VALUES (${title}, ${description}, ${subjectId}, ${deadline})
`;
  } catch (error) {
    console.error('Error creating task: ', error);
    throw error;
  }
}

export async function getUserAssignments(userId: number) {
  return await sql`
    SELECT * FROM "Assignment"
    WHERE "subjectId" IN (
      SELECT "subjectId" FROM "Subject" WHERE "userId" = ${userId}
    )
  `;
}