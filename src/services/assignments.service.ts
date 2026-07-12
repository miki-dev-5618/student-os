import postgres from 'postgres';
import { requireCurrentUser } from '@/services/user.service';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function getUserAssignments(userId: number) {
  return await sql`
    SELECT * FROM "Assignment"
    WHERE "subjectId" IN (
      SELECT "subjectId" FROM "Subject" WHERE "userId" = ${userId}
    )
  `;
}
export async function createAssignment(
  assignmentName: string,
  deadline: Date,
  subjectId: number,
) {
  try {
    await sql`
  INSERT INTO "Assignment" ("name","deadline","subjectId" )
  VALUES (${assignmentName}, ${deadline}, ${subjectId})
`;
  } catch (error) {
    console.error('Error creating assignment: ', error);
    throw error;
  }
}
