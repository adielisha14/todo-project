const { Router } = require('express');
const taskRouter = new Router();
const {createTask,editTask,deleteTask,getTasks,taskListByConditions}=require("../controllers/task")


taskRouter.get('/getAll/:id',getTasks)
taskRouter.get('/getBy/:id',taskListByConditions)
taskRouter.put('/:id',editTask)
taskRouter.post('/:id',createTask)
taskRouter.delete('/:id',deleteTask)
module.exports=taskRouter

