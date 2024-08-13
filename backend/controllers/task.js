const Task = require('../models/Task');
const User = require('../models/User')
const {getPaylode}= require ('./auth')


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
        
        try{
            
            const newTask = await Task.findByIdAndUpdate(req.params.id,{ ...req.body,updated:Date.now()},{new:true})
            res.status(201).json(newTask) 

        }catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})
        }
    },

    deleteTask: async (req,res)=>{
        
        try{
            await Task.findOneAndDelete({_id:req.params.id})
           res.status(204).send()
            
       }catch(err){
           console.error("There is an error:",err)
           res.status(500).json({err: err.message})
       }

    },

    getTasks: async (req,res)=>{
        const userid=getPaylode(req.params.id)
        console.log(userid);
        
        try{
            const allTasks= await Task.find({userId:userid._id})
             res.status(200).json(allTasks)
 
         }catch(err){
             console.error("There is an error:",err)
             res.status(500).json({err: err.message})
 
         } 
    },

    taskListByConditions: async (req,res)=>{
        const userid= getPaylode(req.params.id)
        try{
            let conditions= JSON.parse(req.query.conditions) 
            let sortConditions= req.query.sortby
            let sort= +req.query.sort
            delete conditions.conditions
            console.log(conditions);
            
       
            
            if(conditions !== 'undefined'){
                console.log("test");
                
                const allTasks= await Task.find({userId:userid._id,...conditions}).sort({[sortConditions]:sort})
                res.status(200).json(allTasks)
            }else{
                
                const allTasks= await Task.find({userId:userid._id}).sort({[sortConditions]:sort})
                res.status(200).json(allTasks)
            }

 
         }catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})
            
         } 
    },

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