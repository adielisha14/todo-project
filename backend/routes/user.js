const { Router } = require('express');
const userRouter = new Router();
const userController=require("../controllers/user")

userRouter.post('/',userController.createUser)
userRouter.put('/:id',userController.editUser)
userRouter.delete('/:id',userController.deleteUser)
userRouter.get('/',userController.userList)


module.exports=userRouter