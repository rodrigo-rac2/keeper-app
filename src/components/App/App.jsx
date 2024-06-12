// src/components/App/App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Note from "../Note/Note";
import Button from "../Button/Button";
import MainPage from "../MainPage/MainPage";
import UserForm from "../User/UserForm";
import NoteForm from "../NoteForm/NoteForm"; // Import the new NoteForm component
import notesData from "../../../fixtures/notes.json"; // Update path if necessary
import users from "../../../fixtures/users.json"; // Update path if necessary

function App() {
  const [notes, setNotes] = useState([]);
  const [addingNote, setAddingNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [user, setUser] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [editNote, setEditNote] = useState({ title: "", content: "" });
  const [isRegistering, setIsRegistering] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setNotes(notesData);
  }, []);

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleAddNote = () => {
    setAddingNote(true);
  };

  const handleSaveNote = () => {
    setNotes([
      ...notes,
      { key: notes.length + 1, ...newNote, user: user.email },
    ]);
    setAddingNote(false);
    setNewNote({ title: "", content: "" });
  };

  const handleCancelNote = () => {
    setAddingNote(false);
    setNewNote({ title: "", content: "" });
  };

  const handleLogin = (loggedInUser) => {
    clearMessages();
    const foundUser = users.find(
      (user) =>
        user.email === loggedInUser.email &&
        user.password === loggedInUser.password
    );
    if (foundUser) {
      setUser(foundUser);
      setNotes(notesData.filter((note) => note.user === foundUser.email));
      setErrorMessage(""); // Clear error message on successful login
    } else {
      setErrorMessage("Invalid credentials");
    }
  };

  const handleLogout = () => {
    clearMessages();
    setUser(null);
    setNotes([]);
  };

  const handleEditNote = (noteKey) => {
    clearMessages();

    const noteToEdit = notes.find((note) => note.key === noteKey);
    setEditNote({
      title: noteToEdit.title,
      content: noteToEdit.content,
    });
    setEditingNote(noteKey);
  };

  const handleSaveEditNote = () => {
    setNotes(
      notes.map((note) =>
        note.key === editingNote ? { ...note, ...editNote } : note
      )
    );
    setEditingNote(null);
    setEditNote({ title: "", content: "" });
  };

  const handleCancelEditNote = () => {
    setEditingNote(null);
    setEditNote({ title: "", content: "" });
  };

  const handleDeleteNote = (noteKey) => {
    clearMessages();

    setNotes(notes.filter((note) => note.key !== noteKey));
  };

  const handleRegister = (newUser) => {
    clearMessages();

    if (users.some((user) => user.email === newUser.email)) {
      setErrorMessage("Email already exists");
      return;
    }
    users.push(newUser);
    setErrorMessage("");
    setSuccessMessage("Registration successful!");

    setTimeout(() => {
      setSuccessMessage("");
      setIsRegistering(false);
    }, 3000);
  };

  const handleEditProfile = (updatedUser) => {
    clearMessages();
    setUser(updatedUser);
    setSuccessMessage("User updated!");

    setTimeout(() => {
      setSuccessMessage("");
      setEditingProfile(false);
    }, 3000);
  };

  if (!user && !isRegistering) {
    return (
      <div>
        <MainPage
          onLogin={handleLogin}
          onRegister={() => {
            clearMessages();
            setIsRegistering(true);
          }}
          errorMessage={errorMessage}
        />
      </div>
    );
  }

  if (isRegistering) {
    return (
      <div className="modal">
        <UserForm
          onSave={handleRegister}
          onCancel={() => {
            clearMessages();
            setIsRegistering(false);
          }}
          errorMessage={errorMessage}
          successMessage={successMessage}
          setErrorMessage={setErrorMessage}
          isEditingProfile={false}
        />
      </div>
    );
  }

  if (editingProfile) {
    return (
      <div className="modal">
        <UserForm
          user={user}
          onSave={handleEditProfile}
          onCancel={() => {
            clearMessages();
            setEditingProfile(false);
          }}
          isEditing
          errorMessage={errorMessage}
          successMessage={successMessage}
          setErrorMessage={setErrorMessage}
          isEditingProfile={true}
        />
      </div>
    );
  }

  return (
    <div data-testid="app-container">
      <Header
        user={user}
        onLogout={handleLogout}
        onEditProfile={() => {
          clearMessages();
          setEditingProfile(true);
        }}
      />
      <div className="notes-container">
        {notes.map((note) =>
          editingNote === note.key ? (
            <NoteForm
              key={note.key}
              note={editNote}
              onSave={handleSaveEditNote}
              onCancel={handleCancelEditNote}
              onChange={setEditNote}
              isEditing
            />
          ) : (
            <Note
              key={note.key}
              title={note.title}
              content={note.content}
              onEdit={() => handleEditNote(note.key)}
              onDelete={() => handleDeleteNote(note.key)}
            />
          )
        )}
        {addingNote ? (
          <NoteForm
            note={newNote}
            onSave={handleSaveNote}
            onCancel={handleCancelNote}
            onChange={setNewNote}
          />
        ) : (
          <div className="note add-note-container" onClick={handleAddNote}>
            <div className="add-new-note">+</div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
