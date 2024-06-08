import React from 'react';
import Login from './Login';
import './MainPage.css';

function MainPage({ onLogin }) {
  return (
    <div className="main-page">
      <div className="welcome-section">
        <h1>Welcome to Keeper App</h1>
        <p>The best place to keep your notes organized and accessible. Join us and start managing your notes efficiently.</p>
      </div>
      <Login onLogin={onLogin} />
    </div>
  );
}

export default MainPage;
