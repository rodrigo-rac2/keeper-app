// src/App.jsx
import React, { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Note from "./components/Note";
import Button from "./components/Button";
import MainPage from "./components/MainPage";
import notesData from "./modules/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [addingNote, setAddingNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [user, setUser] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [editNote, setEditNote] = useState({ title: "", content: "" });

  const handleAddNote = () => {
    setAddingNote(true);
  };

  const handleSaveNote = () => {
    setNotes([...notes, { key: notes.length + 1, ...newNote, user: user.email }]);
    setAddingNote(false);
    setNewNote({ title: "", content: "" });
  };

  const handleCancelNote = () => {
    setAddingNote(false);
    setNewNote({ title: "", content: "" });
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setNotes(notesData.filter(note => note.user === loggedInUser.email));
  };

  const handleLogout = () => {
    setUser(null);
    setNotes([]);
  };

  const handleEditNote = (noteKey) => {
    const noteToEdit = notes.find(note => note.key === noteKey);
    setEditNote({
      title: noteToEdit.title,
      content: noteToEdit.content
    });
    setEditingNote(noteKey);
  };

  const handleSaveEditNote = () => {
    setNotes(notes.map(note => 
      note.key === editingNote ? { ...note, ...editNote } : note
    ));
    setEditingNote(null);
    setEditNote({ title: "", content: "" });
  };

  const handleCancelEditNote = () => {
    setEditingNote(null);
    setEditNote({ title: "", content: "" });
  };

  const handleDeleteNote = (noteKey) => {
    setNotes(notes.filter(note => note.key !== noteKey));
  };

  if (!user) {
    return <MainPage onLogin={handleLogin} />;
  }

  return (
    <div data-testid="app-container">
      <Header user={user} onLogout={handleLogout} />
      <div className="notes-container">
        {notes.map(note => (
          editingNote === note.key ? (
            <div key={note.key} className="note edit-note-form">
              <input
                type="text"
                placeholder="Title"
                value={editNote.title}
                onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
              />
              <textarea
                placeholder="Content"
                value={editNote.content}
                onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
              />
              <div className="edit-note-buttons">
                <Button className="save" onClick={handleSaveEditNote}>Save</Button>
                <Button className="cancel" onClick={handleCancelEditNote}>Cancel</Button>
              </div>
            </div>
          ) : (
            <Note
              key={note.key}
              title={note.title}
              content={note.content}
              onEdit={() => handleEditNote(note.key)}
              onDelete={() => handleDeleteNote(note.key)}
            />
          )
        ))}
        <div className="note add-note-card">
          {addingNote ? (
            <div className="add-note-form">
              <input
                type="text"
                placeholder="Title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
              <textarea
                placeholder="Content"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              />
              <div className="add-note-buttons">
                <Button className="save" onClick={handleSaveNote}>Save</Button>
                <Button className="cancel" onClick={handleCancelNote}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="add-new-note" onClick={handleAddNote}>+</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
