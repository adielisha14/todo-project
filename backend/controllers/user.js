const User = require('../models/User')
const {getPaylode}= require ('./auth')
const {hashP}= require('../middleware/encrypt')


const userController = {
    
    uppdatePassword: async(req,res)=>{
        let pass=await hashP(req.body.password)
        try{
            const updatedPassword =
            await User.findByIdAndUpdate(req.params.id, {password:pass},{ new:true})
            res.status(200).json(updatedPassword)
        }
        catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})    
        }
    },

    createUser: async (req,res)=>{
        let pass=await hashP(req.body.password)

        try{
            const newUser = await User.create({...req.body,password:pass})
            res.status(201).json(newUser)
        }catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})
        }
    },

    editUser:async (req,res)=>{
        try{
            const editUser= await User.findByIdAndUpdate(req.params.id, req.body,{new:true})
            res.status(201).json(editUser)

        }catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})

        }
    },

    deleteUser:async (req,res)=>{
        try{
             await User.findOneAndDelete({_id:req.params.id})
            res.status(204).send()
             
        }catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})

        }

    },

    userList:async(req,res)=>{
        try{
           const allUsers= await User.find()
            res.status(200).json(allUsers)

        }catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})

        }
    },

    
    whatRole: async (req,res)=>{
        try {
            let user=  getPaylode(req.params.id)
            if (user.status){
                res.status(201).json(user.msg.role) 
            }else{
                res.status(201).json("gest") 
            }

    
        } catch (error) {
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})
        }
    }


}



module.exports=userController