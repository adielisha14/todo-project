const authController = require('../controllers/auth');

const { Router } = require('express');
const authRouter=new Router();

authRouter.post('/login',authController.login)

module.exports=authRouter