// src/components/ProfileModal.jsx
import React from "react";
import "./ProfileModal.css";

function ProfileModal({ user, onEditProfile, onLogout }) {
  return (
    <div className="profile-modal">
      <h2>Keeper App Account</h2>
      <p>{user.fullname}</p>
      <div className="modal-buttons">
        <button onClick={onEditProfile}>Edit Profile</button>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default ProfileModal;
