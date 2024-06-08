// src/components/MainPage.jsx
import React from 'react';
import Login from './Login';
import './MainPage.css';

function MainPage({ onLogin, onRegister }) {
  return (
    <div className="main-page">
      <div className="welcome-section">
        <h1>Welcome to Keeper App</h1>
        <p>The best place to keep your notes organized and accessible. Join us and start managing your notes efficiently.</p>
      </div>
      <div className="login-container">
        <Login onLogin={onLogin} />
        <p>
          Not registered? <span className="signup-link" onClick={onRegister}>Sign up now!</span>
        </p>
      </div>
    </div>
  );
}

export default MainPage;
