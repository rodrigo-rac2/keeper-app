// src/components/UserInfo.jsx
import React from "react";
import "./UserInfo.css";

function UserInfo({ user, onLogout }) {
  return (
    <div className="user-info">
      <div className="user-details">
        <span>{user.name}</span>
        <img src="./src/assets/icons8-user-96.png" alt="User Icon" className="user-icon" />
      </div>
      <button onClick={onLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default UserInfo;
