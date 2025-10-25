import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import '../styles/ValidationModal.css';

const ValidationModal = ({ isOpen, errors, onClose, title = 'Validation Error' }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-section">
            <AlertCircle className="modal-icon-error" size={24} />
            <h2 className="modal-title">{title}</h2>
          </div>
          <button 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {Array.isArray(errors) ? (
            <ul className="error-list">
              {errors.map((error, idx) => (
                <li key={idx} className="error-item">
                  <span className="error-bullet">•</span>
                  <span className="error-message">{error}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="error-message">{errors}</p>
          )}
        </div>

        <div className="modal-footer">
          <button 
            className="modal-button modal-button-primary"
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidationModal;
