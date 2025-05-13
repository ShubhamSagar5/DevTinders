const express = require('express') 
const { validateSignUpData } = require('../utils/validateData')
const bcrypt = require('bcrypt')
const User = require('../models/users')

const authRouter = express.Router() 


authRouter.post("/signup",async(req,res)=>{
    try {
        
        const {firstName,lastName,email,password} = req.body 

        validateSignUpData(req)

        const hashPassword = await bcrypt.hash(password,10)

        const user = new User({
            firstName,
            lastName,
            email,
            password:hashPassword
        })

        const newUser = await user.save()  
        
        const token = await newUser.getJWT()

        return res.cookie("token",token,{expires:new Date(Date.now() + 1 *24 *60 * 60 * 1000),httpOnly:true}).status(200).json({
            success:true,
            message:"User Created Successfully",
            data:user
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        
        })
    }
})  


authRouter.post("/login",async(req,res)=>{
    try {
        
        const {email,password} = req.body 

        const user = await User.findOne({email:email})

        if(!user){
            throw new Error("User Not Found")
        } 

        const comparePassword = await user.validatePassword(password)

        if(comparePassword){
            const token = await user.getJWT() 

            return res.cookie("token",token,{expires:new Date(Date.now() + 1*24*60*60*1000),httpOnly:true}).status(200).json({
                success:true,
                message:`${user.firstName} Login Successfully`,
                data:user
            })


        } else{
            throw new Error("invalid credentilas")
        }

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        
        })
    }
})


authRouter.post("/logout",(req,res)=>{
    
    res.cookie("token",null,{expires:new Date(Date.now())}).send("Logout Successfully")

})

module.exports = authRouter