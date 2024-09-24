// src/components/LoginpageButtons.jsx
import React from 'react';
import './LoginpageButtons.css';

const LoginpageButtons = () => {
  return (
    <div className="button-container">
      <button type="submit" className="c-button c-button--gooey">
        Login
        <div className="c-button__blobs">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </button>

      <button
        type="button"
        onClick={() => alert('Forgot credentials functionality coming soon!')}
        className="c-button c-button--gooey forgot-credentials"
      >
        Forgot Credentials?
        <div className="c-button__blobs">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </button>
    </div>
  );
};

export default LoginpageButtons;
