// src/components/Note.jsx
import React from "react";
import PropTypes from "prop-types";
import "./Note.css";

function Note(props) {
  const { title, content, onEdit, onDelete } = props;

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

Note.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Note;
