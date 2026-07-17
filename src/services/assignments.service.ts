import postgres from 'postgres';

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

export async function updateAssignment(
  assignmentId: number,
  name: string,
  deadline: Date,
  subjectId: number,
  status: string,
) {
  try {
    await sql`
      UPDATE "Assignment"
      SET "name" = ${name}, "deadline" = ${deadline}, "subjectId" = ${subjectId}, "status" = ${status}
      WHERE "assignmentId" = ${assignmentId}
    `;
  } catch (error) {
    console.error('Error updating assignment: ', error);
    throw error;
  }
}
