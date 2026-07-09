import { FaCircleCheck } from 'react-icons/fa6';

interface Task {
  taskId: number;
  title: string;
  deadline: Date | string;
  status: string;
  subjectName?: string;
  [key: string]: any;
}

interface TodayTasksCardProps {
  todayTasks: any[];
}

export default function TodayTasksCard({ todayTasks }: TodayTasksCardProps) {
  return (
    <>
      <section className='rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>
        <div className='flex items-center justify-between pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800'>
          <div className='flex items-center gap-2'>
            <div className='p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg'>
              <FaCircleCheck size={18} />
            </div>
            <h2 className='text-lg font-bold tracking-tight'>Today's Tasks</h2>
          </div>
          <span className='rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-zinc-600 dark:text-zinc-400'>
            {todayTasks.length} pending
          </span>
        </div>
        <div className='space-y-3'>
          {todayTasks.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-6 text-center text-zinc-400 dark:text-zinc-500'>
              <p className='text-2xl'>🎉</p>
              <p className='text-sm mt-1 font-medium'>
                No Tasks Pending for Today
              </p>
            </div>
          ) : (
            <ul className='space-y-2.5'>
              {todayTasks.map((task) => (
                <li
                  key={task.taskId}
                  className='flex items-center gap-3 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-850/60 transition-colors'
                >
                  <div className='h-2 w-2 rounded-full bg-emerald-500' />
                  <span className='text-sm font-medium text-zinc-700 dark:text-zinc-300'>
                    {task.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

