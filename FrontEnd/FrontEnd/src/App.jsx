// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Correct path for Navbar
import Content from './components/Content'; // Correct path for Content
import Login from './pages/Login'; // Correct path for Login page
import UserAccount from './pages/UserAccount'; // Correct path for User Account
import Admin from './pages/Admin'; // Correct path for Admin Account
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Display Navbar */}
        <Navbar />
        
        {/* Render different content based on the URL */}
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Content />} /> {/* Default home route */}
            <Route path="/login" element={<Login />} /> {/* Login page */}
            <Route path="/user-account" element={<UserAccount />} /> {/* User Account */}
            <Route path="/admin" element={<Admin />} /> {/* Admins Account */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
