type SubjectCardProps = {
  name: string;
  assignment: string | number;
  task: string | number;
  exam: string | number;
};

export default function SubjectCard({
  name,
  assignment,
  task,
  exam,
}: SubjectCardProps) {
  return (
    <div>
      <h1 className='capitalize text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50'>
        {name}
      </h1>
      <ul>{task} Tasks</ul> <ul>{exam} Exams</ul>{' '}
      <ul>{assignment} Assignments</ul>
      <div></div>
    </div>
  );
}
