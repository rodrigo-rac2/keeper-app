import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Note from "../Note/Note";
import Button from "../Button/Button";
import MainPage from "../MainPage/MainPage";
import UserForm from "../User/UserForm";
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
    setErrorMessage(""); // Clear error message on successful registration
    setSuccessMessage("Registration successful!"); // Set success message
  };

  const handleEditProfile = (updatedUser) => {
    clearMessages();

    setUser(updatedUser);
    setEditingProfile(false);
    setErrorMessage("");
    setSuccessMessage("Profile updated successfully!");
  };

  const showSuccessMessage = () => {
    setSuccessMessage("");
    if (isRegistering) {
      setIsRegistering(false);
    } else if (editingProfile) {
      setEditingProfile(false);
    }
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
          errorMessage={errorMessage} // Pass the error message here
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
          showSuccessMessage={showSuccessMessage}
          isEditingProfile={false} // Not editing profile
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
          showSuccessMessage={showSuccessMessage}
          isEditingProfile={true} // Editing profile
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
            <div key={note.key} className="note edit-note-form">
              <input
                type="text"
                placeholder="Title"
                value={editNote.title}
                onChange={(e) =>
                  setEditNote({ ...editNote, title: e.target.value })
                }
              />
              <textarea
                placeholder="Content"
                value={editNote.content}
                onChange={(e) =>
                  setEditNote({ ...editNote, content: e.target.value })
                }
              />
              <div className="edit-note-buttons">
                <Button className="save" onClick={handleSaveEditNote}>
                  Save
                </Button>
                <Button className="cancel" onClick={handleCancelEditNote}>
                  Cancel
                </Button>
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
        )}
        <div className="note add-note-card">
          {addingNote ? (
            <div className="add-note-form">
              <input
                type="text"
                placeholder="Title"
                value={newNote.title}
                onChange={(e) =>
                  setNewNote({ ...newNote, title: e.target.value })
                }
              />
              <textarea
                placeholder="Content"
                value={newNote.content}
                onChange={(e) =>
                  setNewNote({ ...newNote, content: e.target.value })
                }
              />
              <div className="add-note-buttons">
                <Button className="save" onClick={handleSaveNote}>
                  Save
                </Button>
                <Button className="cancel" onClick={handleCancelNote}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="add-new-note" onClick={handleAddNote}>
              +
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
