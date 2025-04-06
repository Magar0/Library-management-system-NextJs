<div align="center">
  <br />
      <img src="https://github.com/user-attachments/assets/bea83b26-b0d9-460e-adde-911dc952c3cc" height="250"  alt="Project Banner">
      <img src="https://github.com/user-attachments/assets/d15d6e9d-7488-41b3-a73e-4c090564fe52"  height="250" alt="Project Banner">

  <br />

  <div>
    <img src="https://github.com/user-attachments/assets/e3b50a9d-d7ff-4a60-9a9d-8a07e830d699" alt="next.js" />
    <img src="https://github.com/user-attachments/assets/0011cded-184d-4838-8e5a-3bf33217276a" alt="TypeScript" />
    <img src="https://github.com/user-attachments/assets/6dea38dc-3a5d-4471-9d4e-893616e898be" alt="postgresql" />
    <img src="https://github.com/user-attachments/assets/54215392-cead-4649-9c49-20825580ddb9" alt="upstash" />
    <img src="https://github.com/user-attachments/assets/15af0f48-ecbf-4ef0-811c-31f286bf7050" alt="tailwindcss" />
  </div>

  <h3 align="center">A University Library Management System with Admin Panel</h3>

</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🎥 [Youtube](https://youtu.be/c5TzKkSxGw4)
6. 🟢 [Live Page](https://book-house-next-js.vercel.app/)

## <a name="introduction">🤖 Introduction</a>

Built with Next.js, TypeScript, and Postgres, the University Library Management System is a production-grade platform featuring a public-facing app and an admin interface. It offers advanced functionalities like seamless book borrowing with reminders and receipts, robust user management, automated workflows, and a modern, optimized tech stack for real-world scalability.

Clicke [here](https://youtu.be/c5TzKkSxGw4) to watch a short youtube video of my project


## <a name="tech-stack"> 💻 Tech Stack </a>

👉 Frontend: Next.js (TypeScript), TailwindCSS, ShadCN, Framer Motion, ImageKit, Redux Toolkit.

👉 Backend: Next.js API Routes, Drizzle ORM (type-safe queries), PostgresSql, Upstash.

👉 Email Handling: Nodemailer for transactional emails.

## <a name="features">🔋 Features</a>

### 🔐 Authentication & Security
- **Open-source Authentication**: Personalized onboarding flow with email notifications (NextAuth.js)
- **Role-Based Access Control**: Admins approve/reject users and assign roles (User/Admin)
- **DDoS Protection & Rate-Limiting**: Secure API endpoints against abuse

### 📚 Book Management
- **Home Page**: Highlighted books and newly added books with 3D effects
- **Book Detail Pages**: Availability tracking, summaries, videos, and similar book suggestions
- **Admin Book CRUD**: Add, edit, or delete books with pagination support
- **Infinite Scrolling and Pagination**: Smooth browsing for large book catalogs

### 👤 User Features
- **Profile Page**: Manage accounts, track borrowed books, and download receipts
- **Borrowing System**: Request/return books with due-date reminders
- **Borrowing History**: View past transactions and receipts

### 🤖 Automation & Workflows
- **Onboarding Workflows**: Automated welcome emails (Nodemailer) + inactivity follow-ups

### ⚡ Performance & Scalability
- **Database Management**: PostgreSQL with Neon for serverless scalability
- **Efficient Caching**: Upstash Redis for fast data retrieval and triggers
- **Real-time Media Processing**: ImageKit for optimized book covers/videos

### 🛠️ Advanced Features
- **Admin Dashboard**:
  - Approve/reject users
  - Manage all books, users, and borrowing records
  - Role switching (promote/demote users)
- **Code Architecture**: Modular, reusable components with TypeScript
- **PDF Receipt Generation**: Automatic receipts for borrowed books
and many more, including code architecture and reusability 

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone [https://github.com/Magar0/Library-management-system-NextJs.git]
cd Library-management-system-NextJs
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=

NEXT_PUBLIC_API_ENDPOINT=
NEXT_PUBLIC_PROD_API_ENDPOINT=

DATABASE_URL=

UPSTASH_REDIS_ENDPOINT=
UPSTASH_REDIS_TOKEN=

AUTH_SECRET=

# Required for workflow
QSTASH_URL=
QSTASH_TOKEN=

# nodemailer.. must be gmail account
SMTP_MAIL=
SMTP_PASSWORD=
```

Replace the placeholder values with your actual ImageKit, NeonDB, Upstash, and SMTP credentials. You can obtain these credentials by signing up on the ImageKit, NeonDB, Upstash. 


**Database Setup**
```bash
npm run db:generate
npm run db:migrate
```

**Seed the Database (Optional)**
```bash
npm run seed
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

***Note

To run Qstash workflow , you will need a domain url not localhost.
You can use this dummy account to get admin privilege

```bash
email:admin@gmail.com
password:12345678
```
