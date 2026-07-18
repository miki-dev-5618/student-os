'use server';

import { createAssignment, updateAssignment, deleteAssignment } from '@/services/assignments.service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createAssignmentAction(formData: FormData) {
  const subjectName = formData.get('assignmentName') as string;
  const deadline = formData.get('deadline') as string;
  const subjectId = Number(formData.get('subjectId'));

  await createAssignment(subjectName, new Date(deadline), subjectId);

  revalidatePath('/assignments');
  redirect('/assignments');
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

export async function updateAssignmentAction(assignmentId: number, formData: FormData) {
  const name = formData.get('assignmentName') as string;
  const deadlineStr = formData.get('deadline') as string;
  const subjectId = Number(formData.get('subjectId'));
  const rawStatus = (formData.get('status') || 'Pending') as string;
  const status = STATUS_MAP[rawStatus] || 'TODO';

  const parsedDate = deadlineStr ? new Date(deadlineStr) : new Date();
  const validDeadline = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

  await updateAssignment(assignmentId, name, validDeadline, subjectId, status);

  revalidatePath('/assignments');
  redirect('/assignments');
}

export async function deleteAssignmentAction(assignmentId: number) {
  await deleteAssignment(assignmentId);
  revalidatePath('/assignments');
  redirect('/assignments');
}

