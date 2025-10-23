import React from 'react';
import { ListChecks, Circle, CheckCircle2 } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
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
        
        {/* All Tasks - Active State */}
        <div className="menu-item active">
          <div className="menu-item-content">
            <ListChecks size={18} color="#FFFFFF" />
            <span>All Tasks</span>
          </div>
          <div className="menu-count">10</div>
        </div>

        {/* Active */}
        <div className="menu-item">
          <div className="menu-item-content">
            <Circle size={18} color="#FFFFFF" />
            <span>Active</span>
          </div>
          <div className="menu-count">10</div>
        </div>

        {/* Completed */}
        <div className="menu-item">
          <div className="menu-item-content">
            <CheckCircle2 size={18} color="#FFFFFF" />
            <span>Completed</span>
          </div>
          <div className="menu-count">10</div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-header">
          <span>Progress</span>
          <span className="progress-percentage">33%</span>
        </div>
        
        <div className="progress-bar">
          <div className="progress-completed"></div>
        </div>
        
        <div className="progress-text">2 of 6 Tasks Completed</div>
      </div>
    </div>
  );
};

export default Sidebar;