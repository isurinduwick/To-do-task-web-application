import React from 'react';
import { ListChecks, Circle, CheckCircle2, X } from 'lucide-react';

const Sidebar = ({ tasks = [], sidebarOpen = false, onClose }) => {
  const totalTasksCount = tasks.length;
  const activeTasksCount = tasks.filter(task => !task.completed).length;
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const progressPercentage = totalTasksCount > 0 ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0;

  return (
    <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Close Button for Mobile */}
      <button 
        className="sidebar-close-btn"
        onClick={onClose}
        aria-label="Close sidebar"
      >
        <X size={20} />
      </button>

      {/* Logo Section */}
      <div className="logo-container">
        <div className="logo-square"></div>
        <div className="logo-text">
          <div className="logo-main">To do</div>
          <div className="logo-subtitle">Stay Organized</div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="divider"></div>

      {/* Menu Section */}
      <div className="menu-section">
        <div className="menu-title">Menu</div>
        
        {/* All Tasks */}
        <div className="menu-item active">
          <div className="menu-item-content">
            <ListChecks size={18} color="#FFFFFF" />
            <span>All Tasks</span>
          </div>
          <div className="menu-count">{totalTasksCount}</div>
        </div>

        {/* Active */}
        <div className="menu-item">
          <div className="menu-item-content">
            <Circle size={18} color="#FFFFFF" />
            <span>Active</span>
          </div>
          <div className="menu-count">{activeTasksCount}</div>
        </div>

        {/* Completed */}
        <div className="menu-item">
          <div className="menu-item-content">
            <CheckCircle2 size={18} color="#FFFFFF" />
            <span>Completed</span>
          </div>
          <div className="menu-count">{completedTasksCount}</div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-header">
          <span>Progress</span>
          <span className="progress-percentage">{progressPercentage}%</span>
        </div>
        
        <div className="progress-bar">
          <div className="progress-completed" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        
        <div className="progress-text">{completedTasksCount} of {totalTasksCount} Tasks Completed</div>
      </div>
    </div>
  );
};

export default Sidebar;