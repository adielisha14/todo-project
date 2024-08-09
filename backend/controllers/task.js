const Task = require('../models/Task');
const User = require('../models/User')


const taskController = {

    createTask: async (req,res)=>{
        console.log("test fun ");
        

        try{
            
            const newTask = await Task.create({...req.body, userId:req.params.id})
            res.status(201).json(newTask)
            
        }catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})
        }
    },

    editTask: async (req,res)=>{
        console.log("enter fun 3");
        
        try{
            
            const newTask = await Task.findByIdAndUpdate(req.params.id,{ ...req.body,updated:Date.now()},{new:true})
            res.status(201).json(newTask) 

        }catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})
        }
    },

    deleteTask: async (req,res)=>{
        console.log(req.params.id);
        
        try{
            await Task.findOneAndDelete({_id:req.params.id})
           res.status(204).send()
            
       }catch(err){
           console.error("There is an error:",err)
           res.status(500).json({err: err.message})
       }

    },

    getTasks: async (req,res)=>{
        try{
            const allTasks= await Task.find({userId:req.params.id})
             res.status(200).json(allTasks)
 
         }catch(err){
             console.error("There is an error:",err)
             res.status(500).json({err: err.message})
 
         } 
    },

    taskListByConditions: async (req,res)=>{
        try{
            let conditions= req.body.conditions
            let sortConditions= req.body.sortConditions
           
            console.log(req);
            
            const allTasks= await Task.find({userId:req.params.id,[sortConditions]:conditions})
             res.status(200).json(allTasks)
 
         }catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})
            
         } 
    },
    // .sort({[sortConditions]:sort}) let sort= req.body.sort
    unPin: async (req,res)=>{
        try{
            let unPin=req.body.isPinned
            
            const newTask = await Task.findByIdAndUpdate(req.params.id,{isPinned:unPin},{new:true})
            res.status(201).json(newTask) 


        }catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})

        }
    },

    complete: async (req,res)=>{
        try{
            let complete=req.body.isComplete
            const newTask = await Task.findByIdAndUpdate(req.params.id,{isComplete:complete},{new:true})
            res.status(201).json(newTask) 


        }catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})

        }
    }
}
module.exports=taskController