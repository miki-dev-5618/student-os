import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function getUserExams(userId: number) {
  return await sql`
    SELECT e.*, s.name as "subjectName"
    FROM "Exam" e
    LEFT JOIN "Subject" s ON e."subjectId" = s."subjectId"
    WHERE e."subjectId" IN (
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

export async function updateExam(examId: number, title: string, examDate: Date, subjectId: number) {
  try {
    await sql`
  UPDATE "Exam" 
  SET "title" = ${title}, "examDate"=${examDate}, "subjectId"=${subjectId}
  WHERE "examId" = ${examId}
`;
  } catch (error) {
    console.error('Error updating exam: ', error);
    throw error;
  }
}

export async function deleteExam(examId: number) {
  try {
    await sql`
      DELETE FROM "Exam"
      WHERE "examId" = ${examId}
    `;
  } catch (error) {
    console.error('Error deleting exam: ', error);
    throw error;
  }
}

