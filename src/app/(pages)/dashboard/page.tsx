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
import { Sparkle, Star, Smiley } from '@/app/components/Doodle';
import { LuCalendarDays, LuBookOpen } from 'react-icons/lu';

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
      color: 'bg-indigo-500',
    },
    {
      title: 'Tasks',
      value: pendingTasks.length.toString(),
      subtitle: 'Pending action',
      icon: <FaClipboardCheck size={20} />,
      color: 'bg-emerald-500',
    },
    {
      title: 'Exams',
      value: exams.length.toString(),
      subtitle: 'Upcoming scheduled',
      icon: <FaCalendarDays size={20} />,
      color: 'bg-rose-500',
    },
    {
      title: 'Subjects',
      value: subjects.length.toString(),
      subtitle: 'Active course load',
      icon: <FaFolderOpen size={18} />,
      color: 'bg-amber-500',
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-app grid-bg text-auburn transition-all duration-200">
        <main className="mx-auto max-w-6xl px-6 py-10 space-y-8">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-8 rounded-3xl border-2 border-auburn bg-white shadow-soft relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-auburn/5 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-4 right-12 text-sunset animate-pulse pointer-events-none">
              <Star size={42} />
            </div>
            
            <div className="space-y-2 relative z-10">
              <h1 className="text-3xl sm:text-4xl font-serif font-black text-auburn leading-none">
                👋 {getGreeting()}, {session.user?.name || 'User'}!
              </h1>
              <p className="text-sm font-bold text-auburn/70">
                You have{' '}
                <span className="font-bold text-auburn underline decoration-wavy decoration-2">
                  {assignments.length} assignments
                </span>{' '}
                due this week and{' '}
                <span className="font-bold text-burnt-sienna underline decoration-wavy decoration-2">
                  {exams.length} upcoming exams
                </span>
                . Let's study smart today!
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              <TodayTasksCard todayTasks={todayTasks} />

              {/* Recommended Tasks */}
              <section className="rounded-3xl border-2 border-auburn bg-white p-6 shadow-soft hover-lift">
                <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-auburn/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-nectar-pink/40 text-auburn rounded-xl border border-auburn/20">
                      <LuBookOpen size={20} />
                    </div>
                    <h2 className="text-xl font-serif font-black tracking-tight text-auburn">
                      Recommended Tasks
                    </h2>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {pendingTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-auburn/40">
                      <Smiley size={36} className="text-auburn/50 mb-2" />
                      <p className="text-sm font-bold">No pending tasks!</p>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {pendingTasks.slice(0, 4).map((task) => (
                        <li
                          key={task.taskId}
                          className="flex items-center justify-between p-4 rounded-2xl border-2 border-auburn/10 bg-nectar-cream/30 hover:bg-nectar-pink/20 transition-all"
                        >
                          <span className="text-sm font-bold text-auburn truncate mr-2">
                            {task.title}
                          </span>
                          {task.subjectName && (
                            <span className="rounded-full bg-sunset text-zinc-950 px-3 py-1 text-xs font-bold border border-auburn/20">
                              {task.subjectName}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {pendingTasks.length > 4 && (
                    <p className="text-center pt-3 border-t-2 border-auburn/10">
                      <a
                        href="/tasks"
                        className="text-xs font-extrabold text-auburn hover:underline transition-all"
                      >
                        +{pendingTasks.length - 4} more tasks...
                      </a>
                    </p>
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-8">
              {/* Upcoming Exams */}
              <section className="rounded-3xl border-2 border-auburn bg-white p-6 shadow-soft hover-lift relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-auburn/10">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-nectar-pink/40 text-auburn rounded-xl border border-auburn/20">
                      <LuCalendarDays size={20} />
                    </div>
                    <h2 className="text-xl font-serif font-black tracking-tight text-auburn">
                      Upcoming Exams
                    </h2>
                  </div>
                </div>
                <div>
                  {todayExams.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center relative text-auburn/60">
                      <span className="text-3xl animate-bounce">🎉</span>
                      <p className="text-sm font-serif font-black mt-2 text-auburn">
                        No Exams Scheduled
                      </p>
                      <p className="text-xs font-semibold text-auburn/80 mt-0.5">Keep up the great study pace!</p>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {todayExams.map((exam) => (
                        <li
                          key={exam.examId}
                          className="flex flex-col gap-1 p-4 rounded-2xl border-2 border-auburn/10 bg-nectar-cream/30 hover:bg-nectar-pink/20 transition-all"
                        >
                          <span className="text-sm font-bold text-auburn">
                            {exam.subjectName}
                          </span>
                          <span className="text-xs font-bold text-auburn/70">
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

              {/* Calendar Widget */}
              <section className="rounded-3xl border-2 border-auburn bg-white p-6 shadow-soft hover-lift">
                <h2 className="text-xl font-serif font-black tracking-tight mb-4 flex items-center gap-2.5 text-auburn">
                  <span className="h-3 w-3 rounded-full bg-auburn border-2 border-white animate-pulse" />
                  Calendar
                </h2>
                <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-auburn/10 p-2">
                  <CalendarCard />
                </div>
              </section>

              {/* Study Hours Widget */}
              <section className="rounded-3xl border-2 border-auburn bg-white p-6 shadow-soft hover-lift">
                <h2 className="text-xl font-serif font-black tracking-tight mb-4 flex items-center gap-2.5 text-auburn">
                  <span className="h-3 w-3 rounded-full bg-sunset border-2 border-white animate-pulse" />
                  Study Tracker
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <StudyProgressCard />
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
