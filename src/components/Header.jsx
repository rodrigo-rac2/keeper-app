// src/components/Header.jsx
import React from "react";
import UserInfo from "./UserInfo";
import "./Header.css";

function Header({ user, onLogout }) {
  return (
    <header>
      <h1>Keeper App</h1>
      {user && <UserInfo user={user} onLogout={onLogout} />}
    </header>
  );
}

export default Header;
