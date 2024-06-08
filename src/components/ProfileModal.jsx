// src/components/ProfileModal.jsx
import React from "react";
import "./ProfileModal.css";

function ProfileModal({ onEditProfile, onLogout }) {
  return (
    <div className="profile-modal">
      <button onClick={onEditProfile}>Edit Profile</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default ProfileModal;
