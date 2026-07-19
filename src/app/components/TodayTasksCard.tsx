import { LuCircleCheck, LuClock } from 'react-icons/lu';
import { Smiley, Sparkle } from './Doodle';

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
    <section className="rounded-3xl border-2 border-auburn bg-white p-6 shadow-soft hover-lift">
      <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-auburn/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 bg-nectar-pink/40 text-auburn rounded-xl border border-auburn/20">
            <LuCircleCheck size={20} />
          </div>
          <h2 className="text-xl font-serif font-black tracking-tight text-auburn">Today's Tasks</h2>
        </div>
        <span className="rounded-full bg-sunset text-zinc-950 px-3 py-1 text-xs font-bold border border-auburn/20">
          {todayTasks.length} pending
        </span>
      </div>

      <div className="space-y-3">
        {todayTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center relative overflow-hidden">
            <div className="absolute top-2 right-12 animate-bounce">
              <Sparkle size={18} className="text-auburn" />
            </div>
            {/* Playful doodle face illustration */}
            <div className="w-24 h-24 mb-4 text-auburn flex items-center justify-center bg-nectar-pink/20 rounded-full border-2 border-dashed border-auburn/30 relative">
              <Smiley size={42} className="text-auburn" />
            </div>
            <p className="text-base font-serif font-black text-auburn">
              All clear for today!
            </p>
            <p className="text-xs text-auburn/70 mt-1 max-w-[200px] leading-relaxed font-semibold">
              No tasks due today. Grab a cup of coffee and relax!
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {todayTasks.map((task) => (
              <li
                key={task.taskId}
                className="flex items-center gap-3.5 p-4 rounded-2xl border-2 border-auburn/10 bg-nectar-cream/30 hover:bg-nectar-pink/20 transition-all group"
              >
                <div className="h-6 w-6 rounded-full border-2 border-dashed border-auburn/50 flex items-center justify-center text-auburn group-hover:bg-auburn group-hover:text-white group-hover:border-transparent transition-all duration-200">
                  <LuClock size={12} className="group-hover:hidden" />
                  <LuCircleCheck size={12} className="hidden group-hover:block" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold text-auburn truncate block">
                    {task.title}
                  </span>
                  {task.subjectName && (
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-auburn/60 mt-0.5 block">
                      {task.subjectName}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
