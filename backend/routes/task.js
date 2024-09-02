const { Router } = require('express');
const taskRouter = new Router();
const {createTask,editTask,deleteTask,getTasks,taskListByConditions, unPin,complete}=require("../controllers/task")
const {protect}=require('../middleware/auth') 


taskRouter.get('/getall',protect,getTasks)
taskRouter.get('/getBy/:id',taskListByConditions)
taskRouter.put('/:id',editTask)
taskRouter.post('/:id',createTask)
taskRouter.delete('/:id',deleteTask)
taskRouter.patch('/unPin/:id',unPin)
taskRouter.patch('/complete/:id',complete)
module.exports=taskRouter

