"use server"

import { createSubject } from '@/services/subjects.service';
import { requireCurrentUser } from '@/services/user.service';

export async function createSubjectAction(formData: FormData) {
  const user = await requireCurrentUser();

  const subjectName = formData.get('subjectName') as string;

  await createSubject(subjectName, user.userId);
}
