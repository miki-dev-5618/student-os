'use server';

import { createAssignment } from '@/services/assignments.service';
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
