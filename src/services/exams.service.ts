import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function getUserExams(userId: number) {
  return await sql`
    SELECT * FROM "Exam"
    WHERE "subjectId" IN (
      SELECT "subjectId" FROM "Subject" WHERE "userId" = ${userId}
    )
  `;
}
export async function createExam(title: string, examDate: Date, subjectId: number) {
  try {
    await sql`
  INSERT INTO "Exam" ("title","examDate","subjectId" )
  VALUES (${title}, ${examDate}, ${subjectId})
`;
  } catch (error) {
    console.error('Error creating exam: ', error);
    throw error;
  }
}


