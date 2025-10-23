import React from 'react';

const AddTaskForm = ({ newTask, onInputChange, onAddTask }) => {
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
        />
        
        <label className="form-label description-label">Description</label>
        <textarea 
          className="description-input" 
          placeholder="Enter task Description..."
          name="description"
          value={newTask.description}
          onChange={onInputChange}
        />
        
        <button type="submit" className="add-task-button">
          <span>+ Add Task</span>
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;