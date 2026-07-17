'use client';
import { useEffect, useState } from 'react';
import { getUserSubjects } from '@/services/subjects.service';
import { requireCurrentUser } from '@/services/user.service';
import { createAssignmentAction, updateAssignmentAction } from '@/app/actions/assignments-actions';
import SearchBar from '@/app/components/SearchBar';
import SubjectDropdown from '@/app/components/subjectDropdown';
import DetailsCard from '@/app/components/DetailsCard';
import EditForm from '@/app/components/UpdateCard';

const DB_TO_UI: Record<string, string> = {
  'TODO': 'Pending',
  'IN_PROGRESS': 'In Progress',
  'DONE': 'Completed'
};

export default function Page() {
  const [data, setData] = useState<{
    assignments: any[];
    subjects: any[];
  } | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(
    null,
  );
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/assignments')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const { subjects = [], assignments = [] } = data || {};

  const formattedDeadline = selectedAssignment?.deadline
    ? (() => {
        const d = new Date(selectedAssignment.deadline);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      })()
    : '';

  const handleSelectStatus = (status: any) => {
    setSelectedStatus(status);
    setStatusDropdown(false);
  };

  const statusList = [
    { name: 'Pending' },
    { name: 'Completed' },
  ];

  if (loading) {
    return <div>Loading assignments...</div>;
  }

  if (!data) {
    return <div>Failed to load assignments!</div>;
  }

  return (
    <div className='p-8 max-w-6xl mx-auto space-y-8 text-neutral-800 dark:text-neutral-100'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-extrabold tracking-tight'>
            Assignments
          </h1>
          <p className='text-sm text-neutral-500 mt-1'>
            Track and manage all your academic assignments.
          </p>
        </div>
        <button
          onClick={() => setFormOpen(true)}
          className='self-start sm:self-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-sm transition-colors duration-150 flex items-center gap-2 text-sm'
        >
          Add Assignment +
        </button>
      </div>

      <div className='w-full max-w-md'>
        <SearchBar />
      </div>

      {formOpen && (
        <div className='bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl shadow-md space-y-4'>
          <div className='flex justify-between items-center border-b border-neutral-150 dark:border-neutral-850 pb-3'>
            <h3 className='text-lg font-bold'>New Assignment</h3>
            <button
              onClick={() => setFormOpen(false)}
              className='text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors text-2xl leading-none'
            >
              &times;
            </button>
          </div>
          <form
            action={createAssignmentAction}
            className='grid grid-cols-1 md:grid-cols-3 gap-6 items-end'
          >
            <div className='space-y-1.5'>
              <label className='text-xs font-bold uppercase tracking-wider text-neutral-400'>
                Name
              </label>
              <input
                type='text'
                name='assignmentName'
                placeholder='Enter assignment name'
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
                Create Assignment
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
                Assignment
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
            {assignments.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className='px-6 py-8 text-center text-sm text-neutral-550'
                >
                  No assignments found. Click "Add Assignment +" to create one.
                </td>
              </tr>
            ) : (
              assignments.map((assignment: any) => (
                <tr
                  onClick={() => {
                    setSelectedAssignment(assignment);
                    setSelectedStatus({ name: DB_TO_UI[assignment.status] || assignment.status || 'Pending' });
                  }}
                  key={assignment.assignmentId}
                  className='cursor-pointer hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors'
                >
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-semibold'>
                    {assignment.name}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-neutral-550'>
                    {assignment.subjectName}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-neutral-550'>
                    {new Date(assignment.deadline).toLocaleDateString()}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        (assignment.status === 'Completed' || assignment.status === 'DONE')
                          ? 'bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-300'
                      }`}
                    >
                      {DB_TO_UI[assignment.status] || assignment.status || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedAssignment && (
        <DetailsCard
          title={selectedAssignment.name}
          fields={[
            { label: 'Subject', value: selectedAssignment.subjectName },
            { label: 'Deadline', value: formattedDeadline },
            { label: 'Status', value: DB_TO_UI[selectedAssignment.status] || selectedAssignment.status || 'Pending' },
          ]}
          editForm={
            <EditForm
              formAction={updateAssignmentAction.bind(null, selectedAssignment.assignmentId)}
            >
              <input
                name='assignmentName'
                defaultValue={selectedAssignment.name}
                className='w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
              <input
                type='date'
                name='deadline'
                defaultValue={formattedDeadline}
                className='w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              />
              <div className='relative w-full'>
                <input
                  type='text'
                  onClick={() => setStatusDropdown(true)}
                  name='status'
                  value={selectedStatus?.name || 'Pending'}
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
                defaultSubjectId={selectedAssignment.subjectId}
              />
            </EditForm>
          }
        />
      )}
    </div>
  );
}
