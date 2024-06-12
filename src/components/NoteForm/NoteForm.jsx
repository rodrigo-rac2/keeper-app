// src/components/NoteForm/NoteForm.jsx
import React from 'react';
import Button from '../Button/Button';
import './NoteForm.css';

function NoteForm({
  note,
  onSave,
  onCancel,
  onChange,
  isEditing = false
}) {
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

export default NoteForm;
