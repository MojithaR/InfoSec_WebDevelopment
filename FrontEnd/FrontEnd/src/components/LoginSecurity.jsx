// src/components/LoginSecurity.jsx
import { useState, useEffect } from 'react';

// Custom hook to manage login security
function useLoginSecurity() {
  // State variables for managing login security
  const [errorMessage, setErrorMessage] = useState(''); // To hold error messages
  const [attempts, setAttempts] = useState(0); // To count login attempts
  const [locked, setLocked] = useState(false); // To indicate if the account is locked
  const [lockTime, setLockTime] = useState(0); // To track how long the account is locked

  // Function to handle login errors
  const handleLoginError = (error) => {
    // Check if the error message indicates an account lock
    if (error.response && error.response.data.message.includes('Account locked')) {
      setLocked(true); // Lock the account
      setLockTime(30 * 60); // Set lock time to 30 minutes (in seconds)
    } else {
      // Set error message and increment attempts for failed login
      setErrorMessage(error.response?.data?.message || 'Login attempt failed. Try again.');
      setAttempts(attempts + 1); // Increment login attempts
    }
  };

  // Effect to manage the countdown timer for the lockout period
  useEffect(() => {
    if (locked && lockTime > 0) {
      const timer = setInterval(() => {
        setLockTime((prev) => prev - 1); // Decrease lock time every second
      }, 1000);
      // Clear interval when the component unmounts or lockTime changes
      return () => clearInterval(timer);
    }
  }, [locked, lockTime]);

  // Effect to handle token expiration after 15 minutes
  useEffect(() => {
    const tokenTimestamp = localStorage.getItem('tokenTimestamp'); // Get the timestamp of the token
    if (tokenTimestamp) {
      const now = new Date().getTime(); // Current time
      const timeDifference = (now - parseInt(tokenTimestamp)) / 1000; // Time difference in seconds
      // Check if the token has expired
      if (timeDifference >= 15 * 60) { // 15 minutes in seconds
        // Clear the stored user session information
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimestamp');
        setErrorMessage('Your session has expired. Please log in again.'); // Notify user
      }
    }
  }, []);

  // Return values and functions for managing login security
  return {
    errorMessage, // Error message to be displayed
    attempts, // Number of login attempts
    locked, // Account lock status
    lockTime, // Remaining lock time
    handleLoginError, // Function to handle login errors
  };
}

export default useLoginSecurity; // Export the custom hook


//Login Attempt Limiting using attempsts
//Account Locking using locked and locked time and setInterval
//Session Expiration using tokens and localStorage
//Error Handling using setErrorMessage