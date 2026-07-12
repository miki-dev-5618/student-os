import { NextResponse } from 'next/server';
import { requireCurrentUser } from '@/services/user.service';
import { getUserSubjects } from '@/services/subjects.service';
import { getUserTasks } from '@/services/tasks.service';
export async function GET() {
  try {
    //get user
    const user = await requireCurrentUser();

    const [tasks, subjects] = await Promise.all([
      getUserTasks(user.userId),
      getUserSubjects(user.userId),
    ]);

    return NextResponse.json({
      tasks,
      subjects,
    });
  } catch (error) {
    console.error('Failed to fetch tasks data: ', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
