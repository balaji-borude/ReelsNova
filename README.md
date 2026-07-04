# 🎬 ReelsNova

A modern, full-stack video content sharing platform inspired by TikTok/Instagram Reels. Share, discover, and enjoy short-form video content with a beautiful and responsive user interface.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Available Scripts](#available-scripts)
- [Project Roadmap](#project-roadmap)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure signup and login system with JWT tokens
- **Video Feed**: Swipeable feed showcasing short-form video content
- **Video Upload**: Upload and share your own videos easily
- **Responsive Design**: Beautiful UI built with Tailwind CSS
- **Modern Stack**: Built with React 19, TypeScript, and Vite
- **Real-time Notifications**: Toast notifications for user feedback
- **Database Support**: PostgreSQL integration with Prisma ORM

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI Library
- **TypeScript** - Type-safe JavaScript
- **Vite 7.2.4** - Lightning-fast build tool
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **React Router DOM 7.12.0** - Client-side routing
- **Axios 1.13.2** - HTTP client
- **Swiper 12.0.3** - Touch slider library
- **React Hot Toast 2.6.0** - Notification system
- **Lucide React 0.562.0** - Beautiful icon library

### Backend
- **Express 5.2.1** - Web framework
- **TypeScript 5.9.3** - Type-safe backend
- **PostgreSQL** - Database
- **Prisma 7.2.0** - ORM
- **JWT (jsonwebtoken 9.0.3)** - Authentication
- **bcrypt 6.0.0** - Password hashing
- **CORS 2.8.5** - Cross-origin requests

## 📁 Project Structure

```
ReelsNova/
├── src/                              # Frontend source code
│   ├── Components/
│   │   ├── home/                     # Home page components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── PreviewFeedSection.tsx
│   │   │   └── AboutSection.tsx
│   │   ├── pages/                    # Authentication pages
│   │   │   ├── Login.tsx
│   │   │   ├── Signup.tsx
│   │   │   └── ...
│   │   ├── Feed/                     # Video feed components
│   │   │   └── Feed.tsx
│   │   ├── Upload/                   # Video upload components
│   │   │   └── UploadForm.tsx
│   │   ├── layout/                   # Layout components
│   ��   │   ├── MainLayout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── ...
│   ├── Services/
│   │   └── apis.ts                   # API endpoint configuration
│   ├── App.tsx                       # Root component
│   ├── main.tsx                      # Entry point
│   └── index.css                     # Global styles
├── SERVER/                            # Backend source code
│   ├── src/
│   │   ├── index.ts                  # Server entry point
│   │   ├── controller/
│   │   │   ├── auth.ts               # Authentication logic
│   │   │   └── profile.ts            # Profile logic
│   │   ├── routes/
│   │   │   └── auth.ts               # Auth routes
│   │   ├── config/
│   │   │   └── prisma.ts             # Prisma configuration
│   │   └── generated/
│   │       └── prisma/               # Generated Prisma types
│   ├── prisma/
│   │   ├── schema.prisma             # Database schema
│   │   └── migrations/               # Database migrations
│   ├── package.json
│   └── tsconfig.json
├── package.json                      # Frontend dependencies
├── vite.config.ts                    # Vite configuration
├── tsconfig.json                     # TypeScript configuration
└── README.md
```

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/balaji-borude/ReelsNova.git
cd ReelsNova

# Install dependencies
npm install

# Install Tailwind CSS dependencies
npm install -D @tailwindcss/vite tailwindcss
```

### Backend Setup

```bash
# Navigate to backend directory
cd SERVER

# Install dependencies
npm install

# Build TypeScript
npm run build
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `SERVER` directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/reelsnova"

# Server
PORT=4000

# JWT (optional, depending on your implementation)
JWT_SECRET=your_secret_key_here
```

### Frontend API Configuration

Update `src/Services/apis.ts` with your backend URL:

```typescript
// For deployment
const BASE_URL = "https://reelsnova-backend.onrender.com/api/v1"

// For local development
// const BASE_URL = "http://localhost:4000/api/v1"
```

## 🎯 Running the Application

### Development Mode

**Frontend:**
```bash
npm run dev
# Runs on http://localhost:5173
```

**Backend:**
```bash
cd SERVER
npm run dev
# Runs on http://localhost:4000
```

### Production Build

**Frontend:**
```bash
npm run build
npm run preview
```

**Backend:**
```bash
cd SERVER
npm run build
npm start
```

## 📡 API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register a new user |
| POST | `/login` | Login user |

## 📜 Available Scripts

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript |
| `npm start` | Start production server |

## 🗺️ Project Roadmap

- [x] Basic project setup
- [x] User authentication (signup/login)
- [x] Home page with hero section
- [ ] Complete feed implementation
- [ ] Video upload functionality
- [ ] User profiles and settings
- [ ] Video likes and comments
- [ ] Search and discovery
- [ ] Social features (follow, share)
- [ ] Performance optimization
- [ ] Mobile app version (optional)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🔗 Live Demo

- **Frontend**: [ReelsNova](https://reel-nova-six.vercel.app/)
- **Backend**: [ReelsNova API](https://reelsnova-backend.onrender.com)

## 📧 Support

For support, email balajiborude2503@gmail.com or open an issue on GitHub.

---

Made with ❤️ by Balaji Borude
