import React, { useState } from 'react';
import axios from 'axios';
import './AdminCreateUser.css';

function AdmincreateUser({ setShowPopup }) {
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    isAdmin: false,
  });

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [showShareButton, setShowShareButton] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAdmin({ ...newAdmin, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/admins', newAdmin);
      setStatusMessage({ type: 'success', text: 'New admin data stored in the database.' });
      setShowCredentials(true);
    } catch (error) {
      console.error('Error creating admin:', error);
      setStatusMessage({ type: 'error', text: 'Failed to store admin data.' });
    }
  };

  const generateCredentials = async () => {
    if (!newAdmin.name || !newAdmin.position || !newAdmin.department || !newAdmin.email) {
      setStatusMessage({ type: 'warning', text: 'Please fill out all the fields before generating credentials.' });
      return;
    }

    const randomPassword = Math.random().toString(36).slice(-8);
    const username = `admin${Math.floor(Math.random() * 1000)}`;

    setCredentials({ username, password: randomPassword });

    try {
      await axios.post('http://localhost:3001/generateCredentials', { username, password: randomPassword });
      setStatusMessage({ type: 'success', text: 'New admin credentials generated and stored in the database.' });
      setShowShareButton(true);
    } catch (error) {
      console.error('Error creating credentials:', error);
      setStatusMessage({ type: 'error', text: 'Failed to store credentials.' });
    }
  };

  const shareCredentials = () => {
    const mailtoLink = `mailto:${newAdmin.email}?subject=New Admin Credentials&body=Hello ${newAdmin.name},%0D%0A%0D%0AYou have been added as an administrator in the ${newAdmin.department} department with the position of ${newAdmin.position}.%0D%0A%0D%0AHere are your credentials:%0D%0AUsername: ${credentials.username}%0D%0APassword: ${credentials.password}%0D%0A%0D%0AThank you,%0D%0AAdmin Team`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button
          type="button"
          onClick={() => (window.location.href = 'http://localhost:5173/admin')}
          className="close-button"
        >
          ×
        </button>
        <h2>Create New Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newAdmin.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="position"
              placeholder="Position"
              value={newAdmin.position}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={newAdmin.department}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newAdmin.email}
              onChange={handleChange}
              required
            />
            {/*<div className="admin-checkbox">
              <input
                type="checkbox"
                name="isAdmin"
                checked={newAdmin.isAdmin}
                onChange={handleChange}
              />
              <span>Confirm details</span>
            </div>*/}
          </div>
          <div className="button-section">
            <button type="submit" className="styled-button">Create Admin</button>
            <button type="button" className="styled-button" onClick={generateCredentials}>Generate Credentials</button>
          </div>
        </form>

        {statusMessage && (
          <div className={`status-message ${statusMessage.type}`}>
            {statusMessage.text}
          </div>
        )}

        {showCredentials && (
          <div className="credentials-container">
            <h3>Generated Credentials</h3>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={credentials.username}
              readOnly
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={credentials.password}
              readOnly
            />
          </div>
        )}

        {showShareButton && (
          <button className="share-button" onClick={shareCredentials}>
            Share Credentials
          </button>
        )}
      </div>
    </div>
  );
}

export default AdmincreateUser;
