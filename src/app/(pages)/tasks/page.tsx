'use client';

import { useEffect, useState } from 'react';
import { getUserSubjects } from '@/services/subjects.service';
import { requireCurrentUser } from '@/services/user.service';
import {
  createTaskAction,
  updateTaskAction,
  deleteTaskAction,
} from '@/app/actions/tasks-actions';
import SearchBar from '@/app/components/SearchBar';
import SubjectDropdown from '@/app/components/subjectDropdown';
import EditForm from '@/app/components/UpdateCard';
import DetailsCard from '@/app/components/DetailsCard';
import { LuPlus, LuCircleCheck } from 'react-icons/lu';

const DB_TO_UI: Record<string, string> = {
  'TODO': 'To Do',
  'IN_PROGRESS': 'In Progress',
  'DONE': 'Completed'
};

export default function Page() {
  const [data, setData] = useState<{
    tasks: any[];
    subjects: any[];
  } | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch tasks');
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setData(null);
        setLoading(false);
      });
  }, []);

  const { tasks = [], subjects = [] } = data || {};

  const formattedDeadline = selectedTask?.deadline
    ? (() => {
      const d = new Date(selectedTask.deadline);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    })()
    : '';

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-app text-forest-green dark:text-cream">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-kiwi border-t-transparent" />
          <span className="text-sm font-bold">Loading tasks...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-app text-tomato-burst font-bold">
        Failed to load tasks!
      </div>
    );
  }

  const handleSelectStatus = (status: any) => {
    setSelectedStatus(status);
    setStatusDropdown(false);
  };

  const statusList = [
    { name: 'To Do' },
    { name: 'In Progress' },
    { name: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-app grid-bg py-10 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8 text-neutral-800 dark:text-neutral-100">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-forest-green dark:text-cream">Tasks</h1>
              <span className="bg-kiwi/15 text-kiwi font-bold text-xs px-2.5 py-1 rounded-full border border-kiwi/20">
                {tasks.length}
              </span>
            </div>
            <p className="text-xs font-semibold text-zinc-550 dark:text-zinc-400 mt-1">
              Track and manage all your academic Tasks.
            </p>
          </div>
          <button
            onClick={() => setFormOpen(true)}
            className="self-start sm:self-auto px-5 py-2.5 bg-kiwi hover:bg-kiwi/95 text-zinc-950 rounded-full font-extrabold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 text-xs border border-forest-green/10"
          >
            <LuPlus size={16} />
            <span>Add Task</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-md">
          <SearchBar />
        </div>

        {/* Form to Add Task */}
        {formOpen && (
          <div className="bg-white dark:bg-zinc-900/60 border-2 border-forest-green/10 dark:border-kiwi/15 p-6 rounded-3xl shadow-soft space-y-5 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-forest-green/5 dark:border-zinc-800 pb-3">
              <h3 className="text-lg font-black text-forest-green dark:text-cream">New Task</h3>
              <button
                onClick={() => setFormOpen(false)}
                className="text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 transition-colors text-2xl leading-none"
              >
                &times;
              </button>
            </div>
            <form
              action={createTaskAction}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end"
            >
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500">
                  Name
                </label>
                <input
                  type="text"
                  name="taskTitle"
                  placeholder="Enter task name"
                  required
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500">
                  Description
                </label>
                <input
                  type="text"
                  name="taskDescription"
                  placeholder="Enter task description"
                  required
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all font-semibold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500">
                  Subject
                </label>
                <SubjectDropdown subjectsList={subjects}></SubjectDropdown>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-450 dark:text-zinc-500">
                  Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  required
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-kiwi focus:border-transparent transition-all font-semibold text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="md:col-span-3 flex justify-end gap-3 pt-4 border-t border-forest-green/5 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-5 py-2.5 border-2 border-forest-green/10 dark:border-zinc-700/60 hover:bg-cream/10 dark:hover:bg-zinc-800 rounded-full text-xs font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-kiwi hover:bg-kiwi/95 text-zinc-950 rounded-full text-xs font-extrabold transition-all shadow-sm"
                >
                  Create task
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Card-Style Tables List */}
        <div className="space-y-3">
          {/* Card Table Header (Desktop only) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-555">
            <div className="col-span-5">Task</div>
            <div className="col-span-3">Subject</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-2">Status</div>
          </div>

          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center bg-white dark:bg-zinc-900/60 border-2 border-dashed border-forest-green/10 dark:border-zinc-800 rounded-3xl">
              <LuCircleCheck size={36} className="text-zinc-300 dark:text-zinc-600 mb-2" />
              <p className="text-sm font-bold text-zinc-800 dark:text-zinc-300">No tasks found</p>
              <p className="text-xs text-zinc-550 dark:text-zinc-500 mt-0.5">Click "Add Task" to create one.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task: any) => (
                <div
                  key={task.taskId}
                  onClick={() => {
                    setSelectedTask(task);
                    setSelectedStatus({ name: DB_TO_UI[task.status] || task.status || 'To Do' });
                  }}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-4 rounded-2xl border-2 transition-all cursor-pointer shadow-soft hover-lift ${
                    selectedTask?.taskId === task.taskId
                      ? 'border-kiwi bg-kiwi/5'
                      : 'border-forest-green/5 dark:border-zinc-850 bg-white dark:bg-zinc-900/60 hover:bg-cream/10 dark:hover:bg-zinc-850/60'
                  }`}
                >
                  <div className="col-span-1 md:col-span-5 flex flex-col">
                    <span className="font-extrabold text-sm text-forest-green dark:text-cream">{task.title}</span>
                    {task.description && (
                      <span className="text-xs text-zinc-500 dark:text-zinc-450 line-clamp-1 mt-0.5">
                        {task.description}
                      </span>
                    )}
                  </div>
                  <div className="col-span-1 md:col-span-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-sunshine/10 text-sunshine border border-sunshine/20">
                      {task.subjectName || 'General'}
                    </span>
                  </div>
                  <div className="col-span-1 md:col-span-2 text-xs font-bold text-zinc-500 dark:text-zinc-400">
                    {new Date(task.deadline).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold ${
                        (task.status === 'Completed' || task.status === 'DONE')
                          ? 'bg-kiwi/15 text-kiwi border border-kiwi/20'
                          : 'bg-sunshine/15 text-sunshine border border-sunshine/20'
                      }`}
                    >
                      {DB_TO_UI[task.status] || task.status || 'To Do'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Task Details Drawer/Card */}
        {selectedTask && (
          <div className="pt-6 border-t-2 border-dashed border-forest-green/10 dark:border-zinc-800 animate-fadeIn">
            <DetailsCard
              title={selectedTask.title}
              deleteAction={deleteTaskAction.bind(null, selectedTask.taskId)}
              fields={[
                { label: 'Subject', value: selectedTask.subjectName || 'General' },
                { label: 'Deadline', value: new Date(selectedTask.deadline).toLocaleDateString() },
                { label: 'Description', value: selectedTask.description || 'No description provided.' },
                { label: 'Status', value: DB_TO_UI[selectedTask.status] || selectedTask.status || 'To Do' },
              ]}
              editForm={
                <EditForm
                  formAction={updateTaskAction.bind(null, selectedTask.taskId)}
                >
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Task Title</label>
                    <input
                      name="taskTitle"
                      defaultValue={selectedTask.title}
                      className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Description</label>
                    <input
                      name="taskDescription"
                      defaultValue={selectedTask.description}
                      className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Deadline</label>
                    <input
                      type="date"
                      name="deadline"
                      defaultValue={formattedDeadline}
                      className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                    />
                  </div>
                  <div className="space-y-1 relative w-full">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Status</label>
                    <input
                      type="text"
                      onClick={() => setStatusDropdown(true)}
                      name="status"
                      value={selectedStatus?.name || 'To Do'}
                      readOnly
                      className="cursor-pointer w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/40 border-2 border-forest-green/10 dark:border-zinc-800 rounded-xl text-sm font-semibold text-zinc-900 dark:text-zinc-100"
                    />
                    {statusDropdown && (
                      <div className="absolute z-10 w-full mt-1.5 bg-white dark:bg-zinc-800 border-2 border-forest-green/10 dark:border-zinc-700 rounded-xl shadow-lg max-h-60 overflow-y-auto p-1.5">
                        {statusList.map((status: any) => (
                          <div
                            key={status.name}
                            onClick={() => handleSelectStatus(status)}
                            className="cursor-pointer px-4 py-2 hover:bg-kiwi/15 dark:hover:bg-kiwi/20 rounded-lg transition-colors"
                          >
                            <p className="font-bold text-xs text-zinc-900 dark:text-zinc-50 py-1">
                              {status.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Subject</label>
                    <SubjectDropdown
                      subjectsList={subjects}
                      defaultSubjectId={selectedTask.subjectId}
                    />
                  </div>
                </EditForm>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
