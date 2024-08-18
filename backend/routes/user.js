const { Router } = require('express');
const userRouter = new Router();
const {createUser,editUser,deleteUser,userList,whatRole}=require("../controllers/user")

userRouter.post('/',createUser)
userRouter.put('/:id',editUser)
userRouter.delete('/:id',deleteUser)
userRouter.get('/',userList)
userRouter.get('/role/:id',whatRole)


module.exports=userRouter