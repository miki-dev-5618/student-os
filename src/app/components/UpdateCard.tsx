'use client';

import SubjectDropdown from '@/app/components/subjectDropdown';

interface EditFormProps {
  formAction: (formData: FormData) => void | Promise<void>;
  children: React.ReactNode;
}

export default function EditForm({
 formAction, children
}: EditFormProps) {

  // Format Date for input type="date" (YYYY-MM-DD)


  return (
    <form action={formAction} className='space-y-4'>
     {children}

      <button
        type='submit'
        className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm mt-2'
      >
        Save Changes
      </button>
    </form>
  );
}
