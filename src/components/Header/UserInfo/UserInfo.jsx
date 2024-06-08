// src/components/UserInfo.jsx
import React, { useState } from "react";
import "./UserInfo.css";
import ProfileModal from "./Modals/ProfileModal";

function UserInfo({ user, onLogout, onEditProfile }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="user-info">
      <div className="user-details" onClick={toggleModal}>
        <span>{user.fullname}</span>
        <img
          src="./src/assets/icons8-user-96.png"
          alt="User Icon"
          className="user-icon"
        />
      </div>
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
      {showModal && (
        <ProfileModal user={user} onEditProfile={onEditProfile} onLogout={onLogout} />
      )}
    </div>
  );
}

export default UserInfo;
