import { useState, useEffect, useCallback } from 'react';
import TaskService from '../services/taskService';

/**
 * Custom hook for managing tasks
 */
const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await TaskService.getAllTasks();
      // Ensure data is an array
      setTasks(Array.isArray(data) ? data : (data?.tasks || data?.data || []));
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error in fetchTasks:', err);
      setTasks([]); // Set to empty array on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new task
  const addTask = useCallback(async (taskData) => {
    if (!taskData.title.trim()) {
      setError('Task title cannot be empty.');
      return null;
    }

    try {
      setActionInProgress(true);
      setError(null);
      const newTask = await TaskService.createTask(taskData);
      // Ensure newTask has required properties before adding
      if (newTask && newTask.id) {
        setTasks(prev => [...prev, newTask]);
        return newTask;
      } else {
        throw new Error('Invalid task response from server');
      }
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error in addTask:', err);
      return null;
    } finally {
      setActionInProgress(false);
    }
  }, []);

  // Mark a task as completed
  const markTaskCompleted = useCallback(async (taskId) => {
    try {
      setActionInProgress(true);
      setError(null);
      const updatedTask = await TaskService.markTaskAsDone(taskId);
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, completed: true, status: updatedTask.status } : task
      ));
      return true;
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error in markTaskCompleted:', err);
      return false;
    } finally {
      setActionInProgress(false);
    }
  }, []);

  // Delete a task
  const deleteTask = useCallback(async (taskId) => {
    try {
      setActionInProgress(true);
      setError(null);
      
      const response = await TaskService.deleteTask(taskId);
      
      // Handle the response - check for success flag
      if (response?.success) {
        setTasks(prev => prev.filter(task => task.id !== taskId));
        return true;
      } else {
        throw new Error('Failed to delete task');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete task. Please try again.';
      setError(errorMessage);
      console.error('Error in deleteTask:', err);
      return false;
    } finally {
      setActionInProgress(false);
    }
  }, []);

  // Fetch tasks on initial load
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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
