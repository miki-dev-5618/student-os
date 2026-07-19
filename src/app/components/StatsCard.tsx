import React from 'react';

type StatsCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  color?: string;
};

// Map standard Tailwind colors to our custom Nectar candy colors
const colorMap: Record<string, string> = {
  'bg-indigo-500': 'bg-kiwi text-white',
  'bg-indigo-600': 'bg-kiwi text-white',
  'bg-emerald-500': 'bg-sunset text-zinc-950',
  'bg-emerald-600': 'bg-sunset text-zinc-950',
  'bg-rose-500': 'bg-auburn text-white',
  'bg-rose-600': 'bg-auburn text-white',
  'bg-amber-500': 'bg-crisp-carrot text-white',
  'bg-amber-600': 'bg-crisp-carrot text-white',
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color = 'bg-kiwi text-white',
}: StatsCardProps) {
  const mappedColor = colorMap[color] || color;

  return (
    <div className="rounded-3xl border-2 border-auburn bg-white p-6 shadow-soft hover-lift relative overflow-hidden group">
      {/* Decorative tiny bubble blob background */}
      <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-auburn/5 group-hover:scale-150 transition-transform duration-300 pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-1">
          {title && (
            <h3 className="text-[10px] font-black uppercase tracking-wider text-auburn/60">
              {title}
            </h3>
          )}
          <h2 className="text-4xl font-serif font-black text-auburn leading-none mt-1">
            {value}
          </h2>
          {subtitle && (
            <p className="text-[11px] font-bold text-auburn/70 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`rounded-2xl p-3 ${mappedColor} shadow-sm border-2 border-auburn/10 transform group-hover:rotate-6 transition-transform flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
