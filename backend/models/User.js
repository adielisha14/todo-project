const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image:{ type: String, required: false}
  // role:{ type: String, required: true } צריך?

});

const User = mongoose.model('User', userSchema);
module.exports = User;

