import React from 'react';

interface Activity {
  activityId: number;
  userId: number;
  entityType: string;
  entityId: number;
  titleSnapshot: string;
  createdAt: Date | string | number;
  action: string;
}

interface RecentActivityProps {
  recentActivity: Activity[];
}

const actionMeta: Record<string, { label: string; color: string }> = {
  TASK_CREATED: { label: 'Created Task', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
  TASK_COMPLETED: { label: 'Completed Task', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  TASK_REOPENED: { label: 'Reopened Task', color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  TASK_DELETED: { label: 'Deleted Task', color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
  EXAM_CREATED: { label: 'Scheduled Exam', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
  EXAM_COMPLETED: { label: 'Completed Exam', color: 'bg-green-500/10 text-green-600 dark:text-green-400' },
  EXAM_UPDATED: { label: 'Updated Exam', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
  ASSIGNMENT_CREATED: { label: 'Added Assignment', color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400' },
  ASSIGNMENT_COMPLETED: { label: 'Completed Assignment', color: 'bg-teal-500/10 text-teal-600 dark:text-teal-400' },
};

export default function RecentActivity({ recentActivity }: RecentActivityProps) {
  return (
    <section className='rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 p-6 shadow-sm hover:shadow-md transition-shadow duration-300'>
      <h2 className='text-lg font-bold tracking-tight mb-4 flex items-center gap-2'>
        <span className='h-2.5 w-2.5 rounded-full bg-purple-500' />
        Recent Activity
      </h2>
      <div>
        {recentActivity.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-8 text-center text-zinc-400 dark:text-zinc-500 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl'>
            <p className='text-2xl'>✨</p>
            <p className='text-sm mt-1 font-medium'>No recent activities logged yet</p>
          </div>
        ) : (
          <ul className='divide-y divide-zinc-100 dark:divide-zinc-800/60'>
            {recentActivity.map((activity) => {
              const meta = actionMeta[activity.action] || {
                label: activity.action,
                color: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400',
              };
              return (
                <li
                  key={activity.activityId}
                  className='flex flex-col sm:flex-row sm:items-center justify-between py-3.5 gap-2 first:pt-0 last:pb-0'
                >
                  <div className='flex items-center gap-3'>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${meta.color}`}>
                      {meta.label}
                    </span>
                    <span className='text-sm font-semibold text-zinc-800 dark:text-zinc-200'>
                      {activity.titleSnapshot}
                    </span>
                  </div>
                  <span className='text-xs text-zinc-400 dark:text-zinc-500 self-start sm:self-center'>
                    {new Date(activity.createdAt).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
