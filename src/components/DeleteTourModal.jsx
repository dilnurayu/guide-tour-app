import React from "react";
import "./DeleteTourModal.css";

const DeleteTourModal = ({ tour, onCancel, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete "{tour.title}"?</p>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTourModal;
