import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import ShowButton from '../components/showbutton';
import LoginpageButtons from '../components/LoginpageButtons';
import useLoginSecurity from '../components/LoginSecurity';
import Loading from './Loading.jsx'; // Ensure this path and export are correct
import LoginBackground from '../assets/LoginBackground.jpg'; // Import the background image

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const { errorMessage, locked, lockTime, handleLoginError } = useLoginSecurity();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      handleLoginError({ response: { data: { message: `Please enter ${!username ? 'username' : 'password'}` } } });
      return;
    }

    try {
      setLoading(true); // Set loading to true when login starts
      const response = await axios.post('http://localhost:3001/login', { username, password });
      const { token } = response.data;

      // Save login info in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
      localStorage.setItem('tokenTimestamp', new Date().getTime());

      // Simulate a loading delay of 2 seconds before redirecting
      setTimeout(() => {
        setLoading(false); // Stop loading after 2 seconds
        if (username.includes('admin')) {
          navigate('/admin');
        } else {
          navigate('/user-account');
        }
      }, 2000);

    } catch (error) {
      setLoading(false); // Stop loading on error
      handleLoginError(error);
    }
  };

  return (
    <div className="login-page" style={{ backgroundImage: `url(${LoginBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
      {/* Loading component for showing a loading state */}
      {loading && <Loading />} {/* Show loading when in loading state */}

      {/* Login Form */}
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h1>
            Login
            <br /><br />
            {/* Close button added here, next to the Login title */}
            <button
              type="button"
              onClick={() => (window.location.href = 'http://localhost:5173/')}
              className="close-button"
            >
              ×
            </button>
          </h1>

          <div className="inputContainer">
            <input
              required
              className="customInput"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="inputLabel">Username</label>
          </div>
          <br />

          <div className="inputContainer password-container">
            <input
              required
              className="customInput"
              type={passwordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="inputLabel">Password</label>
            <ShowButton
              className="show-password"
              showPassword={passwordVisible}
              setShowPassword={setPasswordVisible}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {!locked ? (
            <LoginpageButtons />
          ) : (
            <>
              <p>Your account is locked. Try again in {lockTime} seconds.</p>
              <button onClick={() => alert('Please Contact Admin Via admin@example.com mail')} className="contact-admin">
                Contact Admin
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
