<!-- USER
name str
email unique
password hash+salt
image str
rule




TODO
user id
title
description
category str
pinned boolean
status
end limit
created ? -->


Mongoose Models:
User Model Example:
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

Task Model Example:
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isComplete: { type: Boolean, default: false }
});

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  body: { type: String, required: true },
  todoList: [todoSchema],
  isPinned: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;


