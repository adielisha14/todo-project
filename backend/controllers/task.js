const Task = require('../models/Task');
const User = require('../models/User')
const {getPaylode,generatAccessToken}= require ('./auth')


const taskController = {

    createTask: async (req,res)=>{
        
        const userid=getPaylode(req.params.id)

        try{
            
            const newTask = await Task.create({...req.body, userId:userid.msg._id})
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

        if( !req.headers.authorization.startsWith('Bearer ')){
          
            return  res.status(401).json({auth:false, msg: "not a user"});
        }

        let token = req.headers.authorization.split(" ")[1]        
        const userid=getPaylode(token)
        
        // console.log("user********************\n");
        // console.log(userid.msg);
        if (userid.status){
            let newToken= generatAccessToken(userid)
            
            try{
                const allTasks= await Task.find({userId:userid.msg._id})
                 res.status(200).json({auth:true, msg:allTasks})
     
             }catch(err){
                 console.error("There is an error:",err)
                 res.status(500).json({err: err.message})
     
             } 

        }else{
            res.status(200).json({auth:false, msg: userid.msg});
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
    },

    // whatRole: async (req,res)=>{
    //     try {
    //         let user=  getPaylode(req.params.id)
    //         if (user.status){
    //             res.status(201).json(user.msg.role) 
    //         }else{
    //             res.status(201).json("gest") 
    //         }

    
    //     } catch (error) {
    //         console.error("There is an error:",err)
    //         res.status(500).json({err: err.message})
    //     }
    // }
}
module.exports=taskController