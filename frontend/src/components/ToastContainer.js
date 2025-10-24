import React from 'react';
import Toast from './Toast';
import { useNotification } from '../hooks/useNotification';
import '../styles/ToastContainer.css';

const ToastContainer = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="toast-container">
      {notifications.map(notification => (
        <Toast
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
