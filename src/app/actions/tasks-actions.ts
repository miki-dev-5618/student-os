'use server';

import { createTask } from '@/services/tasks.service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createTaskAction(formData: FormData) {
  const taskTitle = formData.get('taskTitle') as string;
  const taskDescription = formData.get('taskDescription') as string;
  const deadline = formData.get('deadline') as string;
  const subjectId = Number(formData.get('subjectId'));

  await createTask(taskTitle, taskDescription, subjectId, new Date(deadline));

  revalidatePath('/tasks');
  redirect('/tasks');
}
