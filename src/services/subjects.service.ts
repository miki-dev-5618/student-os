import postgres from 'postgres';
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function getUserByEmail(email: string) {
  const [user] = await sql`
    SELECT * FROM "User" WHERE email = ${email}
  `;
  return user;
}

export async function getUserSubjects(userId: number) {
  return await sql`
    SELECT * FROM "Subject"
    WHERE "subjectId" IN (
      SELECT "subjectId" FROM "Subject" WHERE "userId" = ${userId}
    )
  `;
}