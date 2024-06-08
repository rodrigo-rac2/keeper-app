// src/components/Header.jsx

import React from "react";
import "./Header.css";
import UserInfo from "./UserInfo";

function Header({ user, onLogout }) {
  return (
    <header>
      <h1>Keeper App</h1>
      {user && <UserInfo user={user} onLogout={onLogout} />}
    </header>
  );
}

export default Header;
