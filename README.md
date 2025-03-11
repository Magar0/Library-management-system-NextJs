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

## <a name="introduction">🤖 Introduction</a>

Built with Next.js, TypeScript, and Postgres, the University Library Management System is a production-grade platform featuring a public-facing app and an admin interface. It offers advanced functionalities like seamless book borrowing with reminders and receipts, robust user management, automated workflows, and a modern, optimized tech stack for real-world scalability.


## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js
- PostgreSQL
- Upstash
- ImageKit
- TypeScript
- Nodemailer
- Tailwind CSS

## <a name="features">🔋 Features</a>

### Features of the University Library Management System Project

👉 **Open-source Authentication**: Personalized onboarding flow with email notifications.  

👉 **Home Page**: Highlighted books and newly added books with 3D effects.  

<!--👉 **Library Page**: Advanced filtering, search, and pagination for book discovery.   -->

👉 **Book Detail Pages**: Availability tracking, book summaries, videos, and suggestions for similar books.  

👉 **Profile Page**: Manage accounts, track borrowed books, and download receipts.  

👉 **Onboarding Workflows**: Automated welcome emails when users sign up, with follow-ups based on inactivity or activity dates.  

<!--👉 **Borrow Book Reminder**: Customized email notifications sent before, on, and after the due date, reminding users to return books or avoid charges.-->

<!--👉 **Borrow Book Receipt**: Automatically generates a customized PDF receipt when a book is successfully borrowed.  -->

<!-- 👉 **Analytics Dashboard**: Statistics, new users, books, borrow requests, and more.  -->

<!-- 👉 **All Users Page**: View and manage users, including approving or revoking access.  -->

<!-- 👉 **Account Requests Page**: Admin approval for account requests, with email notifications for user verification.  -->

<!-- 👉 **All Books Page**: List and manage all library books with advanced search, pagination, and filters. -->

👉 **Book Management Forms**: Add new books and edit existing entries.  

<!-- 👉 **Book Details Page**: Detailed book information for administrators.  -->

<!-- 👉 **Borrow Records Page**: Complete borrow history with pagination and search.  -->

<!-- 👉 **Role Management**: Change user roles to manage access to admin portal. -->

👉 **Advanced Functionalities**: Caching, rate-limiting, DDoS protection, and custom notifications.  

👉 **Database Management**: Postgres with Neon for scalable and collaborative database handling.  

👉 **Real-time Media Processing**: ImageKit for image and video optimization and transformations. 

👉 **Efficient Caching**: Upstash Redis for caching, workflows, and triggers.  

👉 **Database ORM**: Drizzle ORM for simplified and efficient database interactions.  

👉 **Modern UI/UX**: Built with TailwindCSS, ShadCN, and other cutting-edge tools.  

👉 **Technology Stack**: Next.js with TypeScript for scalable development, and NextAuth for robust authentication.  

👉 **Email Handling**: Nodemailer is used for sending emails.  

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
