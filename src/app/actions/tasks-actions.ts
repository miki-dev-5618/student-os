'use server';

import { createTask, updateTask } from '@/services/tasks.service';
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

const STATUS_MAP: Record<string, string> = {
  'To Do': 'TODO',
  'In Progress': 'IN_PROGRESS',
  'Completed': 'DONE',
  'Pending': 'TODO',
  'TODO': 'TODO',
  'IN_PROGRESS': 'IN_PROGRESS',
  'DONE': 'DONE'
};

export async function updateTaskAction(taskId: number, formData: FormData) {
  const taskTitle = (formData.get('taskTitle') || formData.get('title') || '') as string;
  const taskDescription = (formData.get('taskDescription') || '') as string;
  const deadlineStr = formData.get('deadline') as string;
  const subjectId = Number(formData.get('subjectId'));
  const rawStatus = (formData.get('status') || 'To Do') as string;
  const status = STATUS_MAP[rawStatus] || 'TODO';

  const parsedDate = deadlineStr ? new Date(deadlineStr) : new Date();
  const validDeadline = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

  await updateTask(
    taskId,
    taskTitle,
    taskDescription,
    subjectId,
    validDeadline,
    status
  );

  revalidatePath('/tasks');
  redirect('/tasks');
}
