import React from 'react';

type StatsCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color?: string;
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color = 'bg-red-500',
}: StatsCardProps) {
  return (
    <div className='rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all hover:shadow-md'>
      <div className='flex items-start justify-between'>
        <div className='space-y-1.5'>
          {title && (
            <h3 className='text-sm font-medium text-zinc-500 dark:text-zinc-400'>
              {title}
            </h3>
          )}
          <h2 className='text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50'>
            {value}
          </h2>
          {subtitle && (
            <p className='text-xs text-zinc-500 dark:text-zinc-400'>
              {subtitle}
            </p>
          )}
        </div>
        <div className={`rounded-xl p-3 text-white ${color} shadow-sm`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
