import React, { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Note from "./components/Note";
import Button from "./components/Button"; // Import the Button component
import notesData from "./modules/notes";

function App() {
  const [notes, setNotes] = useState(notesData);
  const [addingNote, setAddingNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const handleAddNote = () => {
    setAddingNote(true);
  };

  const handleSaveNote = () => {
    setNotes([...notes, { key: notes.length + 1, ...newNote }]);
    setAddingNote(false);
    setNewNote({ title: "", content: "" });
  };

  const handleCancelNote = () => {
    setAddingNote(false);
    setNewNote({ title: "", content: "" });
  };

  return (
    <>
      <Header />
      <div className="notes-container">
        {notes.map(note => (
          <Note key={note.key} title={note.title} content={note.content} />
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
    </>
  );
}

export default App;
