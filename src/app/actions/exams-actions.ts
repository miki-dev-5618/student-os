'use server';

import { createExam } from '@/services/exams.service';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createExamAction(formData: FormData) {
  const title = formData.get('title') as string;
  const examDate = formData.get('examDate') as string;
  const subjectId = Number(formData.get('subjectId'));

  await createExam(title, new Date(examDate), subjectId);

  revalidatePath('/exams');
  redirect('/exams');
}
