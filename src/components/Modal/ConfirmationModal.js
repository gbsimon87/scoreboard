import React from 'react';

const ConfirmationModal = ({ isOpen, closeModal, onConfirm }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Are you sure you want to finish the game?</h2>
        <div className="modal-buttons">
          <button className="modal-button" onClick={onConfirm}>
            Yes
          </button>
          <button className="modal-button" onClick={closeModal}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
