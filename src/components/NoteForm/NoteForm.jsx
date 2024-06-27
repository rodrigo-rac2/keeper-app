// src/components/NoteForm/NoteForm.jsx
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import './NoteForm.css';

function NoteForm(props) {
  const {
    note,
    onSave,
    onCancel,
    onChange,
    isEditing = false
  } = props;

  return (
    <div className={`note-form ${isEditing ? 'edit-note-form' : 'add-note-form'}`}>
      <input
        type="text"
        placeholder="Title"
        value={note.title}
        onChange={(e) => onChange({ ...note, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={note.content}
        onChange={(e) => onChange({ ...note, content: e.target.value })}
      />
      <div className="note-form-buttons">
        <Button className="save" onClick={onSave}>
          Save
        </Button>
        <Button className="cancel" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}

NoteForm.propTypes = {
  note: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
};

export default NoteForm;
