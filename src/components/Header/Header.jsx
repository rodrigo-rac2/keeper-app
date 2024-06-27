// src/components/Header.jsx
import React from "react";
import PropTypes from "prop-types";
import UserInfo from "./UserInfo/UserInfo";
import "./Header.css";

function Header(props) {
  const { user, onLogout, onEditProfile } = props;
  return (
    <header>
      <h1>Keeper App</h1>
      {user && <UserInfo user={user} onLogout={onLogout} onEditProfile={onEditProfile} />}
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLogout: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
};

export default Header;
