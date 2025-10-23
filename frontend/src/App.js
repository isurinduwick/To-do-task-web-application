import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import AddTaskForm from './components/AddTaskForm';
import TaskBox from './components/TaskBox';
import useTasks from './hooks/useTasks';

function App() {
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const { 
    tasks, 
    isLoading, 
    error, 
    actionInProgress, 
    addTask, 
    markTaskCompleted
  } = useTasks();

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

  return (
    <div className="app">
      <Sidebar />
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
            isLoading={actionInProgress}
          />
          <TaskBox 
            tasks={tasks}
            onMarkDone={markTaskCompleted}
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}

export default App;