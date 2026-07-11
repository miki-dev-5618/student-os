'use server';

import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { forbidden, redirect } from 'next/navigation';
import { saltAndHashPassword } from '@/services/password';
import { userSchema } from '@/services/zod';
import { AuthError } from 'next-auth';
import { signIn, auth } from '@/services/auth';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

const CreateUser = userSchema.omit({ userId: true });

export async function createUser(formData: FormData) {
  const { name, email, password } = CreateUser.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  const passwordHash = await saltAndHashPassword(password);

  try {
    await sql`
    INSERT INTO "User"(name, email, password) VALUES (${name}, ${email}, ${passwordHash})`;
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }

  // Automatically sign in the user after registration
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard',
    });
  } catch (error) {
    if (error instanceof AuthError) {
      console.error('Auto-login failed:', error.type);
      redirect('/login');
    }
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  const [user] = await sql`
    SELECT * FROM "User" WHERE email = ${email}
  `;
  return user;
}

export async function requireCurrentUser() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const email = session.user?.email;
  if (!email) {
    redirect('/login');
  }

  const user = await getUserByEmail(email);

  if (!user) {
    redirect('/login');
  }

  return user;
}

export async function getUserAssignments(userId: number) {
  return await sql`
    SELECT * FROM "Assignment"
    WHERE "subjectId" IN (
      SELECT "subjectId" FROM "Subject" WHERE "userId" = ${userId}
    )
  `;
}

export async function getUserTasks(userId: number) {
  return await sql`
    SELECT * FROM "Task"
    WHERE "subjectId" IN (
      SELECT "subjectId" FROM "Subject" WHERE "userId" = ${userId}
    )
  `;
}

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

export async function getPendingTasks(userId: number) {
  return await sql`
    SELECT t.*, s.name as "subjectName"
    FROM "Task" t
    LEFT JOIN "Subject" s on t."subjectId" = s."subjectId"
    WHERE t."subjectId" IN (
      SELECT "subjectId"
      FROM "Subject"
      WHERE "userId" = ${userId}

    )
    AND t."status" IN ('TODO', 'IN_PROGRESS')
          ORDER BY "deadline" ASC

  `;
}

export async function getRecentActivity(userId: number) {
  return await sql`
    SELECT * FROM "ActivityLog"
    WHERE "userId" = ${userId}
    ORDER BY "createdAt" DESC
    LIMIT 10
  `;
}
