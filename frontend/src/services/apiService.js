import axios from 'axios';

// ===========================
// Configuration
// ===========================

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';
const API_KEY = process.env.REACT_APP_API_KEY;

// Create axios instance with default headers
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY
  }
});

// API endpoints
export const ENDPOINTS = {
  TASKS: `${API_BASE_URL}/tasks`
};

// Task service methods
const TaskService = {
  // Get all tasks
  getAllTasks: async () => {
    try {
      const response = await axiosInstance.get('/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },
  
  // Create a new task
  createTask: async (task) => {
    try {
      const response = await axiosInstance.post('/tasks', task);
      if (!response.ok) throw new Error('Failed to create task');
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },
  
  // Update an existing task
  updateTask: async (id, updates) => {
    try {
      const response = await axiosInstance.put(`/tasks/${id}`, updates);
      if (!response.ok) throw new Error('Failed to update task');
      return response.data;
    } catch (error) {
      console.error(`Error updating task with id ${id}:`, error);
      throw error;
    }
  }
};

export default TaskService;
