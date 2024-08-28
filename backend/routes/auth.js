const authController = require('../controllers/auth');

const { Router } = require('express');
const authRouter=new Router();

authRouter.post('/login',authController.login)
authRouter.post('/ForgotPassword',authController.ForgotPassword)
authRouter.post('/resetPassword',authController.resetPassword)

module.exports=authRouter
