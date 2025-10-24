import axios from 'axios';

// API base URL
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Task Service - Handles all API calls related to tasks
 */
export const TaskService = {
  /**
   * Get all tasks
   * @returns {Promise<Array>} - Array of task objects
   */
  getAllTasks: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/recent`);
      return response.data;
    } catch (error) {
      console.error('Error getting all tasks:', error);
      throw error;
    }
  },

  /**
   * Get recent tasks
   * @returns {Promise<Array>} - Array of recent task objects
   */
  getRecentTasks: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks/recent`);
      return response.data;
    } catch (error) {
      console.error('Error getting recent tasks:', error);
      throw error;
    }
  },

  /**
   * Create a new task
   * @param {Object} taskData - Task data (title, description)
   * @returns {Promise<Object>} - Created task object
   */
  createTask: async (taskData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks`, taskData);
      // Handle nested response structure
      return response.data?.task || response.data?.tasks?.[0] || response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  /**
   * Update a task
   * @param {number|string} taskId - ID of the task to update
   * @param {Object} updates - Task properties to update
   * @returns {Promise<Object>} - Updated task object
   */
  updateTask: async (taskId, updates) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  /**
   * Delete a task
   * @param {number|string} taskId - ID of the task to delete
   * @returns {Promise<Object>} - Response object with success status
   */
  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
      // Return the response with success indicator
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error(`Error deleting task with ID ${taskId}:`, error);
      console.error('Error response:', error.response?.data);
      throw error;
    }
  },

  /**
   * Mark a task as done
   * @param {number|string} taskId - ID of the task to mark as done
   * @returns {Promise<Object>} - Updated task object
   */
  markTaskAsDone: async (taskId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}/mark-as-done`);
      const task = response.data.task;
      
      // Ensure completed property is set based on status
      return {
        ...task,
        completed: task.status === 'completed'
      };
    } catch (error) {
      console.error('Error marking task as done:', error);
      throw error;
    }
  }
};

export default TaskService;
