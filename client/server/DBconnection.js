// Import the mongoose library, which is used to interact with MongoDB
const mongoose = require('mongoose');

// Define an asynchronous function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to the MongoDB database using the provided connection string
        const conn = await mongoose.connect(
            'mongodb+srv://ISPM:eZkfeqOuNLjz0FnP@cluster0.sos43.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
        );

        // Log a message when the connection is successful
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // Log an error message if the connection fails and exit the process with a failure status
        console.error(error);
        process.exit(1);
    }
};

// Export the connectDB function so it can be used in other files
module.exports = connectDB;
