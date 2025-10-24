# To-Do Task Web Application

![To-Do App Screenshot](assets\Todo.png)

A simple, modern web application for managing your daily tasks. Add tasks, mark them as done, and automatically remove completed tasks with a clean, responsive interface.  

Repository: [https://github.com/isurinduwick/To-do-task-web-application](https://github.com/isurinduwick/To-do-task-web-application)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

## Features

✅ **Add Tasks** - Create new tasks with a description.  
✅ **Mark as Done** - Mark tasks as completed; the button changes to "Done".  
✅ **Delete Completed Tasks** - Clicking the "Done" button deletes the task.  
✅ **Persistent Storage** - All tasks are saved in a MySQL database.  
✅ **Responsive Design** - Works on desktop, tablet, and mobile devices.  
✅ **Clean UI** - Simple, intuitive interface built with React.  

## Tech Stack

**Frontend:**  
- React.js  
- CSS / Styled Components  

**Backend:**  
- PHP Laravel (REST API)  
- MySQL Database  

**Tools:**  
- Composer (PHP dependencies)  
- npm / yarn (frontend dependencies)  
- Git & GitHub  

## Prerequisites

- PHP >= 8.0  
- Composer  
- Node.js >= 14  
- npm or yarn  
- MySQL Server  
- Git  

## Installation

### Backend (Laravel)

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/isurinduwick/To-do-task-web-application.git
   cd To-do-task-web-application/backend
   ```

2. **Install dependencies:**
   ```bash
   composer install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   ```
   Update .env with your MySQL database credentials.

4. **Run migrations:**
   ```bash
   php artisan migrate
   ```

5. **Start the Laravel server:**
   ```bash
   php artisan serve
   ```

### Frontend (React)

1. **Navigate to frontend folder:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open the app in your browser:**
   Navigate to: http://localhost:3000

## Usage

### Add a Task:
Enter task description in input field and click "Add Task".

### Mark as Done:
Click the "Mark as Done" button. Task is completed and the button updates.

### Delete Completed Task:
Click the "Done" button again to delete the task from the list.

Tasks are saved in the database and will persist across sessions.

## Project Structure

```
To-do-task-web-application/
├── backend/
│   ├── app/              # Laravel backend code
│   ├── database/         # Migrations & seeders
│   ├── routes/           # API routes
│   └── ...               # Other Laravel files
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API service calls
│   │   └── App.js
│   ├── public/
│   └── package.json
├── assets/               # Images/screenshots
├── README.md
└── .gitignore
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Fetch all tasks |
| POST | /api/tasks | Add a new task |
| PUT | /api/tasks/:id | Mark task as done |
| DELETE | /api/tasks/:id | Delete a completed task |

## Testing

### Backend:
PHPUnit tests for task creation, completion, and deletion.

**Run tests:**
```bash
php artisan test
```

### Frontend:
React Testing Library for component rendering and interactions.

**Run tests:**
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

### Guidelines:
- Follow clean code principles
- Adhere to SOLID design principles in backend
- Comment complex logic
- Ensure tests cover all new functionality

## License

MIT License - see LICENSE file for details

## Support

- Open an issue on GitHub
- Contact the development team


