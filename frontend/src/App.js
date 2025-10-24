import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import AddTaskForm from './components/AddTaskForm';
import TaskBox from './components/TaskBox';
import ToastContainer from './components/ToastContainer';
import { NotificationProvider } from './context/NotificationContext';
import { useNotification } from './hooks/useNotification';
import useTasks from './hooks/useTasks';

function AppContent() {
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const { addNotification } = useNotification();

  const {
    tasks,
    isLoading,
    error,
    actionInProgress,
    addTask,
    markTaskCompleted,
    deleteTask
  } = useTasks(addNotification);

  const handleAddTask = async () => {
    const result = await addTask(newTask);
    if (result) {
      setNewTask({ title: '', description: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const activeTasksCount = tasks.filter(task => !task.completed).length;
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const totalTasksCount = tasks.length;

  return (
    <div className="app">
      <Sidebar tasks={tasks} />
      <main className="main-content">
        <div className="welcome-section">
          <h1>Welcome Back!</h1>
          <p>You have {activeTasksCount} active tasks today</p>
          {error && <p className="error-message">{error}</p>}
        </div>

        <div className="content-container">
          <AddTaskForm
            newTask={newTask}
            onInputChange={handleInputChange}
            onAddTask={handleAddTask}
            taskCount={activeTasksCount}
            isLoading={actionInProgress}
            totalTasksCount={totalTasksCount}
          />
          <TaskBox
            tasks={tasks}
            onMarkDone={markTaskCompleted}
            onDeleteTask={deleteTask}
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
            isLoading={isLoading}
          />
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

function App() {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}

export default App;