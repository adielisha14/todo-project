const User = require('../models/User')
const hashP= require('../middleware/encrypt')


const userController = {

    createUser: async (req,res)=>{
        let pass=await hashP(req.body.password)
        /**אם יש תפקיד צריך להוסיף פה */
        
        try{
            const newUser = await User.create({...req.body,password:pass})
            res.status(201).json(newUser)
        }catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})
        }
    },

}



module.exports=userController