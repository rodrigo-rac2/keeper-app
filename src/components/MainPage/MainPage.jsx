// src/components/MainPage.jsx
import React from "react";
import PropTypes from "prop-types";
import Login from "./Login/Login";
import FeatureSection from "./FeatureSection/FeatureSection";
import addNoteScreenshot1 from "../../assets/add-note-screenshot-1.png";
import addNoteScreenshot2 from "../../assets/add-note-screenshot-2.png";
import editNoteScreenshot from "../../assets/edit-note-screenshot.png";
import deleteNoteScreenshot1 from "../../assets/delete-note-screenshot-1.png";
import deleteNoteScreenshot2 from "../../assets/delete-note-screenshot-2.png";
import userProfileScreenshot1 from "../../assets/user-profile-screenshot-1.png";
import userProfileScreenshot2 from "../../assets/user-profile-screenshot-2.png";
import "./MainPage.css";
import Footer from "../Footer/Footer";

function MainPage(props) {
  const { onLogin, onRegister, errorMessage } = props;

  return (
    <div className="main-page">
      <div className="intro-section">
        <div className="welcome-section">
          <h1>Welcome to Keeper App</h1>
          <p>
            The best place to keep your notes organized and accessible. Join us
            and start managing your notes efficiently.
          </p>
        </div>
        <div className="login-container">
          <Login onLogin={onLogin} onRegister={onRegister} />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
      <div className="features-section">
        <FeatureSection
          title="Adding a New Note"
          description="Quickly add new notes to keep track of all your tasks and ideas. Our simple interface makes it easy to stay organized."
          images={[addNoteScreenshot1, addNoteScreenshot2]}
        />
        <FeatureSection
          title="Editing Notes"
          description="Edit your notes effortlessly to keep them up-to-date. Delete them as needed. Our interface allows for quick and easy modifications to your notes."
          images={[
            editNoteScreenshot,
            deleteNoteScreenshot1,
            deleteNoteScreenshot2,
          ]}
        />
        <FeatureSection
          title="Viewing Your Profile"
          description="Access your profile to manage your personal information and settings. Easily update your profile to keep your information current."
          images={[userProfileScreenshot1, userProfileScreenshot2]}
        />
      </div>
      <Footer />
    </div>
  );
}

MainPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

export default MainPage;
