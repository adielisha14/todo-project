const bcrypt=require('bcrypt');
const jwt= require('jsonwebtoken');
const User= require('../models/User');
const {mail,htmlForgetPass}=require('../utils/mail')
const {uppdatePassword}= require('./user')
const {hashP}= require('../middleware/encrypt')



function getPaylode(token) {
    const payload= jwt.verify(token,process.env.JWT_ACCESS_SECRET,(err,user)=>{
        if(err){

           return {msg: err,status:false}
        }
        return  {msg:user,status:true}
    })
    return payload
}

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
            

            return res.status(201).json( {auth:true, messege:'YAY! u r logged in',accessToken ,
                 user:{username:updatedUser.username,email:updatedUser.email,
                    _id:updatedUser.id,image:updatedUser.image,role:updatedUser.role} }) 


        }catch(err){
            console.log(err);
            
            res.status(500).json({err})
        }
    },



    ForgotPassword: async(req,res)=>{
        let email=req.body.email
        console.log(email + "\n");
        
        try{

            let user= await User.findOne({email:email})
            if(!user){
                return res.status(401).json( {msg:"email not found",auth:false})
            }
            
            let token=jwt.sign({id:user.id},process.env.JWT_ACCESS_SECRET,{ expiresIn: '5m'})

            
            let reslt= await mail(email,"TodoIt: password reset", "",htmlForgetPass(`http://localhost:5173/ResetPassword?token=${token}`))
            if (reslt){
                return res.status(201).json( {auth:true,msg:"The email was sent successfully"})

            }


        }catch(err){
            console.log(err);
            

        }

    } ,

    resetPassword: async(req,res)=>{
        let check=req.body.check
        let token=req.body.token
  
        let checkToken= getPaylode(token)
        if (check){
            return checkToken.status?
                res.status(201).json( {auth:true,msg:"valid token"}):
                res.status(408).json( {auth:false,msg:checkToken.msg})
            
        }
        
        try{
            let pass=await hashP(req.body.pass1)
            const updatedPassword = await User.findByIdAndUpdate(checkToken.msg.id, {password:pass},{ new:true})
            
            res.status(200).json({auth:true,msg:"updated Password"})
        }
        catch(err){
            console.error("There is an error:",err)
            res.status(500).json({err: err.message})    
        }

    },

    refreshToken: async(req,res)=>{
        
    }
}

module.exports={...authController,getPaylode}