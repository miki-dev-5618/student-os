'use client';

interface EditFormProps {
  formAction: (formData: FormData) => void | Promise<void>;
  children: React.ReactNode;
}

export default function EditForm({
  formAction,
  children,
}: EditFormProps) {
  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-3">
        {children}
      </div>

      <button
        type="submit"
        className="w-full px-5 py-2.5 bg-kiwi hover:bg-kiwi/95 text-zinc-950 rounded-full text-sm font-extrabold transition-all duration-150 shadow-md hover:scale-[1.01] active:scale-[0.99] border-2 border-forest-green/10 mt-3"
      >
        Save Changes
      </button>
    </form>
  );
}
