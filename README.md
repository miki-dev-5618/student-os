# 🎓 Student OS

Streamline your academic life with **Student OS** — a unified workspace designed to help students track tasks, manage assignments, log study sessions, prepare for exams, and visualize progress in one beautiful dashboard.

**🚀 Live Demo:** [studentos.navyaa-dev.me](https://studentos.navyaa-dev.me)

---

## ✨ Features

- **📂 Subject Management:** Organize your study logs, exams, and assignments by course.
- **📝 Task & Assignment Tracking:** Stay on top of due dates and complete tasks efficiently using built-in task boards.
- **📅 Exam Planner & Reflection:** Schedule upcoming exams, record progress, and write reflections on past exams to track continuous learning.
- **⏱️ Study Sessions:** Log focused study periods and keep track of productive hours.
- **📊 Interactive Analytics:** Visualize completion metrics and performance trends to optimize your studying.
- **🗓️ Unified Calendar:** View tasks, assignments, and exams in one integrated layout.
- **🔒 Secure Authentication:** Private and secure user sessions powered by NextAuth.js v5 and Argon2 password hashing.

---

## 🛠️ Technology Stack

- **Frontend/Backend:** [Next.js 16 (App Router)](https://nextjs.org/) & [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [PostCSS](https://postcss.org/)
- **Database ORM:** [Prisma ORM](https://www.prisma.io/)
- **Database:** PostgreSQL (with `@prisma/adapter-pg`)
- **Authentication:** [NextAuth.js v5 (Beta)](https://authjs.dev/)
- **Icons & Fonts:** [React Icons](https://react-icons.github.io/react-icons/), [Geist Font](https://vercel.com/font)

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.x or newer recommended)
- **PostgreSQL** database instance running locally or hosted in the cloud

### 🔧 Configuration

1. **Clone the repository** and navigate to the project directory:
   ```bash
   cd student-os
   ```

2. **Environment Setup:**
   Create a `.env` file in the root directory and configure the environment variables as follows:
   ```env
   # PostgreSQL Connection string
   DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<dbname>?schema=public"

   # NextAuth configurations
   NEXTAUTH_SECRET="your-super-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

### ⚙️ Database & Installation

1. Install all dependencies:
   ```bash
   npm install
   ```

2. Run Prisma migrations to set up your database schema:
   ```bash
   npx prisma migrate dev
   ```

3. Seed the database with initial sample data (optional but highly recommended):
   ```bash
   npm run seed
   ```

### 🏃‍♂️ Running Locally

Start the Next.js development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your web browser to check the results!

---

## 📁 Directory Structure

```
student-os/
├── prisma/               # Prisma Database Schema and Seed Scripts
│   ├── migrations/       # Database migrations
│   └── schema.prisma     # Main Database Schema
├── src/
│   ├── app/
│   │   ├── (pages)/      # Application routes (dashboard, tasks, exams, calendar, settings, etc.)
│   │   ├── actions/      # Next.js Server Actions for CRUD operations
│   │   ├── api/          # Route handlers & endpoints
│   │   ├── components/   # Shared UI components (Sidebar, Navbar, Cards, Charts)
│   │   ├── lib/          # Helper libraries & utility functions
│   │   ├── globals.css   # Main CSS entry point utilizing Tailwind CSS v4
│   │   └── layout.tsx    # Root layout template
│   └── services/         # Core services like Auth config and DB clients
└── package.json          # Node.js manifest file
```

---

## 🧪 Commands Reference

- `npm run dev` - Start development server.
- `npm run build` - Build the application for production.
- `npm run start` - Start the production server after building.
- `npm run lint` - Run ESLint checks.
- `npm run seed` - Populates your PostgreSQL database with seed data.
- `npx prisma studio` - Open Prisma Studio to browse and edit database entries.
- `npx prisma db push` - Push database changes directly without creating a migration.
