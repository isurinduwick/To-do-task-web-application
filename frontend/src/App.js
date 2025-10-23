import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import AddTaskForm from './components/AddTaskForm';
import TaskBox from './components/TaskBox';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Lorem ipsum aliquet ultricies",
      description: "Lorem ipsum at adipiscing sit unra dignissim rutrum et sed quis ipsum elit locus ac...",
      completed: false
    },
    {
      id: 2,
      title: "Lorem ipsum aliquet ultricies", 
      description: "Lorem ipsum at adipiscing sit unra dignissim rutrum et sed quis ipsum elit locus ac...",
      completed: false
    },
    {
      id: 3,
      title: "Lorem ipsum aliquet ultricies",
      description: "Lorem ipsum at adipiscing sit unra dignissim rutrum et sed quis ipsum elit locus ac...",
      completed: true
    }
  ]);

  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleAddTask = () => {
    if (newTask.title.trim() === '') return;
    
    const task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '' });
  };

  const handleMarkDone = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
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
        </div>
        
        <div className="content-container">
          <AddTaskForm 
            newTask={newTask}
            onInputChange={handleInputChange}
            onAddTask={handleAddTask}
          />
          <TaskBox 
            tasks={tasks}
            onMarkDone={handleMarkDone}
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
          />
        </div>
      </main>
    </div>
  );
}

export default App;