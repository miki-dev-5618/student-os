import { auth, signOut } from '@/services/auth';
import {
  FaCalendarDays,
  FaFolderOpen,
  FaBookOpen,
  FaCircleCheck,
  FaClipboardCheck,
} from 'react-icons/fa6';
import {
  getUserByEmail,
  getPendingTasks,
  getUserExams,
  getRecentActivity,
} from '@/services/user.service';
import { redirect } from 'next/navigation';
import { getUserSubjects } from '@/services/subjects.service';
import { getUserAssignments } from '@/services/assignments.service';
import { getGreeting } from '@/services/greeting';
import StatsCard from '@/app/components/StatsCard';
import RecentActivity from '@/app/components/RecentActivity';
import CalendarCard from '@/app/components/CalendarCard';
import StudyProgressCard from '@/app/components/StudyProgressCard';
import TodayTasksCard from '@/app/components/TodayTasksCard';

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
  const recentActivity = user ? await getRecentActivity(user.userId) : [];
  const todayTasks = pendingTasks.filter(
    (task) =>
      new Date(task.deadline).toDateString() === new Date().toDateString(),
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to the start of the day
  const todayExams = exams.filter((exam) => {
    const examDate = new Date(exam.examDate);
    examDate.setHours(0, 0, 0, 0); // Set to the start of the day
    return examDate >= today;
  });

  const stats = [
    {
      title: 'Assignments',
      value: assignments.length.toString(),
      subtitle: 'Due this week',
      icon: <FaBookOpen size={20} />,
      color: 'bg-indigo-500 dark:bg-indigo-600',
    },
    {
      title: 'Tasks',
      value: pendingTasks.length.toString(),
      subtitle: 'Pending action',
      icon: <FaClipboardCheck size={20} />,
      color: 'bg-emerald-500 dark:bg-emerald-600',
    },
    {
      title: 'Exams',
      value: exams.length.toString(),
      subtitle: 'Upcoming scheduled',
      icon: <FaCalendarDays size={20} />,
      color: 'bg-rose-500 dark:bg-rose-600',
    },
    {
      title: 'Subjects',
      value: subjects.length.toString(),
      subtitle: 'Active course load',
      icon: <FaFolderOpen size={18} />,
      color: 'bg-amber-500 dark:bg-amber-600',
    },
  ];


  return (
    <>
      <div className='min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200'>
        <main className='mx-auto max-w-6xl px-6 py-8 space-y-8'>
          {/* Welcome Section */}
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 shadow-sm relative overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-transparent pointer-events-none' />
            <div className='space-y-1.5 relative z-10'>
              <h1 className='text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-white dark:to-zinc-300 bg-clip-text text-transparent'>
                👋 {getGreeting()}, {session.user?.name || 'User'}!
              </h1>
              <p className='text-sm text-zinc-500 dark:text-zinc-450'>
                You have{' '}
                <span className='font-semibold text-indigo-600 dark:text-indigo-400'>
                  {assignments.length} assignments
                </span>{' '}
                due this week and{' '}
                <span className='font-semibold text-rose-600 dark:text-rose-400'>
                  {exams.length} upcoming exams
                </span>
                .
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
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
          </section>

          {/* Two Column Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Main Content Column */}
            <div className='lg:col-span-2 space-y-6'>
              <TodayTasksCard todayTasks={todayTasks} />

              {/* Recommended Tasks */}
              <section className='rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>
                <div className='flex items-center justify-between pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800'>
                  <div className='flex items-center gap-2'>
                    <div className='p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg'>
                      <FaClipboardCheck size={18} />
                    </div>
                    <h2 className='text-lg font-bold tracking-tight'>
                      Recommended Tasks
                    </h2>
                  </div>
                </div>
                <div className='space-y-4'>
                  <ul className='space-y-2.5'>
                    {pendingTasks.slice(0, 4).map((task) => (
                      <li
                        key={task.taskId}
                        className='flex items-center justify-between p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-850/60 transition-colors'
                      >
                        <span className='text-sm font-semibold text-zinc-800 dark:text-zinc-200'>
                          {task.title}
                        </span>
                        <span className='rounded-lg bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:text-zinc-450'>
                          {task.subjectName}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {pendingTasks.length > 4 && (
                    <p className='text-center pt-2'>
                      <a
                        href='/tasks'
                        className='text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline'
                      >
                        +{pendingTasks.length - 4} more tasks...
                      </a>
                    </p>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar Column */}
            <div className='space-y-6'>
              {/* Upcoming Exams */}
              <section className='rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>
                <div className='flex items-center justify-between pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800'>
                  <div className='flex items-center gap-2'>
                    <div className='p-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg'>
                      <FaCalendarDays size={18} />
                    </div>
                    <h2 className='text-lg font-bold tracking-tight'>
                      Upcoming Exams
                    </h2>
                  </div>
                </div>
                <div>
                  {todayExams.length === 0 ? (
                    <div className='flex flex-col items-center justify-center py-6 text-center text-zinc-400 dark:text-zinc-500'>
                      <p className='text-2xl'>🎉</p>
                      <p className='text-sm mt-1 font-medium'>
                        No Exams Scheduled
                      </p>
                    </div>
                  ) : (
                    <ul className='space-y-2.5'>
                      {todayExams.map((exam) => (
                        <li
                          key={exam.examId}
                          className='flex flex-col gap-1.5 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-850/60 transition-colors'
                        >
                          <span className='text-sm font-bold text-zinc-800 dark:text-zinc-200'>
                            {exam.subjectName}
                          </span>
                          <span className='text-xs text-zinc-500 dark:text-zinc-450'>
                            {new Date(exam.examDate).toLocaleDateString(
                              undefined,
                              {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              },
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>

              {/* Calendar Placeholder */}
              <section className='rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>
                <h2 className='text-lg font-bold tracking-tight mb-4 flex items-center gap-2'>
                  <span className='h-2.5 w-2.5 rounded-full bg-blue-500' />
                  Calendar
                </h2>
                <div className='flex h-32 items-center justify-center rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500'>
                  <CalendarCard></CalendarCard>
                </div>
              </section>

              {/* Study Hours Widget */}
              <section className='rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>
                <h2 className='text-lg font-bold tracking-tight mb-4 flex items-center gap-2'>
                  <span className='h-2.5 w-2.5 rounded-full bg-amber-500' />
                  Study Tracker
                </h2>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center text-sm font-medium'>
                    <StudyProgressCard></StudyProgressCard>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Recent Activity */}
          <RecentActivity recentActivity={recentActivity as any} />
        </main>
      </div>
    </>
  );
}
