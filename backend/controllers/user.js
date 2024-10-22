const User = require('../models/User')
const {getPaylode,generatAccessToken}= require ('./auth')
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
            const newUser={username:editUser.username,email:editUser.email,
                _id:editUser.id,image:editUser.image,role:editUser.role}
            let newToken= generatAccessToken(newUser)
            res.status(201).json({token:newToken,user:newUser})

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
    },

    getUser: async (req,res)=>{

        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')){
          return  res.status(201).json({auth:false, msg:"gest"}) 

        }
        let token = req.headers.authorization.split(" ")[1] 
       
        const user=getPaylode(token)

        if (user.status){

            res.status(201).json(user)             
        }else{
                res.status(201).json("gest") 
        }
    },
    allUsers: async(req,res)=>{
        const keyword = req.query.search ? {
            $or: [
                {username: { $regex: req.query.search, $options:'i' }},
                {email: { $regex: req.query.search, $options:'i'}},
            ]
        }:{};
        console.log('Received request at /search with query:', req.query);

        const users = await User.find(keyword).find({_id:{$ne:req.user._id}})
        res.send(users)
    }




}



module.exports=userController