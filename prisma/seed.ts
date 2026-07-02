import { PrismaClient, TaskStatus } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const usersData = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'hashed_password_123',
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'hashed_password_456',
    },
  ];

  for (const userData of usersData) {
    const user = await prisma.user.create({ data: userData });

    // 5 Subjects
    const [math, physics, chemistry, biology, cs] = await Promise.all([
      prisma.subject.create({
        data: { name: 'Mathematics', userId: user.userId },
      }),
      prisma.subject.create({ data: { name: 'Physics', userId: user.userId } }),
      prisma.subject.create({
        data: { name: 'Chemistry', userId: user.userId },
      }),
      prisma.subject.create({ data: { name: 'Biology', userId: user.userId } }),
      prisma.subject.create({
        data: { name: 'Computer Science', userId: user.userId },
      }),
    ]);

    // 6 Assignments
    await prisma.assignment.createMany({
      data: [
        {
          name: 'Calculus Homework',
          deadline: new Date('2026-08-01'),
          subjectId: math.subjectId,
        },
        {
          name: 'Algebra Problem Set',
          deadline: new Date('2026-08-05'),
          subjectId: math.subjectId,
        },
        {
          name: 'Mechanics Lab',
          deadline: new Date('2026-08-10'),
          subjectId: physics.subjectId,
        },
        {
          name: 'Titration Report',
          deadline: new Date('2026-08-12'),
          subjectId: chemistry.subjectId,
        },
        {
          name: 'Cell Structure Essay',
          deadline: new Date('2026-08-15'),
          subjectId: biology.subjectId,
        },
        {
          name: 'Sorting Algorithms Project',
          deadline: new Date('2026-08-18'),
          subjectId: cs.subjectId,
        },
      ],
    });

    // 7 Tasks (one with no subject, like the original)
    await prisma.task.createMany({
      data: [
        {
          title: 'Read Chapter 1',
          description: 'Study limits',
          deadline: new Date('2026-07-20'),
          status: TaskStatus.TODO,
          subjectId: math.subjectId,
        },
        {
          title: 'Solve practice questions',
          description: "Newton's Laws",
          deadline: new Date('2026-07-25'),
          status: TaskStatus.IN_PROGRESS,
          subjectId: physics.subjectId,
        },
        {
          title: 'Balance chemical equations',
          description: 'Practice stoichiometry',
          deadline: new Date('2026-07-22'),
          status: TaskStatus.TODO,
          subjectId: chemistry.subjectId,
        },
        {
          title: 'Label cell diagram',
          description: 'Mitochondria and nucleus',
          deadline: new Date('2026-07-24'),
          status: TaskStatus.IN_PROGRESS,
          subjectId: biology.subjectId,
        },
        {
          title: 'Implement binary search',
          description: 'Practice recursion',
          deadline: new Date('2026-07-27'),
          status: TaskStatus.TODO,
          subjectId: cs.subjectId,
        },
        {
          title: 'Review derivatives',
          description: 'Chain rule practice',
          deadline: new Date('2026-07-28'),
          status: TaskStatus.DONE,
          subjectId: math.subjectId,
        },
        {
          title: 'General study',
          description: 'Revise notes',
          deadline: new Date('2026-07-18'),
          status: TaskStatus.DONE,
          subjectId: null,
        },
      ],
    });

    // 3 Exams
    await prisma.exam.createMany({
      data: [
        { examDate: new Date('2026-09-01'), subjectId: math.subjectId },
        { examDate: new Date('2026-09-15'), subjectId: physics.subjectId },
        { examDate: new Date('2026-09-20'), subjectId: chemistry.subjectId },
      ],
    });
  }

  console.log('✅ Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
