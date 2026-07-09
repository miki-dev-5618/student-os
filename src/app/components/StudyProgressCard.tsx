export default function StudyProgressCard() {
  return (
    <div>
      {' '}
      <h1> study progress card desu</h1>
      <span className='text-zinc-500 dark:text-zinc-450'>Weekly Goal</span>
      <span className='text-zinc-800 dark:text-zinc-200'>
        12 / 20 hours
      </span>{' '}
      <div className='w-full bg-zinc-100 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden'>
        <div className='bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full w-[60%]' />
      </div>
    </div>
  );
}
