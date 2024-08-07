const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken')
const User= require('../models/User')

module.exports={
    generatAccessToken:function(user){
        
        return jwt.sign(
           { 

            username: user.username,
            email:user.email ,
            image:user.image,
            role:user.role
    
        },process.env.JWT_ACCESS_SECRET,{
            expiresI: '180s'
        })
    },

    generatRefreshToken:function(user){
        
        return jwt.sign(
           { name:user.name,
            role:user.role,
            img:user.img,
            sport:user.sport,
            email:user.email,
    
        },process.env.JWT_REFRESH_SECRET,{
            expiresI: '1d'
        })
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
            let accessToken=generatAccessToken(user);
            let refreshToken=generatRefreshToken(user);

            const updatedUser =
            await User.findByIdAndUpdate(user.id, {refreshToken},{new:true})
            

            return res.status(201).json( {auth:true, messege:'YAY! u r logged in',accessToken , refreshToken
            }) 


        }catch(err){
            console.log(err);
            
            res.status(500).json({err})
        }
    }
}