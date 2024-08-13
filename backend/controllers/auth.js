const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
const User= require('../models/User');


const authController={
    generatAccessToken:function(user){
        
        return jwt.sign(
           { 

            username: user.username,
            email:user.email ,
            image:user.image,
            role:user.role,
            _id:user._id
    
        },process.env.JWT_ACCESS_SECRET,{
            expiresIn: '1d'
        });
    },

    login:async(req,res)=>{
        let email=req.body.email
        let password= req.body.password
        try{

            let user= await User.findOne({email:email})
            if(!user){
                return res.status(401).json( {err:"email is not found"})
            }
            let match= await bcrypt.compare(password,user.password)
            if (!match){
                return res.status(401).json( {err:'password is not valid'}) 

            }
            let accessToken=authController.generatAccessToken(user);

            const updatedUser =
            await User.findByIdAndUpdate(user.id, {accessToken},{new:true})
            

            return res.status(201).json( {auth:true, messege:'YAY! u r logged in',accessToken 
            }) 


        }catch(err){
            console.log(err);
            
            res.status(500).json({err})
        }
    },

    getPaylode: function (token) {
        const paylod=jwt.verify(token,process.env.JWT_ACCESS_SECRET)
        return paylod
        
    }
}

module.exports=authController