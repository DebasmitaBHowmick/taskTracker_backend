# Task Management Application

A full-stack task management application built with:

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: PostgreSQL
- ORM: Prisma
- Authentication: JWT

---

##  Features

- User Registration & Login
- JWT-based authentication
- Create, update, delete tasks
- Role-based access (ADMIN / USER)
- Status tracking (PENDING / COMPLETED)
- Protected routes

---

## Tech Stack

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- lucide-react (icons)

### Backend
- Express
- Prisma ORM
- PostgreSQL
- bcrypt
- jsonwebtoken

---

##  Installation

### 1️ Clone the repository

```bash
git clone <your-repo-url>
cd task-manager

DATABASE_URL="postgresql://postgres:q1w2e3r45@localhost:5432/tasktracker"
JWT_SECRET=supersecretkey
PORT=5000

##Run Prisma migration:
npx prisma migrate dev

##Start backend:
npm run dev

##Server runs at:
http://localhost:5000
