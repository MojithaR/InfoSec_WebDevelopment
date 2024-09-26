// src/components/LoginpageButtons.jsx
import React, { useState } from 'react';
import './LoginpageButtons.css';

const LoginpageButtons = () => {
  // State to control the visibility of the popup
  const [showPopup, setShowPopup] = useState(false);
  const [userID, setUserID] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  // Function to handle Forgot Credentials button click
  const handleForgotCredentials = () => {
    setShowPopup(true); // Show the popup when button is clicked
  };

  // Function to close the popup
  const closePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  // Function to open WhatsApp with a pre-filled message
  const sendWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello, I need help with my login credentials. UserID: ${userID}, Name: ${name}, Dept: ${department}.`
    );
    window.open(`https://wa.me/+94781904889?text=${message}`, '_blank');
  };

  // Function to open Gmail with pre-filled email
  const sendEmail = () => {
    const subject = encodeURIComponent('Request for Username and Password');
    const body = encodeURIComponent(
      `Dear Admin,\n\nI would like to kindly request assistance with retrieving my username and password.\n\nDetails:\nUserID: ${userID}\nName: ${name}\nDepartment: ${department}\n\nThank you for your help.\n\nBest regards,\n${name}`
    );
    window.open(`mailto:admin@example.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="button-container">
      {/* Login Button */}
      <button type="submit" className="c-button c-button--gooey">
        Login
        <div className="c-button__blobs">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </button>

      {/* Forgot Credentials Button */}
      <button
        type="button"
        onClick={handleForgotCredentials}
        className="c-button c-button--gooey forgot-credentials"
      >
        Forgot Credentials?
        <div className="c-button__blobs">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </button>

      {/* Popup Component */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <div className="popup-header">
              <h2>Please Contact Administrator</h2>
            </div>
            <div className="popup-content">
              <p>To retrieve your username and password, please contact the administrator.</p>

              {/* Input fields for UserID, Name, and Department */}
              <input
                type="text"
                placeholder="Enter UserID"
                value={userID}
                onChange={(e) => setUserID(e.target.value)}
                className="popup-input"
              />
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="popup-input"
              />
              <input
                type="text"
                placeholder="Enter Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="popup-input"
              />

              <div className="popup-buttons">
                <button onClick={sendWhatsApp} className="popup-button whatsapp-button">
                  Send WhatsApp Message
                </button>
                <button onClick={sendEmail} className="popup-button email-button">
                  Send Email
                </button>
              </div>
              <button onClick={closePopup} className="close-button">×</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginpageButtons;
