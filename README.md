# 🖋️ InkSpace

> A modern, full-stack publishing platform and community for writers and thinkers — inspired by Medium.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

---

## 🌟 Overview

**InkSpace** is an open-source, full-stack blogging application built with the **PERN stack (PostgreSQL, Express, React, Node.js)** and **TypeScript**. It provides a frictionless reading and writing experience with modern rich-text editing, interactive 3D landing elements, real-time engagement features, and a clean reading interface.

---

## ✨ Features

### 📖 Reading & Community
- **Global & Personalized Feed:** Discover trending stories and articles from authors you follow.
- **Interactive 3D Experience:** Stunning interactive landing page powered by Three.js & React Three Fiber.
- **Full-Text Search & Tags:** Find posts by keywords or explore curated topics through tags.
- **Social Engagement:** Like articles, bookmark stories for later reading, and leave nested comment replies.
- **Author Profiles & Follow Network:** Follow writers, view follower/following lists, and customize profile bios and avatars.

### ✍️ Writing & Publishing
- **Rich Text Editor:** Clean writing interface powered by **TipTap**.
- **Draft & Publish Workflow:** Save stories as drafts or publish them immediately.
- **Cover Images & Excerpts:** Customize post preview cards and headers.

### 🛡️ Architecture & Security
- **Robust Auth System:** Secure JWT authentication with short-lived access tokens and refresh token rotation.
- **Type-Safe End-to-End:** End-to-end TypeScript with Zod validation.
- **High-Performance Data Layer:** PostgreSQL with Prisma ORM for relational queries, migrations, and cascading deletions.

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **Core:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion)
- **3D Graphics:** [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei)
- **Editor:** [TipTap](https://tiptap.dev/)
- **State & Data Fetching:** [Zustand](https://zustand-demo.pmnd.rs/), [TanStack Query (React Query)](https://tanstack.com/query)
- **Routing & Forms:** [React Router v7](https://reactrouter.com/), [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Icons & UI Utilities:** [Lucide React](https://lucide.dev/), [React Hot Toast](https://react-hot-toast.com/)

### Backend (`/server`)
- **Runtime & Framework:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database & ORM:** [PostgreSQL](https://www.postgresql.org/), [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/), [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Security & Logging:** [Helmet](https://helmetjs.github.io/), [CORS](https://github.com/expressjs/cors), [Morgan](https://github.com/expressjs/morgan)

---

## 📁 Project Structure

```text
inkspace/
├── client/                      # Frontend application (Vite + React)
│   ├── src/
│   │   ├── api/                 # API service functions (Axios)
│   │   ├── components/          # Reusable UI & 3D landing components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Axios configuration & helper utilities
│   │   ├── pages/               # Page routes (Auth, Posts, Profiles, Search)
│   │   ├── store/               # Zustand state stores
│   │   ├── types/               # TypeScript interfaces & types
│   │   └── App.tsx              # Router and application layout
│   ├── package.json
│   └── vite.config.ts
│
├── server/                      # Backend REST API (Express + Prisma)
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema & relations
│   │   └── migrations/          # Database migration history
│   ├── src/
│   │   ├── config/              # Environment & application config
│   │   ├── controllers/         # HTTP request handlers
│   │   ├── middleware/          # JWT auth & validation middlewares
│   │   ├── routes/              # Express API route declarations
│   │   ├── services/            # Business & database logic
│   │   ├── utils/               # Prisma client & utility helpers
│   │   ├── app.ts               # Express app configuration
│   │   └── server.ts            # Server entry point
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 📋 Prerequisites
- **Node.js**: v18 or higher installed
- **PostgreSQL**: Running locally or a cloud instance (e.g. Supabase, Neon, Railway)
- **npm** or **yarn**

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/MenasriaMahdi/inkspace.git
cd inkspace
```

---

### Step 2: Configure & Start the Backend

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an environment configuration file:
   Create a `.env` file in the `server` directory with the following variables:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/blog_db?schema=public"

   JWT_ACCESS_SECRET="your-super-secret-access-token-key"
   JWT_REFRESH_SECRET="your-super-secret-refresh-token-key"
   JWT_ACCESS_EXPIRES_IN="15m"
   JWT_REFRESH_EXPIRES_IN="7d"
   ```

4. Push the schema to your PostgreSQL database and generate Prisma Client:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend API will be running at `http://localhost:5000`.

---

### Step 3: Configure & Start the Frontend

1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create a `.env` file in the `client` directory if pointing to a custom backend URL:
   ```env
   VITE_API_URL="http://localhost:5000/api"
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Log in and receive tokens | ❌ |
| `POST` | `/api/auth/refresh` | Refresh access token | ❌ |
| `GET` | `/api/posts/feed/global` | Fetch global feed | ❌ |
| `GET` | `/api/posts/:slug` | Get single post details | ❌ |
| `POST` | `/api/posts` | Create new post | ✅ |
| `PUT` | `/api/posts/:id` | Update post | ✅ |
| `DELETE` | `/api/posts/:id` | Delete post | ✅ |
| `POST` | `/api/posts/:id/like` | Like / unlike post | ✅ |
| `POST` | `/api/posts/:id/save` | Save / bookmark post | ✅ |
| `GET` | `/api/comments/post/:postId` | Get comments for a post | ❌ |
| `POST` | `/api/comments` | Add comment or reply | ✅ |
| `GET` | `/api/users/:username` | Get user profile | ❌ |
| `POST` | `/api/users/:id/follow` | Follow / unfollow user | ✅ |
| `GET` | `/api/tags` | List all tags | ❌ |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
