# Fusion Starter - Full Stack React + Express App

A modern full-stack web application built with React, Vite, Express, and TypeScript.

## 🚀 Features

- **Frontend**: React 18 with TypeScript
- **Backend**: Express.js with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for fast development and building
- **Routing**: React Router for client-side routing
- **State Management**: TanStack Query for server state
- **UI Components**: Comprehensive component library

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, Node.js
- **UI**: shadcn/ui components, Lucide React icons
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd site-new
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:8080`

## 🏗️ Build

To build for production:
```bash
npm run build
```

## 🚀 Deployment

This project is configured for deployment on Vercel. Simply connect your GitHub repository to Vercel and it will automatically deploy.

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions
├── server/               # Backend Express application
│   ├── routes/           # API routes
│   └── index.ts          # Server entry point
├── shared/               # Shared types and utilities
└── public/               # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run tests
- `npm run typecheck` - TypeScript type checking

## 📝 License

MIT 