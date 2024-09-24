const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Enable CORS and JSON parsing for incoming requests
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect("mongodb+srv://moji:moji123@ispmwebo.n47d8.mongodb.net/InfoSec", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDB: ", err);
});

// Model definitions
const AdminModel = require('./models/admin');        // Import Admin model
const UserModel = require('./models/user');          // Import User model
const TaskModel = require('./models/task');          // Import Task model
const CourseModel = require('./models/course');      // Import Course model
const UserActivityModel = require('./models/userActivity'); // Import UserActivity model
const LoginModel = require('./models/credentials');  // Import Credentials model (for login)
const UserCompleteCoursesModel = require('./models/UserCompleteCourses');  // Import new model


// Handle login requests
let loginAttempts = {};  // Store attempts and lockout status by username

app.post('/login', async (req, res) => {
  const { username, password } = req.body; // Extract username and password from request body
  const currentTime = Date.now(); // Get the current time for lockout checks

  // Check if user has exceeded login attempts
  if (loginAttempts[username] && loginAttempts[username].lockUntil > currentTime) {
    const remainingTime = Math.ceil((loginAttempts[username].lockUntil - currentTime) / 1000);
    // Respond with a message indicating the account is locked and when to try again
    return res.status(403).json({ message: `Account is locked. Try again in ${remainingTime} seconds.` });
  }

  try {
    const user = await LoginModel.findOne({ username }); // Attempt to find the user by username

    // User not found or wrong password
    if (!user || user.password !== password) {
      // If login fails, initialize loginAttempts for the user if not already done
      loginAttempts[username] = loginAttempts[username] || { attempts: 0, lockUntil: null };
      loginAttempts[username].attempts += 1; // Increment login attempts

      // If attempts reach the limit (5), lock the account for 30 minutes
      if (loginAttempts[username].attempts >= 5) {
        loginAttempts[username].lockUntil = currentTime + 30 * 60 * 1000; // Lock for 30 minutes
        return res.status(403).json({ message: 'Account locked. Please try again in 30 minutes.' });
      }

      // Respond with a message indicating the login attempt failed
      return res.status(401).json({ message: `Login failed. Attempt ${loginAttempts[username].attempts}/5.` });
    }

    // Successful login: Reset attempts and log the user in
    loginAttempts[username] = { attempts: 0, lockUntil: null }; // Reset login attempts
    return res.json({ message: 'Login successful' }); // Respond with success message

  } catch (error) {
    // Handle any internal server errors
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// CRUD operations for Users
app.get('/users', async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// CRUD operations for Admins
app.get('/admins', async (req, res) => {
  try {
    const admins = await AdminModel.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins' });
  }
});

// CRUD operations for Tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// CRUD operations for Courses
app.get('/courses', async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// CRUD operations for User Activities
app.get('/userActivities', async (req, res) => {
  try {
    const activities = await UserActivityModel.find().populate('userId').populate('courseId');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user activities' });
  }
});

// CRUD operations for UserCompleteCourses (for the progress graph)
app.get('/userCompleteCourses', async (req, res) => {
  try {
    const userCompleteCourses = await UserCompleteCoursesModel.find();
    res.json(userCompleteCourses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user course progress' });
  }
});

// Server listening
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
