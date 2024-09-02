const { Router } = require('express');
const userRouter = new Router();
const {createUser,editUser,deleteUser,userList,whatRole,allUsers,getUser}=require("../controllers/user")
const { protect } = require('../middleware/auth')

userRouter.post('/',createUser)
userRouter.put('/:id',editUser)
userRouter.delete('/:id',deleteUser)
userRouter.get('/',userList)
userRouter.get('/role/:id',whatRole)
userRouter.get('/getUser',getUser)
userRouter.get('/search',protect ,allUsers)

module.exports=userRouter