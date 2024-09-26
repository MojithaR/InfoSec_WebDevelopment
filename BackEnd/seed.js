/*const mongoose = require('mongoose');
const AdminModel = require('./models/admin');
const UserModel = require('./models/user');
const TaskModel = require('./models/task');
const CourseModel = require('./models/course');
const UserCompleteCoursesModel = require('./models/UserCompleteCourses');  // Import the new model

mongoose.connect("mongodb+srv://moji:moji123@ispmwebo.n47d8.mongodb.net/InfoSec")
  .then(async () => {
    console.log("Connected to MongoDB");

    // Sample Admins
    const adminExists = await AdminModel.findOne({ email: 'admin1@example.com' });
    if (!adminExists) {
      await AdminModel.create([
        { name: 'admin1', email: 'admin1@example.com', position: 'IT Manager', department: 'IT', lastaccess: "2024-09-24" },
        { name: 'admin2', email: 'admin2@example.com', position: 'Asst IT Manager', department: 'IT', lastaccess: "2024-09-20" }
      ]);
    } else {
      console.log('Admin data already exists. Skipping admin data creation.');
    }

    // Sample Users
    const userExists = await UserModel.findOne({ userid: 'IT01' });
    if (!userExists) {
      await UserModel.create([
        { userid: 'IT01', username: 'user1', email: 'user1@example.com', department: 'IT', lastaccess: '2024-09-20', status: 'complete' },
        { userid: 'IT02', username: 'Nimal Bandara', email: 'nimab@infosec.org.com', department: 'IT', lastaccess: '2024-09-24', status: 'completing' },
        { userid: 'HR01', username: 'Mayumi Ranasinghe', email: 'mayu@infosec.org.com', department: 'HR', lastaccess: '2024-09-21', status: 'missed' }
      ]);
    } else {
      console.log('User data already exists. Skipping user data creation.');
    }

    // Sample Courses
    const courseExists = await CourseModel.findOne({ courseId: 'CBS' });
    if (!courseExists) {
      await CourseModel.create([
        { courseId: 'CBS', title: 'Cybersecurity Basics', description: 'Learn the basics of cybersecurity.' },
        { courseId: 'ANT', title: 'Advanced Networking', description: 'Dive deeper into networking concepts.' }
      ]);
    } else {
      console.log('Course data already exists. Skipping course data creation.');
    }

    // Sample User Course Progress (UserCompleteCourses)
    const user1 = await UserModel.findOne({ username: 'user1' });
    const user2 = await UserModel.findOne({ username: 'Nimal Bandara' });
    const course1 = await CourseModel.findOne({ title: 'Cybersecurity Basics' });
    const course2 = await CourseModel.findOne({ title: 'Advanced Networking' });

    const progressExists = await UserCompleteCoursesModel.findOne({ username: 'user1', courseName: 'Cybersecurity Basics' });
    if (!progressExists && user1 && course1) {
      await UserCompleteCoursesModel.create([
        { userId: user1._id, username: user1.username, courseId: course1._id, courseName: course1.title, courseProgress: 50 },
        { userId: user1._id, username: user1.username, courseId: course2._id, courseName: course2.title, courseProgress: 75 },
        { userId: user2._id, username: user2.username, courseId: course1._id, courseName: course1.title, courseProgress: 80 },
        { userId: user2._id, username: user2.username, courseId: course2._id, courseName: course2.title, courseProgress: 60 },
        { userId: user3._id, username: user2.username, courseId: course1._id, courseName: course1.title, courseProgress: 60 },
        { userId: user3._id, username: user2.username, courseId: course2._id, courseName: course2.title, courseProgress: 60 },
      ]);
    } else {
      console.log('User progress data already exists. Skipping progress data creation.');
    }

    console.log("Sample data imported!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB: ", err);
  }); */

const mongoose = require('mongoose');
const AdminModel = require('./models/admin');
const UserModel = require('./models/user');
const TaskModel = require('./models/task');
const CourseModel = require('./models/course');
const UserCompleteCoursesModel = require('./models/UserCompleteCourses'); // Import the new model

mongoose.connect("mongodb+srv://moji:moji123@ispmwebo.n47d8.mongodb.net/InfoSec")
  .then(async () => {
    console.log("Connected to MongoDB");

    // Sample Admins
    const adminExists = await AdminModel.findOne({ email: 'admin1@example.com' });
    if (!adminExists) {
      await AdminModel.create([
        { name: 'admin1', email: 'admin1@example.com', position: 'IT Manager', department: 'IT', lastaccess: "2024-09-24" },
        { name: 'admin2', email: 'admin2@example.com', position: 'Asst IT Manager', department: 'IT', lastaccess: "2024-09-20" }
      ]);
    } else {
      console.log('Admin data already exists. Skipping admin data creation.');
    }

    // Sample Users
    const userExists = await UserModel.findOne({ userid: 'IT01' });
    if (!userExists) {
      await UserModel.create([
        { userid: 'IT01', username: 'user1', email: 'user1@example.com', department: 'IT', lastaccess: '2024-09-20', status: 'complete' },
        { userid: 'IT02', username: 'Nimal Bandara', email: 'nimab@infosec.org.com', department: 'IT', lastaccess: '2024-09-24', status: 'completing' },
        { userid: 'HR01', username: 'Mayumi Ranasinghe', email: 'mayu@infosec.org.com', department: 'HR', lastaccess: '2024-09-21', status: 'missed' }
      ]);
    } else {
      console.log('User data already exists. Skipping user data creation.');
    }

    // Sample Courses
    const coursesData = [
      { courseId: 'PPA', title: 'Password Policy Awareness', description: 'Basics about protecting users passwords.' },
      { courseId: 'AC', title: 'Access Control', description: 'Basics about Access Control systems.' },
      { courseId: 'BARP', title: 'Backup and Recovery Policy', description: 'How to manage data losses by backing up data.' },
      { courseId: 'DPPP', title: 'Data Protection and Privacy Policy', description: 'Users Data Protection mechanisms and Privacy Policies' }
    ];

    for (const course of coursesData) {
      const courseExists = await CourseModel.findOne({ courseId: course.courseId });
      if (!courseExists) {
        await CourseModel.create(course);
      } else {
        console.log(`Course with ID ${course.courseId} already exists. Skipping course creation.`);
      }
    }

    // Sample User Course Progress (UserCompleteCourses)
    const users = await UserModel.find(); // Fetch all users
    const courses = await CourseModel.find(); // Fetch all courses

    // Assign progress manually
    const userCoursesData = [
      { user: users[0], course: courses[0], progress: 50 },  // User1, Course1
      { user: users[0], course: courses[1], progress: 0 },   // User1, Course2
      { user: users[0], course: courses[2], progress: 90 },  // User1, Course3
      { user: users[0], course: courses[3], progress: 90 },  // User1, Course4

      { user: users[1], course: courses[0], progress: 80 },  // User2, Course1
      { user: users[1], course: courses[1], progress: 60 },  // User2, Course2
      { user: users[1], course: courses[2], progress: 0 },   // User2, Course3
      { user: users[1], course: courses[3], progress: 20 },  // User2, Course4

      { user: users[2], course: courses[0], progress: 60 },  // User3, Course1
      { user: users[2], course: courses[1], progress: 100 },  // User3, Course2
      { user: users[2], course: courses[2], progress: 0 },   // User3, Course3
      { user: users[2], course: courses[3], progress: 90 }   // User3, Course4
    ];

    for (const entry of userCoursesData) {
      const { user, course, progress } = entry;

      const progressExists = await UserCompleteCoursesModel.findOne({ userId: user._id, courseId: course._id });
      if (!progressExists) {
        await UserCompleteCoursesModel.create({
          userId: user._id,
          username: user.username,
          courseId: course._id,
          courseName: course.title,
          courseProgress: progress
        });
      } else {
        console.log(`Progress for User ${user.username} in Course ${course.title} already exists. Skipping progress creation.`);
      }
    }

    console.log("Sample User Complete Courses data imported!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB: ", err);
  });
