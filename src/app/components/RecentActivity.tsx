import React from 'react';
import { LuActivity } from 'react-icons/lu';

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
  TASK_CREATED: { label: 'Created Task', color: 'bg-nectar-pink/40 text-auburn border border-auburn/20' },
  TASK_COMPLETED: { label: 'Completed Task', color: 'bg-nectar-pink text-auburn border border-auburn/30 font-black' },
  TASK_REOPENED: { label: 'Reopened Task', color: 'bg-sunset text-zinc-950 border border-auburn/20' },
  TASK_DELETED: { label: 'Deleted Task', color: 'bg-auburn/10 text-auburn border border-auburn/20' },
  EXAM_CREATED: { label: 'Scheduled Exam', color: 'bg-crisp-carrot/20 text-auburn border border-auburn/20' },
  EXAM_COMPLETED: { label: 'Completed Exam', color: 'bg-nectar-pink text-auburn border border-auburn/30 font-black' },
  EXAM_UPDATED: { label: 'Updated Exam', color: 'bg-sunset text-zinc-950 border border-auburn/20' },
  ASSIGNMENT_CREATED: { label: 'Added Assignment', color: 'bg-crisp-carrot/20 text-auburn border border-auburn/20' },
  ASSIGNMENT_COMPLETED: { label: 'Completed Assignment', color: 'bg-nectar-pink text-auburn border border-auburn/30 font-black' },
};

export default function RecentActivity({ recentActivity }: RecentActivityProps) {
  return (
    <section className="rounded-3xl border-2 border-auburn bg-white p-6 shadow-soft hover-lift">
      <h2 className="text-xl font-serif font-black tracking-tight mb-5 flex items-center gap-2.5 text-auburn">
        <div className="p-2.5 bg-nectar-pink/40 text-auburn rounded-xl border border-auburn/20">
          <LuActivity size={20} />
        </div>
        Recent Activity
      </h2>
      <div>
        {recentActivity.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-auburn/20 rounded-2xl bg-nectar-cream/20">
            <div className="text-3xl animate-bounce">✨</div>
            <p className="text-sm font-serif font-black mt-2 text-auburn">No recent activities logged yet</p>
            <p className="text-xs font-semibold text-auburn/70 mt-0.5">Your study timeline will appear here!</p>
          </div>
        ) : (
          <ul className="divide-y-2 divide-auburn/10">
            {recentActivity.map((activity) => {
              const meta = actionMeta[activity.action] || {
                label: activity.action,
                color: 'bg-nectar-cream text-auburn border border-auburn/20',
              };
              return (
                <li
                  key={activity.activityId}
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-3 first:pt-0 last:pb-0 group"
                >
                  <div className="flex items-center gap-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide ${meta.color}`}>
                      {meta.label}
                    </span>
                    <span className="text-sm font-bold text-auburn group-hover:translate-x-0.5 transition-transform">
                      {activity.titleSnapshot}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-auburn/50 self-end sm:self-auto">
                    {new Date(activity.createdAt).toLocaleTimeString(undefined, {
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
