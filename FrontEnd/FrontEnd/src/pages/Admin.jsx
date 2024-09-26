import React, { useState, useEffect } from 'react';
import './Admin.css';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import axios from 'axios';
import Loading from './Loading'; // Import the Loading component
import AdminProfile from '../assets/AdminProfile.png'; // Import admin profile image
import AdmincreateUser from './AdmincreateUser'; // Adjust the import path if needed


ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

function Admin() {
  // States for storing fetched data
  const [showPopup, setShowPopup] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('bar'); // State for toggling chart type
  
  // States for Add User Popup
  const [addUserPopupOpen, setAddUserPopupOpen] = useState(false); // Popup visibility state
  const [newUser, setNewUser] = useState({
  userid: '',
  username: '',
  email: '',
  department: '',
  lastaccess: 0, // Initialize lastaccess to 0
});

// State for Remove User Popup
    const [removeUserPopupOpen, setRemoveUserPopupOpen] = useState(false);
    const [userIdToRemove, setUserIdToRemove] = useState('');
    const [removalMessage, setRemovalMessage] = useState('');


  //task form
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskLabel, setNewTaskLabel] = useState('Waiting');


  // Function to simulate minimum loading time (5 seconds)
  const simulateMinimumLoadingTime = async (fetchFunc, minTime = 5000) => {
    const fetchStart = Date.now();
    await fetchFunc();
    const fetchEnd = Date.now();
    const timeDifference = fetchEnd - fetchStart;
    if (timeDifference < minTime) {
      await new Promise(resolve => setTimeout(resolve, minTime - timeDifference));
    }
  };

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        await simulateMinimumLoadingTime(async () => {
          // Fetch admin details
          const adminResponse = await axios.get('http://localhost:3001/admins');
          setAdmin(adminResponse.data[0]);

          // Fetch tasks
          const taskResponse = await axios.get('http://localhost:3001/tasks');
          setTasks(taskResponse.data);

          // Fetch users
          const userResponse = await axios.get('http://localhost:3001/users');
          setUsers(userResponse.data);

          // Fetch user progress data
          const response = await axios.get('http://localhost:3001/userCompleteCourses');
          setProgressData(response.data);
        });
        setLoading(false); // Set loading to false after fetching all data
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle logout and update last access in the DB
  const handleLogout = async () => {
    // Store last access date and time in MongoDB
    try {
      await fetch('http://localhost:3001/api/admins/updateLastAccess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminId: admin._id, // Ensure you have admin's ID available
          lastAccess: new Date(), // Current date and time
        }),
      });

      // Perform logout logic (if applicable)
      // Clear any authentication tokens, etc.

      // Redirect to the login page
      window.location.href = "http://localhost:5173/login";
    } catch (error) {
      console.error("Error updating last access:", error);
      // Optionally handle error (e.g., show a notification)
    }
  };


    // Function to open the popup for creating a new admin
    const openPopup = () => {
      setShowPopup(true);  // Trigger the state to show the popup
    };

    // Conditionally render the popup
    {showPopup && <AdmincreateUser setShowPopup={setShowPopup} />}

 //labeling part
  const handleLabelChange = (id, newLabel) => {
    setTasks(tasks.map(task => task._id === id ? { ...task, label: newLabel } : task));
  };

  const addTask = async () => {
    const response = await fetch('http://localhost:3001/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTaskName, label: newTaskLabel }),
    });

    if (response.ok) {
      const updatedTasks = await response.json();
      setTasks(updatedTasks);
      setShowTaskForm(false);
      setNewTaskName('');
      setNewTaskLabel('Waiting');
    } else {
      console.error('Failed to add task');
    }
  };

  //User details table fetching
  // Handle opening Add User popup
    const handleAddUserClick = () => {
      setAddUserPopupOpen(true);
    };

    // Handle input change in the Add User form
    const handleInputChange = (e) => {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    // Handle form submission for adding a new user
    // Handle form submission for adding a new user
    const handleSubmitNewUser = async () => {
      try {
        // Send a POST request to the backend with the new user data
        await axios.post('http://localhost:3001/api/users', newUser); // Ensure this URL is correct
        setAddUserPopupOpen(false); // Close popup after submission
        setNewUser({ userid: '', username: '', email: '', department: '', lastaccess: 0 }); // Reset form data
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };

    // Handle closing Add User popup
    const handleClosePopup = () => {
      setAddUserPopupOpen(false);
    };
    
    //remove user 
    // Handle opening Remove User popup
    const handleRemoveUserClick = () => {
      setRemoveUserPopupOpen(true);
    };

    // Handle input change in the Remove User form
    const handleRemoveInputChange = (e) => {
      setUserIdToRemove(e.target.value);
    };

    // Handle form submission for removing a user
    const handleRemoveUser = async () => {
      try {
        const response = await axios.delete(`http://localhost:3001/api/users/${userIdToRemove}`);
        setRemovalMessage(`User ID ${userIdToRemove} successfully removed from the database.`);
        setUserIdToRemove(''); // Reset input
      } catch (error) {
        console.error('Error removing user:', error);
        setRemovalMessage(`Error removing user with ID ${userIdToRemove}.`);
      }
    };

    // Handle closing Remove User popup
    const handleCloseRemovePopup = () => {
      setRemoveUserPopupOpen(false);
      setRemovalMessage(''); // Clear message on close
    };


  // Data for the chart based on user progress
  const chartData = {
    labels: progressData.map(item => `${item.username} - ${item.courseName}`),  // Combine username and course name for labels
    datasets: [
      {
        label: 'Course Progress',
        data: progressData.map(item => item.courseProgress),  // Progress values
        backgroundColor: ['#76c7c0', '#ffb347', '#f39c12', '#76c7c0', '#ffb347', '#f39c12'],
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 1
      },
    ],
  };

  // Options for the chart
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#ccc' // Silver color for text labels
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ccc', // Silver color for X-axis labels
        }
      },
      y: {
        ticks: {
          color: '#ccc', // Silver color for Y-axis labels
        }
      }
    }
  };

  // Toggle chart type between Line and Bar
  const handleToggleChange = () => {
    setChartType(chartType === 'bar' ? 'line' : 'bar');
  };

  if (loading) {
    return <Loading />;  // Display loading spinner while data is being fetched
  }

  if (error) {
    return <div>{error}</div>;  // Display error message if there is an error fetching data
  }

  return (
    <div className="admin-page-container">
      {/* Admin Details Section */}
      <div className="admin-details-section">
        <div className="admin-info-container">
          <div className="admin-info">
            <h1>Admin Dashboard</h1>
            {admin && (
              <>
                <p>Name: {admin.name}</p>
                <p>Position: {admin.position}</p>
                <p>Department: {admin.department}</p>
                <p>Last Access: {new Date(admin.lastaccess).toLocaleString()}</p>
              </>
            )}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <button className="create-admin-button" onClick={openPopup}>Create New Admin</button>
          </div>
          <img
            src={AdminProfile}
            alt="Admin Profile"
            className="admin-profile-img"
            style={{ width: '120px', height: '120px', borderRadius: '50%' }}
          />
        </div>
        {/* Popup for creating new admin */}
        {showPopup && <AdmincreateUser setShowPopup={setShowPopup} />}
      </div>


      {/* Checklist Section */}
      <div className="checklist-section">
        <h2>Task Checklist</h2>

        {/* Add New Task Button */}
        <button
          title="Add New"
          className="add-new-checklist-button"
          onClick={() => setShowTaskForm(true)}
        >
          Add New Task
        </button>

        {/* Task Form */}
        {showTaskForm && (
          <div className="task-form">
            <input
              type="text"
              id="taskName"
              placeholder="Task Name"
              required
              value={newTaskName}
              onChange={e => setNewTaskName(e.target.value)}
              className="task-input" // Add a class for styling
            />
            <select
              id="taskLabel"
              value={newTaskLabel}
              onChange={e => setNewTaskLabel(e.target.value)}
              className="task-select" // Add a class for styling
            >
              <option value="Waiting">Waiting</option>
              <option value="Done">Done</option>
            </select>
            <button onClick={addTask} className="task-submit-button">Submit</button>
          </div>
        )}

        {/* Task List */}
        <div className="checklist-container">
          {tasks.map(task => (
            <div className="task-item" key={task._id}>
              <div>
                <p className="task-name">{task.name}</p>
              </div>
              <select
                className={`task-label ${task.label.toLowerCase()}`}
                value={task.label}
                onChange={e => handleLabelChange(task._id, e.target.value)}
              >
                <option value="Done">Done</option>
                <option value="Waiting">Waiting</option>
              </select>
            </div>
          ))}
        </div>
      </div>


      {/* User Detail Section */}
      <div className="user-detail-section">
        <h2>User Details</h2>

        {/* Add User button */}
        <button className="add-new-user-button" onClick={handleAddUserClick}>Add User</button>

        {/* User Table */}
        <table className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Last Access</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.userid}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>{new Date(user.lastaccess).toLocaleString()}</td>
                <td><span className={`status-label ${user.status.toLowerCase()}`}>{user.status}</span></td>
                <td>
                  <button className="remove-user-button" onClick={handleRemoveUserClick}>Remove</button>

                  <button className="view-user-button">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add User Popup */}
          {addUserPopupOpen && (
            <div className="popup-card">
              <div className="popup-content">
                <h3 style={{ color: 'black' }}>Add New User</h3>

                <label>User ID:</label>
                <input
                  type="text"
                  name="userid"
                  value={newUser.userid}
                  onChange={handleInputChange}
                  placeholder="User ID"
                />
                
                <label>User Name:</label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  placeholder="User Name"
                />
                
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Email "
                />
                
                <label>Department:</label>
                <input
                  type="text"
                  name="department"
                  value={newUser.department}
                  onChange={handleInputChange}
                  placeholder="Department "
                />

                <button className="submit-user-button" onClick={handleSubmitNewUser}>Submit</button>
                <button className="close-user-popup" onClick={handleClosePopup}>Close</button>
              </div>
            </div>
          )}

          {/* Remove User Popup */}
            {removeUserPopupOpen && (
              <div className="popup-card-remove">
                <div className="popup-content-remove">
                  <button
                    type="button"
                    onClick={handleCloseRemovePopup}
                    className="remove-close-button"
                  >
                    ×
                  </button>
                  <h3>Confirm Removal</h3>
                  <p>Confirm you want to remove this user by entering UserID:</p>
                  <input type="text" value={userIdToRemove} onChange={handleRemoveInputChange} placeholder="Enter UserID" />
                  <button className="submit-remove-button" onClick={handleRemoveUser}>Remove</button>
                  <button className="close-user-popup" onClick={handleCloseRemovePopup}>Close</button>
                  {removalMessage && <p>{removalMessage}</p>}
                </div>
              </div>
            )}



      </div>

      {/* Work Progress Graph Section */}
      <div className="work-progress-section">
        <h2>Overall User Work Progress</h2> <br/>

        {/* Toggle switch to change between Bar and Line chart */}
        <label className="switch" aria-label="Toggle Filter">
          <input type="checkbox" onChange={handleToggleChange} />
          <span>Bar chart</span>
          <span>Linear chart</span>
        </label>

        {/* Conditionally render Bar or Line chart based on toggle state */}
        {chartType === 'bar' ? (
          <Bar data={chartData} options={chartOptions} height={400} width={800} />
        ) : (
          <Line data={chartData} options={chartOptions} height={400} width={800} />
        )}
        
      </div>
    </div>
  );
}

export default Admin;
