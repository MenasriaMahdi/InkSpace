# Medium Clone Backend 📰

Full-stack blogging platform backend built with **PERN stack + Prisma + TypeScript**.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v20-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

## ✨ Features

- 🔐 JWT Authentication (login/register/refresh tokens)
- 👤 User management (profile/avatar)
- 📝 Posts (CRUD, likes, saves, tags, rich content)
- 💬 Nested comments system
- 🏷️ Tags (auto-create, filtering)
- 🔍 Full-text search
- 📊 Pagination everywhere
- 🛡️ Input validation + error handling
- 📱 REST API ready for React/Next.js frontend

## 🛠️ Tech Stack

Frontend-ready REST API
├── TypeScript + Express.js
├── Prisma ORM + PostgreSQL
├── JWT + bcrypt (auth)
├── Zod (validation)
├── Multer (file uploads)
└── Custom middleware stack

Clone & install
cd medium-clone-backend
npm install

Setup database
npm run db:push
npm run db:seed # Optional: seed test data

Start dev server
npm run dev


**API runs on:** `http://localhost:5000`

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Create account |
| `POST` | `/api/auth/login` | Login |
| `GET` | `/api/posts/feed/global` | Global feed |
| `POST` | `/api/posts` | Create post |
| `GET` | `/api/tags` | All tags |
| `GET` | `/api/posts/search?q=query` | Search posts |

**Full API docs:** [POSTMAN collection coming soon](#)

## 🗄️ Database Schema

User → Posts → Comments (nested)
↳ Likes/Saves
↳ Tags (many-to-many)


## 🌐 Live Demo

🔗 [Deploying soon on Render.com](#)

## 📁 Project Structure

src/
├── controllers/ # Request handlers
├── services/ # Business logic
├── middleware/ # Auth, validation
├── routes/ # API routes
├── utils/ # Prisma, errors
└── index.ts # Server entry


## 🎯 Next Steps

- [ ] React/Next.js frontend
- [ ] Deploy to Render/Vercel
- [ ] Postman collection
- [ ] Docker support

## 🤝 Contributing

1. Fork the repo
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

---

**Built by [YOUR_NAME] for portfolio** 💼

STEP 5: Create .gitignore
# Dependencies
node_modules/
npm-debug.log*

# Environment variables
.env
.env.local
.env.*.local

# Prisma
prisma/migrations/
*.db

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

STEP 6: Create .env.example

DATABASE_URL="postgresql://..."
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"
PORT=5000

