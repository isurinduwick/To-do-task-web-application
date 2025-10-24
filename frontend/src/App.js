import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import AddTaskForm from './components/AddTaskForm';
import TaskBox from './components/TaskBox';
import ToastContainer from './components/ToastContainer';
import { NotificationProvider } from './context/NotificationContext';
import { useNotification } from './hooks/useNotification';
import useTasks from './hooks/useTasks';
import { Menu, X } from 'lucide-react';

function AppContent() {
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  // Close sidebar when window resizes to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar when clicking on main content
  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app">
      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={handleCloseSidebar}
          aria-hidden="true"
        />
      )}

      <Sidebar tasks={tasks} sidebarOpen={sidebarOpen} onClose={handleCloseSidebar} />
      
      <button 
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
        aria-expanded={sidebarOpen}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <main className="main-content" onClick={handleCloseSidebar}>
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