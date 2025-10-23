import { API_ENDPOINTS } from '../constants/apiConstants';
import * as http from '../utils/httpClient';

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
      return await http.get(API_ENDPOINTS.TASKS);
    } catch (error) {
      console.error('Error fetching tasks:', error);
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
      return await http.post(API_ENDPOINTS.TASKS, taskData);
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
      return await http.put(`${API_ENDPOINTS.TASKS}/${taskId}`, updates);
    } catch (error) {
      console.error(`Error updating task ${taskId}:`, error);
      throw error;
    }
  },

  /**
   * Delete a task
   * @param {number|string} taskId - ID of the task to delete
   * @returns {Promise<void>}
   */
  deleteTask: async (taskId) => {
    try {
      return await http.del(`${API_ENDPOINTS.TASKS}/${taskId}`);
    } catch (error) {
      console.error(`Error deleting task ${taskId}:`, error);
      throw error;
    }
  }
};

export default TaskService;
