const express = require('express');
const { register, login } = require('../controllers/auth');

const router = express.Router();