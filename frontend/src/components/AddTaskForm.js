import React, { useState } from 'react';
import { validateTask, validateTaskLimit, VALIDATION_RULES } from '../utils/taskValidation';
import { useNotification } from '../hooks/useNotification';
import ValidationModal from './ValidationModal';
import '../styles/AddTaskForm.css';

const AddTaskForm = ({
  newTask,
  onInputChange,
  onAddTask,
  taskCount,
  isLoading,
  totalTasksCount = 0
}) => {
  const [errors, setErrors] = useState({ title: [], description: [] });
  const [showModal, setShowModal] = useState(false);
  const [modalErrors, setModalErrors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const { addNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Check task limit first
    const limitValidation = validateTaskLimit(taskCount, totalTasksCount);
    if (!limitValidation.isValid) {
      setModalErrors(limitValidation.errors);
      setShowModal(true);
      setErrors({ title: [], description: [] });
      return;
    }

    // Validate task content
    const validation = validateTask(newTask);

    if (!validation.isValid) {
      const allErrors = [...validation.errors.title, ...validation.errors.description];
      setErrors(validation.errors);
      setModalErrors(allErrors);
      setShowModal(true);
      return;
    }

    // All validations passed
    setErrors({ title: [], description: [] });
    setShowModal(false);
    onAddTask();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="add-task-form">
      <h2 className="add-task-title">Add a Task</h2>

      <form onSubmit={handleSubmit}>
        {/* Title Input Section */}
        <div className="form-group">
          <label className="form-label title-label">
            Title 
            <span className="required-asterisk">*</span>
            <span className="min-length-hint">(min 3 characters)</span>
          </label>
          <input
            type="text"
            className={`title-input ${submitted && errors.title.length > 0 ? 'input-error' : ''}`}
            placeholder="Enter task title..."
            name="title"
            value={newTask.title}
            onChange={onInputChange}
            maxLength={VALIDATION_RULES.TITLE_MAX_LENGTH}
            disabled={isLoading}
            aria-invalid={submitted && errors.title.length > 0}
          />
          <div className="char-count">
            {newTask.title.length}/{VALIDATION_RULES.TITLE_MAX_LENGTH}
          </div>
          {submitted && errors.title.length > 0 && (
            <div className="inline-error-messages">
              {errors.title.map((error, idx) => (
                <p key={idx} className="inline-error-text">
                  ⚠️ {error}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Description Input Section */}
        <div className="form-group">
          <label className="form-label description-label">
            Description
            <span className="required-asterisk">*</span>
          </label>
          <textarea
            className={`description-input ${submitted && errors.description.length > 0 ? 'input-error' : ''}`}
            placeholder="Enter task description..."
            name="description"
            value={newTask.description}
            onChange={onInputChange}
            maxLength={VALIDATION_RULES.DESCRIPTION_MAX_LENGTH}
            disabled={isLoading}
            aria-invalid={submitted && errors.description.length > 0}
          />
          <div className="char-count">
            {newTask.description.length}/{VALIDATION_RULES.DESCRIPTION_MAX_LENGTH}
          </div>
          {submitted && errors.description.length > 0 && (
            <div className="inline-error-messages">
              {errors.description.map((error, idx) => (
                <p key={idx} className="inline-error-text">
                  ⚠️ {error}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="add-task-button"
          disabled={isLoading}
        >
          <span>{isLoading ? 'Adding...' : '+ Add Task'}</span>
        </button>
      </form>

      {/* Validation Modal */}
      <ValidationModal
        isOpen={showModal}
        errors={modalErrors}
        onClose={handleCloseModal}
        title="Validation Error"
      />
    </div>
  );
};

export default AddTaskForm;