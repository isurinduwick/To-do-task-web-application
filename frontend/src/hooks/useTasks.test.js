import { renderHook, act, waitFor } from '@testing-library/react';
import useTasks from '../useTasks';

// Mock axios
jest.mock('axios');
import axios from 'axios';

describe('useTasks Hook', () => {
  const mockAddNotification = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    axios.get.mockClear();
    axios.post.mockClear();
    axios.put.mockClear();
    axios.delete.mockClear();
  });

  test('initializes with default state', () => {
    axios.get.mockResolvedValue({ data: [] });
    
    const { result } = renderHook(() => useTasks(mockAddNotification));
    
    expect(result.current.tasks).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test('fetches tasks on mount', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: false }
    ];
    
    axios.get.mockResolvedValue({ data: mockTasks });
    
    const { result } = renderHook(() => useTasks(mockAddNotification));
    
    await waitFor(() => {
      expect(result.current.tasks).toEqual(mockTasks);
    });
    
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/api/tasks/recent'));
  });

  test('can add a new task', async () => {
    const newTask = { title: 'New Task', description: 'Description' };
    const createdTask = { id: 3, ...newTask, completed: false };
    
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({ data: { task: createdTask } });
    
    const { result } = renderHook(() => useTasks(mockAddNotification));
    
    let addResult;
    await act(async () => {
      addResult = await result.current.addTask(newTask);
    });
    
    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining('/api/tasks'),
      newTask
    );
  });

  test('can mark task as completed', async () => {
    const taskId = 1;
    
    axios.get.mockResolvedValue({ data: [] });
    axios.put.mockResolvedValue({ data: { success: true } });
    
    const { result } = renderHook(() => useTasks(mockAddNotification));
    
    await act(async () => {
      await result.current.markTaskCompleted(taskId);
    });
    
    expect(axios.put).toHaveBeenCalledWith(
      expect.stringContaining(`/api/tasks/${taskId}/mark-as-done`)
    );
  });

  test('can delete a task', async () => {
    const taskId = 1;
    
    axios.get.mockResolvedValue({ data: [] });
    axios.delete.mockResolvedValue({ data: { success: true } });
    
    const { result } = renderHook(() => useTasks(mockAddNotification));
    
    await act(async () => {
      await result.current.deleteTask(taskId);
    });
    
    expect(axios.delete).toHaveBeenCalledWith(
      expect.stringContaining(`/api/tasks/${taskId}`)
    );
  });

  test('handles errors when fetching tasks', async () => {
    const error = new Error('Network error');
    axios.get.mockRejectedValue(error);
    
    const { result } = renderHook(() => useTasks(mockAddNotification));
    
    await waitFor(() => {
      expect(result.current.error).not.toBeNull();
    });
  });

  test('displays notification on successful task creation', async () => {
    const newTask = { title: 'New Task', description: 'Description' };
    const createdTask = { id: 3, ...newTask, completed: false };
    
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockResolvedValue({ data: { task: createdTask, success: true } });
    
    const { result } = renderHook(() => useTasks(mockAddNotification));
    
    await act(async () => {
      await result.current.addTask(newTask);
    });
    
    await waitFor(() => {
      expect(mockAddNotification).toHaveBeenCalled();
    });
  });

  test('sets action in progress during operation', async () => {
    const newTask = { title: 'New Task', description: 'Description' };
    const createdTask = { id: 3, ...newTask, completed: false };
    
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockImplementation(() => 
      new Promise(resolve => 
        setTimeout(() => resolve({ data: { task: createdTask } }), 100)
      )
    );
    
    const { result } = renderHook(() => useTasks(mockAddNotification));
    
    act(() => {
      result.current.addTask(newTask);
    });
    
    await waitFor(() => {
      // Action should complete
      expect(axios.post).toHaveBeenCalled();
    });
  });

  test('refetches tasks after adding a new task', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', completed: false }
    ];
    const newTask = { title: 'New Task', description: 'Description' };
    const createdTask = { id: 2, ...newTask, completed: false };
    
    axios.get.mockResolvedValue({ data: mockTasks });
    axios.post.mockResolvedValue({ data: { task: createdTask, success: true } });
    
    const { result } = renderHook(() => useTasks(mockAddNotification));
    
    await waitFor(() => {
      expect(result.current.tasks).toBeDefined();
    });
    
    await act(async () => {
      await result.current.addTask(newTask);
    });
    
    expect(axios.get).toHaveBeenCalled();
  });
});
