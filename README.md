# To-Do Task Web Application

![To-Do App Screenshot](assets/todo-app-screenshot.png)

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
2. **Install dependencies:**
   ```bash
    composer install

3. **Configure environment:**
   ```bash
   cp .env.example .env
Update .env with your MySQL database credentials.


4. **Run migrations:**
   ```bash
   php artisan migrate


5. **Start the Laravel server:**
   ```bash
   php artisan serve


