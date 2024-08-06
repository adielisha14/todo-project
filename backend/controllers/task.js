const Task = require('../models/Task');
const User = require('../models/User')


const taskController = {

    createUser: async (req,res)=>{

        try{
            const newTask = await Task.create({...req.body,userId:pass})
            res.status(201).json(newTask)
        }catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})
        }
    },
}
module.exports=taskController
