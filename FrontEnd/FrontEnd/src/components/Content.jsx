import React from 'react';
import './Content.css';

const Content = () => {
  console.log("Content Component is rendering");
  return (
    <div className="content">
      <h1>Welcome to InfoSec Training!</h1>
      <p>This is the main content area. You can find useful courses and information about security.</p>
    </div>
  );
};

export default Content;