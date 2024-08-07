const { Router } = require('express');
const userRouter = new Router();
const {createUser,editUser,deleteUser,userList}=require("../controllers/user")

userRouter.post('/',createUser)
userRouter.put('/:id',editUser)
userRouter.delete('/:id',deleteUser)
userRouter.get('/',userList)


module.exports=userRouter