'use server';

import { createExam, updateExam } from '@/services/exams.service';
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

export async function updateExamAction(examId: number, formData: FormData) {
  const title = formData.get('title') as string;
  const examDate = formData.get('examDate') as string;
  const subjectId = Number(formData.get('subjectId'));

  await updateExam(examId, title, new Date(examDate), subjectId);

  revalidatePath('/exams');
  redirect('/exams');
}
