import React, { useState } from 'react';
import { validateTask, validateTaskLimit, VALIDATION_RULES } from '../utils/taskValidation';
import { useNotification } from '../hooks/useNotification';

const AddTaskForm = ({ newTask, onInputChange, onAddTask, taskCount, isLoading, totalTasksCount = 0 }) => {
  const [errors, setErrors] = useState({ title: [], description: [] });
  const [limitError, setLimitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const limitValidation = validateTaskLimit(taskCount, totalTasksCount);
    if (!limitValidation.isValid) {
      setLimitError(limitValidation.errors[0]);
      setErrors({ title: [], description: [] });
      return;
    }

    setLimitError('');
    
    const validation = validateTask(newTask);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({ title: [], description: [] });
    onAddTask();
  };

  return (
    <div className="add-task-form">
      <h2 className="add-task-title">Add a Task</h2>
      
      {limitError && (
        <div className="error-messages" style={{ marginBottom: '20px' }}>
          <p className="error-text" style={{ color: '#ff6b6b', fontWeight: 'bold' }}>{limitError}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <label className="form-label title-label">Title</label>
        <input 
          type="text" 
          className="title-input" 
          placeholder="Enter task title..."
          name="title"
          value={newTask.title}
          onChange={onInputChange}
          maxLength={VALIDATION_RULES.TITLE_MAX_LENGTH}
          disabled={isLoading}
        />
        <div className="char-count">{newTask.title.length}/{VALIDATION_RULES.TITLE_MAX_LENGTH}</div>
        {submitted && errors.title.length > 0 && (
          <div className="error-messages">
            {errors.title.map((error, idx) => (
              <p key={idx} className="error-text">{error}</p>
            ))}
          </div>
        )}
        
        <label className="form-label description-label">Description</label>
        <textarea 
          className="description-input" 
          placeholder="Enter task Description..."
          name="description"
          value={newTask.description}
          onChange={onInputChange}
          maxLength={VALIDATION_RULES.DESCRIPTION_MAX_LENGTH}
          disabled={isLoading}
        />
        <div className="char-count">{newTask.description.length}/{VALIDATION_RULES.DESCRIPTION_MAX_LENGTH}</div>
        {submitted && errors.description.length > 0 && (
          <div className="error-messages">
            {errors.description.map((error, idx) => (
              <p key={idx} className="error-text">{error}</p>
            ))}
          </div>
        )}
        
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