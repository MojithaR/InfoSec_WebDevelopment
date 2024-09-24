import React, { useState, useEffect } from 'react';
import './Admin.css';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';
import axios from 'axios';
import Loading from './Loading'; // Import the Loading component

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

function Admin() {
  // States for storing fetched data
  const [admin, setAdmin] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('bar'); // State for toggling chart type

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

  const handleLabelChange = (id, newLabel) => {
    setTasks(tasks.map(task => task._id === id ? { ...task, label: newLabel } : task));
    // Optionally, update the task label in the backend here
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
          <button className="logout-button">Logout</button>
          <button className="create-admin-button">Create New Admin</button>
        </div>
      </div>

      {/* Checklist Section */}
      <div className="checklist-section">
        <h2>Task Checklist</h2>
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

      {/* User Detail Table */}
      <div className="user-detail-section">
        <h2>User Details</h2>
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
                  <button className="add-user-button">Add</button>
                  <button className="remove-user-button">Remove</button>
                  <button className="contact-user-button">Contact</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
