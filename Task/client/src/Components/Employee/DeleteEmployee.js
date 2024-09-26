import React from "react";

const DeleteEmployee = ({ onConfirm, onCancel }) => {
  return (
    <div
      className="modal"
      style={{
        display: "block",
        background: "rgba(0,0,0,0.5)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <h1 className="bg-warning text-left py-2 px-4 w-100">Delete Employee</h1>

      <div
        className="modal-content"
        style={{
          margin: "auto",
          padding: "20px",
          background: "white",
          borderRadius: "5px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this employee?</p>
        <button className="btn btn-danger me-2" onClick={onConfirm}>
          Delete
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteEmployee;
