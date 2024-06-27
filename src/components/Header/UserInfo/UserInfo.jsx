// src/components/UserInfo.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./UserInfo.css";
import ProfileModal from "./Modals/ProfileModal";

function UserInfo(props) {
  const { user, onLogout, onEditProfile } = props;

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="user-info">
      <div className="user-details" onClick={toggleModal}>
        <span data-testid="modal-user-fullname">{user.fullname}</span>
        <img
          src="./src/assets/icons8-user-96.png"
          alt="User Icon"
          className="user-icon"
        />
      </div>
      <button data-testid="modal-logout-btn" onClick={onLogout} className="logout-button">
        Logout
      </button>
      {showModal && (
        <ProfileModal user={user} onEditProfile={onEditProfile} onLogout={onLogout} />
      )}
    </div>
  );
}

UserInfo.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLogout: PropTypes.func.isRequired,
  onEditProfile: PropTypes.func.isRequired,
};

export default UserInfo;
