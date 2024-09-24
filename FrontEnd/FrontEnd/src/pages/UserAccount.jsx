import React, { useState } from 'react';
import './UserAccount.css';
import userProfile from '../assets/UserProfile.png';
import badge1 from '../assets/Hack_The_Box_Certificate-1.png';
import badge2 from '../assets/cybersecurity-fundamentals.png';
import certificate1 from '../assets/01 Coursera Foundations of Cybersecurity.pdf';
import certificate2 from '../assets/04 Coursera Assets Threats and Vulnerabilities.pdf';

function UserAccount() {
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Complete Vulnerability Assessment', dueDate: '2024-09-30', label: 'Working' },
    { id: 2, name: 'Update Security Policies', dueDate: '2024-10-10', label: 'Do it Later' },
    { id: 3, name: 'Review Incident Reports', dueDate: '2024-09-28', label: 'Completed' }
  ]);

  const handleLabelChange = (id, newLabel) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, label: newLabel } : task));
  };

  return (
    <div className="user-account-container">
      {/* Header */}
      <div className="user-account-header">
        <img src={userProfile} alt="User Profile" className="profile-image" />
        <div className="user-details">
          <h1 className="user-name">John Doe</h1>
          <p className="user-info">Department: Cybersecurity | Position: Analyst</p>
          <button className="logout-button">Logout</button>
        </div>
      </div>

      {/* Content Area */}
      <div className="user-content">
        {/* Task Checklist Section */}
        <div className="checklist-section">
          <h2>Task Checklist</h2>
          <div className="checklist-container">
            {tasks.map(task => (
              <div className="task-item" key={task.id}>
                <div>
                  <p className="task-name">{task.name}</p>
                  <p className="task-due-date">Due: {task.dueDate}</p>
                </div>
                <select
                  className={`task-label ${task.label.toLowerCase().replace(' ', '-')}`}
                  value={task.label}
                  onChange={e => handleLabelChange(task.id, e.target.value)}
                >
                  <option value="Working">Working</option>
                  <option value="Do it Later">Do it Later</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates Section */}
        <div className="certificates-section">
          <h2>Certificates</h2> <br />
          <div className="certificates-container">
            <div className="certificate">
              <a href={certificate1} target="_blank" rel="noopener noreferrer">
                <div className="certificate-card">
                  <p>Foundations of Cybersecurity</p>
                  <embed src={certificate1} className="pdf-viewer" type="application/pdf" />
                </div>
              </a>
              <button className="download-button">Download</button>
            </div>
            {/* extra certificates 
            <div className="certificate">
              <a href={certificate2} target="_blank" rel="noopener noreferrer">
                <div className="certificate-card">
                  <p>Assets Threats and Vulnerabilities</p>
                  <embed src={certificate2} className="pdf-viewer" type="application/pdf" />
                </div>
              </a>
              <button className="download-button">Download</button>
            </div>
            <div className="certificate">
              <a href={certificate2} target="_blank" rel="noopener noreferrer">
                <div className="certificate-card">
                  <p>Assets Threats and Vulnerabilities</p>
                  <embed src={certificate2} className="pdf-viewer" type="application/pdf" />
                </div>
              </a>
              <button className="download-button">Download</button>
            </div>
            */}
          </div>
        </div>

        {/* Badges Section */}
        <div className="badges-section">
          <h2>Badges</h2> <br />
          <div className="badges-container">
            <div className="badge">
              <img src={badge1} alt="Badge 1" className="badge-image" />
              <button className="download-button">Download</button>
            </div>
            <div className="badge">
              <img src={badge2} alt="Badge 2" className="badge-image" />
              <button className="download-button">Download</button>
            </div>
            <div className="badge">
              <img src={badge1} alt="Badge 1" className="badge-image" />
              <button className="download-button">Download</button>
            </div>
            <div className="badge">
              <img src={badge1} alt="Badge 1" className="badge-image" />
              <button className="download-button">Download</button>
            </div>
            <div className="badge">
              <img src={badge1} alt="Badge 1" className="badge-image" />
              <button className="download-button">Download</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
