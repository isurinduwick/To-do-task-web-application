// API base URL
const API_BASE_URL = 'http://localhost:8000/api';

// API endpoints
export const ENDPOINTS = {
  TASKS: `${API_BASE_URL}/tasks`
};

// Task service methods
const TaskService = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await fetch(ENDPOINTS.TASKS);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      return await response.json();
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },
  
  // Create a new task
  createTask: async (task) => {
    try {
      const response = await fetch(ENDPOINTS.TASKS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
      });
      
      if (!response.ok) throw new Error('Failed to create task');
      return await response.json();
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },
  
  // Update an existing task
  updateTask: async (id, updates) => {
    try {
      const response = await fetch(`${ENDPOINTS.TASKS}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) throw new Error('Failed to update task');
      return await response.json();
    } catch (error) {
      console.error(`Error updating task with id ${id}:`, error);
      throw error;
    }
  }
};

export default TaskService;
