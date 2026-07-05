import { auth, signOut } from '@/services/auth';
import { redirect } from 'next/navigation';
import StatsCard from '@/app/components/StatsCard';
import {
  FaCalendarDays,
  FaFolderOpen,
  FaBookOpen,
  FaCircleCheck,
  FaClipboardCheck,
} from 'react-icons/fa6';
import {
  getUserByEmail,
  getUserAssignments,
  getPendingTasks,
  getUserExams,
  getUserSubjects,
} from '@/services/user.service';

export default async function Page() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  const email = session.user?.email;
  const user = email ? await getUserByEmail(email) : null;
  const assignments = user ? await getUserAssignments(user.userId) : [];
  const pendingTasks = user ? await getPendingTasks(user.userId) : [];
  const exams = user ? await getUserExams(user.userId) : [];
  const subjects = user ? await getUserSubjects(user.userId) : [];

  const stats = [
    {
      title: 'Assignments',
      value: assignments.length.toString(),
      subtitle: 'Due this week',
      icon: <FaBookOpen size={24} />,
      color: 'bg-orange-500',
    },
    {
      title: 'Tasks',
      value: pendingTasks.length.toString(),
      subtitle: 'Pending',
      icon: <FaClipboardCheck size={24} />,
      color: 'bg-orange-500',
    },
    {
      title: 'Exams',
      value: exams.length.toString(),
      subtitle: 'Upcoming',
      icon: <FaCalendarDays size={24} />,
      color: 'bg-orange-500',
    },
    {
      title: 'Subjects',
      value: subjects.length.toString(),
      subtitle: 'Current semester',
      icon: <FaFolderOpen size={22} />,
      color: 'bg-orange-500',

    },
  ];

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-6'>
      <div className='w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 text-center'>
        <p className='text-lg font-medium text-zinc-900 dark:text-zinc-50 mb-6'>
          Welcome to your Dashboard,{' '}
          {session.user?.name || session.user?.email || 'User'}!
        </p>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/login' });
          }}
        >
          <button
            type='submit'
            className='w-full rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-500 active:scale-[0.98] transition-all'
          >
            Logout
          </button>
        </form>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl mt-8'>
        
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            subtitle={stat.subtitle}
            color={stat.color}
          />
        ))}

        </div>
    </div>
  );
}
