'use client';
import { useEffect, useState } from 'react';
import { getUserSubjects } from '@/services/subjects.service';
import { requireCurrentUser } from '@/services/user.service';
import {
  createTaskAction,
  updateTaskAction,
} from '@/app/actions/tasks-actions';
import SearchBar from '@/app/components/SearchBar';
import SubjectDropdown from '@/app/components/subjectDropdown';
import EditForm from '@/app/components/UpdateCard';
import DetailsCard from '@/app/components/DetailsCard';

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
    return <div>Loading tasks...</div>;
  }

  if (!data) {
    return <div>Failed to load tasks!</div>;
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
    <div className='p-8 max-w-6xl mx-auto space-y-8 text-neutral-800 dark:text-neutral-100'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-extrabold tracking-tight'>Tasks</h1>
          <p className='text-sm text-neutral-500 mt-1'>
            Track and manage all your academic Tasks.
          </p>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className='self-start sm:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors duration-150 flex items-center gap-2 text-sm'
        >
          Add Task +
        </button>
      </div>

      <div className='w-full max-w-md'>
        <SearchBar />
      </div>

      {formOpen && (
        <div className='bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-md space-y-4'>
          <div className='flex justify-between items-center border-b border-neutral-150 dark:border-neutral-850 pb-3'>
            <h3 className='text-lg font-bold'>New Task</h3>
            <button
              onClick={() => setFormOpen(false)}
              className='text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors text-2xl leading-none'
            >
              &times;
            </button>
          </div>
          <form
            action={createTaskAction}
            className='grid grid-cols-1 md:grid-cols-3 gap-6 items-end'
          >
            <div className='space-y-1.5'>
              <label className='text-xs font-bold uppercase tracking-wider text-neutral-400'>
                Name
              </label>
              <input
                type='text'
                name='taskTitle'
                placeholder='Enter task name'
                required
                className='w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
              <input
                type='text'
                name='taskDescription'
                placeholder='Enter task description'
                required
                className='w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
            </div>
            <div className='space-y-1.5'>
              <label className='text-xs font-bold uppercase tracking-wider text-neutral-400'>
                Subject
              </label>
              <SubjectDropdown subjectsList={subjects}></SubjectDropdown>
            </div>
            <div className='space-y-1.5'>
              <label className='text-xs font-bold uppercase tracking-wider text-neutral-400'>
                Deadline
              </label>
              <input
                type='date'
                name='deadline'
                required
                className='w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
            </div>
            <div className='md:col-span-3 flex justify-end gap-3 pt-3 border-t border-neutral-100 dark:border-neutral-850'>
              <button
                type='button'
                onClick={() => setFormOpen(false)}
                className='px-4 py-2 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-lg text-sm font-medium transition-colors'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm'
              >
                Create task
              </button>
            </div>
          </form>
        </div>
      )}

      <div className='overflow-x-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm'>
        <table className='min-w-full divide-y divide-neutral-200 dark:divide-neutral-850'>
          <thead className='bg-neutral-50 dark:bg-neutral-800/50'>
            <tr>
              <th className='px-6 py-4 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider'>
                Task
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider'>
                Subject
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider'>
                Due Date
              </th>
              <th className='px-6 py-4 text-left text-xs font-bold text-neutral-500 uppercase tracking-wider'>
                Status
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-neutral-150 dark:divide-neutral-850'>
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className='px-6 py-8 text-center text-sm text-neutral-550'
                >
                  No tasks found. Click "Add Task +" to create one.
                </td>
              </tr>
            ) : (
              tasks.map((task: any) => (
                <tr
                  key={task.taskId}
                  className='cursor-pointer hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors'
                  onClick={() => {
                    setSelectedTask(task);
                    setSelectedStatus({ name: task.status || 'To Do' });
                  }}
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold'>
                    {task.title}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-neutral-500'>
                    {task.subjectName}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-neutral-550'>
                    {new Date(task.deadline).toLocaleDateString()}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${task.status === 'Completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300'
                        }`}
                    >
                      {task.status || 'To Do'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {selectedTask && (
          <DetailsCard
            title={selectedTask.title}
            fields={[
              { label: 'Subject', value: selectedTask.subjectName },
              { label: 'Deadline', value: formattedDeadline },
              { label: 'Description', value: selectedTask.description },
              { label: 'Status', value: selectedTask.status || 'To Do' },
            ]}
            editForm={
              <EditForm
                formAction={updateTaskAction.bind(null, selectedTask.taskId)}
              >
                <input name='taskTitle' defaultValue={selectedTask.title} />
                <input
                  name='taskDescription'
                  defaultValue={selectedTask.description}
                />
                <input
                  type='date'
                  name='deadline'
                  defaultValue={formattedDeadline}
                />
                <div className='relative w-full'>
                  <input
                    type='text'
                    onClick={() => setStatusDropdown(true)}
                    name='status'
                    value={selectedStatus?.name || 'To Do'}
                    readOnly
                    className='cursor-pointer w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                  />
                  {statusDropdown && (
                    <div className='absolute z-10 w-full mt-1 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                      {statusList.map((status: any) => (
                        <div
                          key={status.name}
                          onClick={() => handleSelectStatus(status)}
                          className='cursor-pointer px-4 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors first:rounded-t-lg last:rounded-b-lg'
                        >
                          <p className='font-medium text-sm text-neutral-900 dark:text-neutral-50'>
                            {status.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <SubjectDropdown
                  subjectsList={subjects}
                  defaultSubjectId={selectedTask.subjectId}
                />
              </EditForm>
            }
          />
        )}
      </div>
    </div>
  );
}
