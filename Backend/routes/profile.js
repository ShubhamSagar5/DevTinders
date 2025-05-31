const express = require('express') 
const { userAuth } = require('../Middleware/Auth')
const { validateUpdateProfile, validatePassword } = require('../utils/validateData') 
const bcrypt = require('bcrypt')
const User = require('../models/users')


const profileRouter = express.Router() 

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try {
        
        let  user = req.query?.targetID || req.user 

        if(req.query?.targetID){
            
            user = await User.findById(user).select("-password")

        }

        return res.status(200).json({
            success:true,
            message:"User Profile ",
            data:user
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        
        })
    }
})

profileRouter.put("/profile/edit",userAuth,async(req,res)=>{
    try {
        
        const user = req.user 

        const data = req.body 

       if(!validateUpdateProfile(req)){
        throw new Error("You Not Allowed To Password Update")
       } 

       Object.keys(data).forEach((val)=> (user[val] = data[val])) 

        await user.save() 

       return res.status(200).json({
        success:true,
        message:"User Profile Update",
        data : user
    })
       



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        
        })
    }
})
 
profileRouter.patch("/profile/password",userAuth,async(req,res)=>{
    try {
        
        const user = req.user 
        const {password} = req.body

    if(!validatePassword(password)){
        throw new Error("Please Provide strong Password")
    } 

    const updatePassword = await bcrypt.hash(password,10) 

    user.password = updatePassword 

    await user.save()

    return res.status(200).json({
        success:true,
        message:"Password Update Successfully",
    })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        
        })
    }
})

module.exports = profileRouter