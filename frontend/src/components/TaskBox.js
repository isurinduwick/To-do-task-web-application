import React from 'react';
import { Check, CheckCheck, Loader2 } from 'lucide-react';

const TaskBox = ({
  tasks,
  onMarkDone,
  onDeleteTask,
  activeTasksCount,
  completedTasksCount,
  isLoading
}) => {
  return (
    <div className="task-box">
      {/* Task Box Header */}
      <div className="task-box-header">
        <h2 className="tasks-title">Tasks</h2>

        {/* Task Filter */}
        <div className="task-filter">
          <div className="filter-content">
            <div className="active-filter">
              <div className="active-dot" />
              <span className="active-text">{activeTasksCount} Active</span>
            </div>
            <div className="done-filter">
              <div className="done-dot" />
              <span className="done-text">{completedTasksCount} Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Container */}
      <div className="tasks-container">
        {isLoading && tasks.length === 0 ? (
          <div className="loading-indicator">
            <Loader2 size={24} className="spinner" />
            <span>Loading tasks...</span>
          </div>
        ) : tasks.length === 0 ? (
          <div className="no-tasks-message">No tasks available</div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
            >
              <div className="task-content">
                <div className="task-checkbox">
                  <div
                    className={`checkbox-circle ${
                      task.completed ? 'completed-checkbox' : ''
                    }`}
                  >
                    {task.completed && <Check size={12} color="#FFFFFF" />}
                  </div>
                </div>
                <div className="task-details">
                  <div className="task-item-title">{task.title}</div>
                  <div className="task-item-description">{task.description}</div>
                </div>
              </div>
              {!task.completed ? (
                <button
                  className="mark-done-button"
                  onClick={() => onMarkDone(task.id)}
                  disabled={isLoading}
                >
                  <Check size={14} color="#FFFFFF" />
                  <span className="mark-done-text">Mark Done</span>
                </button>
              ) : (
                <button
                  className="mark-done-button"
                  onClick={() => onDeleteTask(task.id)}
                  disabled={isLoading}
                >
                  <CheckCheck size={16} color="#FFFFFF" />
                  <span className="mark-done-text">Done</span>
                </button>
              )}
            </div>
          ))
        )}
        {isLoading && tasks.length > 0 && (
          <div className="loading-overlay">
            <Loader2 size={24} className="spinner" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskBox;