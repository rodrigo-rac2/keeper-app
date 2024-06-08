// src/components/Note.jsx
import React from "react";
import "./Note.css";

function Note({ title, content, onEdit, onDelete }) {
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <div className="note-icons">
        <img src="./src/assets/icons8-edit.gif" alt="Edit" onClick={onEdit} />
        <img src="./src/assets/icons8-delete-100.png" alt="Delete" onClick={onDelete} />
      </div>
    </div>
  );
}

export default Note;
