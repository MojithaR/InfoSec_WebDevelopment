// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import user from '../assets/images/user.png';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const savedUsername = localStorage.getItem('username');

    setIsLoggedIn(loggedInStatus);
    setUsername(savedUsername || '');
  }, []);

  const handleLogout = () => {
    // Clear the local storage upon logout
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenTimestamp');
    
    // Update the state to reflect logged out status
    setIsLoggedIn(false);
    setUsername('');
    navigate('/login'); // Redirect to login page after logout
  };

  const linkClass = ({ isActive }) => (isActive ? 'link link-active' : 'link');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo Section */}
          <div className="logo-container">
            <span className="navbar-title" id="Navbar_WebpageName">
              InfoSec Training
            </span>
          </div>

          {/* Navigation Links */}
          <div className="elements-container">
            <NavLink exact="true" to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/courses" className={linkClass}>
              Courses
            </NavLink>
            <NavLink to="/contact" className={linkClass}>
              Contact Us
            </NavLink>
            {/* Conditional rendering for Login/Logout */}
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
              
              <div className="profile-section">
                <NavLink className="user-img" to="#" onClick={(e) => e.preventDefault()}>
                  <img className="profile-img" src={user} alt="User Profile" />
                </NavLink>
              </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
