const User = require('../models/User')
const {hashP}= require('../middleware/encrypt')


const userController = {

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
             await User.findOneAndDelete(req.params.id)
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
    }


}



module.exports=userController