import React from "react";
import './Loading.css'; // Import the CSS file with the correct path

function Loading() {
  return (
    <div className="loading-container">
      <svg viewBox="0 0 240 240" height="240" width="240" className="loader">
        <circle strokeLinecap="round" strokeDashoffset="-330" strokeDasharray="0 660" strokeWidth="20" stroke="#000" fill="none" r="105" cy="120" cx="120" className="loader-ring loader-ring-a"></circle>
        <circle strokeLinecap="round" strokeDashoffset="-110" strokeDasharray="0 220" strokeWidth="20" stroke="#000" fill="none" r="35" cy="120" cx="120" className="loader-ring loader-ring-b"></circle>
        <circle strokeLinecap="round" strokeDasharray="0 440" strokeWidth="20" stroke="#000" fill="none" r="70" cy="120" cx="85" className="loader-ring loader-ring-c"></circle>
        <circle strokeLinecap="round" strokeDasharray="0 440" strokeWidth="20" stroke="#000" fill="none" r="70" cy="120" cx="155" className="loader-ring loader-ring-d"></circle>
      </svg>
      <h1>Loading...</h1>
    </div>
  );
}

export default Loading;
