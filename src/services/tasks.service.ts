import postgres from 'postgres';
import { requireCurrentUser } from './user.service';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function getUserTasks(userId: number) {
  return await sql`
    SELECT t.*, s.name as "subjectName"
    FROM "Task" t
    LEFT JOIN "Subject" s ON t."subjectId" = s."subjectId"
    WHERE t."subjectId" IN (
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

export async function updateTask(
  taskId: number,
  title: string,
  description: string,
  subjectId: number,
  deadline: Date,
  status: string
) {
  try {
    await sql`
      UPDATE "Task"
      SET "title" = ${title}, "description" = ${description}, "subjectId" = ${subjectId}, "deadline" = ${deadline}, "status" = ${status}
      WHERE "taskId" = ${taskId}
    `;
  } catch (error) {
    console.error('Error updating task: ', error);
    throw error;
  }
}

export async function deleteTask(taskId: number) {
  try {
    await sql`
      DELETE FROM "Task"
      WHERE "taskId" = ${taskId}
    `;
  } catch (error) {
    console.error('Error deleting task: ', error);
    throw error;
  }
}

