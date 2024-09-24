const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },  // Adding email to match the unique index in your database
  position: { type: String, required: true },
  department: { type: String, required: true },
  lastaccess: { type: Date, default: Date.now }
});

const AdminModel = mongoose.model('Admin', AdminSchema);
module.exports = AdminModel;
