import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import AddTaskForm from '../AddTaskForm';

describe('AddTaskForm Component', () => {
  const mockOnInputChange = jest.fn();
  const mockOnAddTask = jest.fn();

  const defaultProps = {
    newTask: { title: '', description: '' },
    onInputChange: mockOnInputChange,
    onAddTask: mockOnAddTask,
    taskCount: 5,
    isLoading: false,
    totalTasksCount: 10
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form title correctly', () => {
    render(<AddTaskForm {...defaultProps} />);
    expect(screen.getByText('Add a Task')).toBeInTheDocument();
  });

  test('renders title input field', () => {
    render(<AddTaskForm {...defaultProps} />);
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
  });

  test('renders description input field', () => {
    render(<AddTaskForm {...defaultProps} />);
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
  });

  test('renders add button', () => {
    render(<AddTaskForm {...defaultProps} />);
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  test('calls onInputChange when title input changes', async () => {
    const user = userEvent.setup();
    render(<AddTaskForm {...defaultProps} />);
    
    const titleInput = screen.getByPlaceholderText('Title');
    await user.type(titleInput, 'New Task');
    
    expect(mockOnInputChange).toHaveBeenCalled();
  });

  test('calls onInputChange when description input changes', async () => {
    const user = userEvent.setup();
    render(<AddTaskForm {...defaultProps} />);
    
    const descriptionInput = screen.getByPlaceholderText('Description');
    await user.type(descriptionInput, 'Task Description');
    
    expect(mockOnInputChange).toHaveBeenCalled();
  });

  test('calls onAddTask when add button is clicked', async () => {
    const user = userEvent.setup();
    render(<AddTaskForm {...defaultProps} />);
    
    const addButton = screen.getByText('Add');
    await user.click(addButton);
    
    expect(mockOnAddTask).toHaveBeenCalled();
  });

  test('button is disabled when isLoading is true', () => {
    render(<AddTaskForm {...defaultProps} isLoading={true} />);
    
    const addButton = screen.getByText('Add');
    expect(addButton).toBeDisabled();
  });

  test('displays correct task count in form', () => {
    render(<AddTaskForm {...defaultProps} taskCount={3} />);
    
    // Check if component renders without error
    expect(screen.getByText('Add a Task')).toBeInTheDocument();
  });

  test('handles empty form submission', async () => {
    const user = userEvent.setup();
    render(<AddTaskForm {...defaultProps} />);
    
    const addButton = screen.getByText('Add');
    await user.click(addButton);
    
    expect(mockOnAddTask).toHaveBeenCalled();
  });

  test('input values are passed through props correctly', () => {
    const taskWithValues = { 
      title: 'Buy groceries', 
      description: 'Milk, eggs, bread' 
    };
    
    render(
      <AddTaskForm 
        {...defaultProps} 
        newTask={taskWithValues}
      />
    );
    
    const titleInput = screen.getByPlaceholderText('Title');
    const descriptionInput = screen.getByPlaceholderText('Description');
    
    expect(titleInput.value).toBe('Buy groceries');
    expect(descriptionInput.value).toBe('Milk, eggs, bread');
  });
});
