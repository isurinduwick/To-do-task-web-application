import React, { useState, useEffect } from 'react';
import { Check, AlertCircle, Info, X } from 'lucide-react';
import '../styles/Toast.css';

const Toast = ({ id, message, type = 'success', onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'info':
        return <Info size={20} />;
      default:
        return <Check size={20} />;
    }
  };

  return (
    <div className={`toast toast-${type} ${isExiting ? 'toast-exit' : ''}`}>
      <div className="toast-icon">
        {getIcon()}
      </div>
      <div className="toast-message">
        {message}
      </div>
      <button className="toast-close" onClick={handleClose}>
        <X size={18} />
      </button>
    </div>
  );
};

export default Toast;
