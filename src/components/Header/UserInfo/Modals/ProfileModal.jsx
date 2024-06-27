// src/components/ProfileModal.jsx
import React from "react";
import PropTypes from "prop-types";
import "./ProfileModal.css";

function ProfileModal(props) {
  const { user, onEditProfile, onLogout } = props;
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

ProfileModal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLogout: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
};

export default ProfileModal;
