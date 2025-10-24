# To-Do Task Web Application - Frontend

A modern React-based frontend for managing your daily tasks efficiently.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Building for Production](#building-for-production)

## ✨ Features

- Create, read and delete tasks
- Mark tasks as complete
- Filter tasks by status
- Responsive UI design
- Real-time task management

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Backend API running (if required)

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## 📜 Available Scripts

### `npm start`

Runs the app in development mode.

- Open [http://localhost:3000](http://localhost:3000) to view in your browser
- The page will reload when you make changes

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

- Optimized and minified for best performance
- Ready for deployment

### `npm run eject`

**⚠️ Warning: This is a one-way operation!**

Ejects from Create React App configuration. Use only if you need full control over configuration.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── services/       # API services and utilities
│   ├── styles/         # CSS and styling
│   ├── App.js          # Main App component
│   └── index.js        # Entry point
├── public/             # Static files
├── package.json        # Dependencies and scripts
└── README.md           # This file
```

## 🔧 Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## 💻 Development

- Use functional components with React Hooks
- Follow ESLint rules for code quality
- Keep components small and reusable
- Use meaningful commit messages

## 🏗️ Building for Production

```bash
npm run build
```

The optimized production build will be created in the `build/` folder, ready for deployment.

## 📚 Learn More

- [React Documentation](https://reactjs.org/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/)

---


