import { useState, useEffect, useCallback } from 'react';
import TaskService from '../services/taskService';

/**
 * Custom hook for managing tasks
 * @param {Function} onNotification - Callback for notifications
 * @returns {Object} Task management functions and state
 */
const useTasks = (onNotification) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);

  // ===========================
  // Helper Functions
  // ===========================

  const normalizeTask = (task) => ({
    ...task,
    completed: task.completed ?? (task.status === 'completed')
  });

  // ===========================
  // API Functions
  // ===========================

  /**
   * Fetch all tasks from the server
   */
  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await TaskService.getAllTasks();
      const raw = Array.isArray(data) ? data : (data?.tasks ?? data?.data ?? []);
      const normalizedTasks = raw.map(normalizeTask);
      setTasks(normalizedTasks);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error in fetchTasks:', err);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Add a new task
   * @param {Object} taskData - Task data with title and description
   * @returns {Promise<Object|null>} Created task or null on failure
   */
  const addTask = useCallback(async (taskData) => {
    if (!taskData?.title || !taskData.title.trim()) {
      setError('Task title cannot be empty.');
      return null;
    }

    try {
      setActionInProgress(true);
      setError(null);
      const newTask = await TaskService.createTask(taskData);

      if (newTask && newTask.id) {
        setTasks(prev => [...prev, normalizeTask(newTask)]);
        if (onNotification) {
          onNotification(`Task "${newTask.title}" added successfully! 🎉`, 'success');
        }
        return newTask;
      } else {
        throw new Error('Invalid task response from server');
      }
    } catch (err) {
      setError('Failed to add task. Please try again.');
      if (onNotification) {
        onNotification('Failed to add task. Please try again.', 'error');
      }
      console.error('Error in addTask:', err);
      return null;
    } finally {
      setActionInProgress(false);
    }
  }, [onNotification]);

  /**
   * Mark a task as completed
   * @param {number|string} taskId - Task ID to mark as completed
   * @returns {Promise<Object|null>} Updated task or null on failure
   */
  const markTaskCompleted = useCallback(async (taskId) => {
    try {
      setActionInProgress(true);
      setError(null);
      const updatedTask = await TaskService.markTaskAsDone(taskId);

      if (!updatedTask) {
        throw new Error('No task returned from server');
      }

      const normalized = normalizeTask(updatedTask);
      const taskTitle = tasks.find(t => t.id === taskId)?.title || 'Task';

      setTasks(prev => prev.map(t => (t.id === taskId ? normalized : t)));

      if (onNotification) {
        onNotification(`"${taskTitle}" marked as done! ✓`, 'success');
      }
      return normalized;
    } catch (err) {
      setError('Failed to update task. Please try again.');
      if (onNotification) {
        onNotification('Failed to mark task as done.', 'error');
      }
      console.error('Error in markTaskCompleted:', err);
      return null;
    } finally {
      setActionInProgress(false);
    }
  }, [tasks, onNotification]);

  /**
   * Delete a task
   * @param {number|string} taskId - Task ID to delete
   * @returns {Promise<boolean>} Success status
   */
  const deleteTask = useCallback(async (taskId) => {
    try {
      setActionInProgress(true);
      setError(null);
      const taskTitle = tasks.find(t => t.id === taskId)?.title || 'Task';
      const response = await TaskService.deleteTask(taskId);
      const success = response?.success ?? (response === true);

      if (success) {
        setTasks(prev => prev.filter(task => task.id !== taskId));
        if (onNotification) {
          onNotification(`"${taskTitle}" deleted successfully! 🗑️`, 'success');
        }
        return true;
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (err) {
      const errorMessage =
        err?.response?.data?.message || err?.message || 'Failed to delete task. Please try again.';
      setError(errorMessage);
      if (onNotification) {
        onNotification(errorMessage, 'error');
      }
      console.error('Error in deleteTask:', err);
      return false;
    } finally {
      setActionInProgress(false);
    }
  }, [tasks, onNotification]);

  // ===========================
  // Effects
  // ===========================

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // ===========================
  // Return
  // ===========================

  return {
    tasks,
    isLoading,
    error,
    actionInProgress,
    fetchTasks,
    addTask,
    markTaskCompleted,
    deleteTask
  };
};

export default useTasks;
