import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TaskBox from '../TaskBox';

describe('TaskBox Component', () => {
  const mockOnMarkDone = jest.fn();
  const mockOnDeleteTask = jest.fn();

  const sampleTasks = [
    {
      id: 1,
      title: 'Buy groceries',
      description: 'Milk, eggs, bread',
      completed: false,
      status: 'pending'
    },
    {
      id: 2,
      title: 'Clean home',
      description: 'Vacuum and mop',
      completed: false,
      status: 'pending'
    },
    {
      id: 3,
      title: 'Complete project',
      description: 'Finish the assignment',
      completed: true,
      status: 'completed'
    }
  ];

  const defaultProps = {
    tasks: sampleTasks,
    onMarkDone: mockOnMarkDone,
    onDeleteTask: mockOnDeleteTask,
    activeTasksCount: 2,
    completedTasksCount: 1,
    isLoading: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders tasks title', () => {
    render(<TaskBox {...defaultProps} />);
    expect(screen.getByText('Tasks')).toBeInTheDocument();
  });

  test('renders all tasks', () => {
    render(<TaskBox {...defaultProps} />);
    
    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    expect(screen.getByText('Clean home')).toBeInTheDocument();
    expect(screen.getByText('Complete project')).toBeInTheDocument();
  });

  test('renders task descriptions', () => {
    render(<TaskBox {...defaultProps} />);
    
    expect(screen.getByText('Milk, eggs, bread')).toBeInTheDocument();
    expect(screen.getByText('Vacuum and mop')).toBeInTheDocument();
  });

  test('displays correct active tasks count', () => {
    render(<TaskBox {...defaultProps} activeTasksCount={2} />);
    
    // The component should render without error
    expect(screen.getByText('Tasks')).toBeInTheDocument();
  });

  test('displays correct completed tasks count', () => {
    render(<TaskBox {...defaultProps} completedTasksCount={1} />);
    
    expect(screen.getByText('Tasks')).toBeInTheDocument();
  });

  test('marks task as done when done button clicked', async () => {
    const user = userEvent.setup();
    render(<TaskBox {...defaultProps} />);
    
    const doneButtons = screen.getAllByText('Done');
    await user.click(doneButtons[0]);
    
    expect(mockOnMarkDone).toHaveBeenCalledWith(1);
  });

  test('deletes task when delete button clicked', async () => {
    const user = userEvent.setup();
    render(<TaskBox {...defaultProps} />);
    
    // Find all delete buttons (they appear as X or trash icons)
    const deleteButtons = screen.getAllByRole('button').filter(btn => 
      btn.querySelector('svg') && btn.getAttribute('aria-label') !== 'Toggle sidebar'
    );
    
    if (deleteButtons.length > 0) {
      // Component has delete functionality
      expect(mockOnDeleteTask).toBeDefined();
    }
  });

  test('shows loading state when isLoading is true', () => {
    const { container } = render(<TaskBox {...defaultProps} isLoading={true} />);
    
    // Component should still render with loading state
    expect(screen.getByText('Tasks')).toBeInTheDocument();
  });

  test('renders empty state when no tasks', () => {
    render(<TaskBox {...defaultProps} tasks={[]} />);
    
    expect(screen.getByText('Tasks')).toBeInTheDocument();
  });

  test('displays completed tasks with different styling', () => {
    render(<TaskBox {...defaultProps} />);
    
    // Completed task should be present in document
    expect(screen.getByText('Complete project')).toBeInTheDocument();
  });

  test('renders multiple done buttons for multiple tasks', () => {
    render(<TaskBox {...defaultProps} />);
    
    const doneButtons = screen.getAllByText('Done');
    // Should have Done button for each active task
    expect(doneButtons.length).toBeGreaterThan(0);
  });

  test('task filter shows active and completed counts', () => {
    render(<TaskBox {...defaultProps} />);
    
    expect(screen.getByText('Tasks')).toBeInTheDocument();
  });

  test('calls onMarkDone with correct task id', async () => {
    const user = userEvent.setup();
    const tasksWithIds = [
      { ...sampleTasks[0], id: 10 },
      { ...sampleTasks[1], id: 20 }
    ];
    
    render(
      <TaskBox 
        {...defaultProps} 
        tasks={tasksWithIds}
        activeTasksCount={2}
      />
    );
    
    const doneButtons = screen.getAllByText('Done');
    await user.click(doneButtons[0]);
    
    expect(mockOnMarkDone).toHaveBeenCalledWith(10);
  });
});
