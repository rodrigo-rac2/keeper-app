// src/components/Header.jsx
import React from "react";
import UserInfo from "./UserInfo/UserInfo";
import "./Header.css";

function Header({ user, onLogout, onEditProfile }) {
  return (
    <header>
      <h1>Keeper App</h1>
      {user && <UserInfo user={user} onLogout={onLogout} onEditProfile={onEditProfile} />}
    </header>
  );
}

export default Header;
