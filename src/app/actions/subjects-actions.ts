"use server"

import { createSubject, updateSubject, deleteSubject } from '@/services/subjects.service';
import { requireCurrentUser } from '@/services/user.service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createSubjectAction(formData: FormData) {
  const user = await requireCurrentUser();

  const subjectName = formData.get('subjectName') as string;

  await createSubject(subjectName, user.userId);
  revalidatePath('/subjects');
  redirect('/subjects');
}

export async function updateSubjectAction(subjectId: number, formData: FormData) {
  const subjectName = formData.get('subjectName') as string;

  await updateSubject(subjectId, subjectName);
  revalidatePath('/subjects');
  redirect('/subjects');
}

export async function deleteSubjectAction(subjectId: number) {
  await deleteSubject(subjectId);
  revalidatePath('/subjects');
  redirect('/subjects');
}

