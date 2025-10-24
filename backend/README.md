# To-Do Task Web Application - Backend

A Laravel-based REST API backend for a to-do task management application.

## Features

- authentication and authorization
- Create, read and delete tasks
- Task categorization 
- Due date management
- Task completion tracking

## Tech Stack

- **Framework**: Laravel 10+
- **Database**: MySQL
- **Authentication**: Laravel Sanctum
- **API**: RESTful API

## Installation

### Prerequisites

- PHP 8.1+
- Composer
- MySQL/PostgreSQL

### Setup Steps

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies
   ```bash
   composer install
   ```

3. Configure environment
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. Configure database in `.env` file
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=todo_app
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. Run migrations
   ```bash
   php artisan migrate
   ```

6. Start the development server
   ```bash
   php artisan serve
   ```

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/{id}` - Get specific task
- `DELETE /api/tasks/{id}` - Delete task


## Database Schema

- `tasks` - Task records
- `categories` - Task categories

## Testing

```bash
php artisan test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss proposed changes.

## License

This project is licensed under the MIT License.
