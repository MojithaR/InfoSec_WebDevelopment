const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  lastaccess: { type: Date, default: Date.now },
  status: { type: String, required: true }
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
