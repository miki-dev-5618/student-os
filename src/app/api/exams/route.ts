import { NextResponse } from 'next/server';
import { requireCurrentUser } from '@/services/user.service';
import { getUserExams } from '@/services/exams.service';
import { getUserSubjects } from '@/services/subjects.service';
export async function GET() {
  try {
    //get user
    const user = await requireCurrentUser();

    const [subjects, exams] = await Promise.all([
      getUserSubjects(user.userId),
      getUserExams(user.userId),
    ]);

    return NextResponse.json({
      subjects,
      exams,
    });
  } catch (error) {
    console.error('Failed to fetch exams data: ', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
