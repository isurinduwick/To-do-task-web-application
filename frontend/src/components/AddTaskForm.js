import React from 'react';

const AddTaskForm = ({ newTask, onInputChange, onAddTask, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask();
  };

  return (
    <div className="add-task-form">
      <h2 className="add-task-title">Add a Task</h2>
      
      <form onSubmit={handleSubmit}>
        <label className="form-label title-label">Title</label>
        <input 
          type="text" 
          className="title-input" 
          placeholder="Enter task title..."
          name="title"
          value={newTask.title}
          onChange={onInputChange}
          disabled={isLoading}
        />
        
        <label className="form-label description-label">Description</label>
        <textarea 
          className="description-input" 
          placeholder="Enter task Description..."
          name="description"
          value={newTask.description}
          onChange={onInputChange}
          disabled={isLoading}
        />
        
        <button 
          type="submit" 
          className="add-task-button"
          disabled={isLoading}
        >
          <span>{isLoading ? 'Adding...' : '+ Add Task'}</span>
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;