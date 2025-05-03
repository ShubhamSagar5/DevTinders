const express = require('express')
const  dbConnection  = require("../db/db")
const User = require('../models/users')
const { validateSignUpData } = require('../utils/validateData')
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
const { userAuth } = require('../Middleware/Auth') 
const cookieParser = require('cookie-parser')

const app = express() 

app.use(express.json()) 
app.use(cookieParser())

app.post("/signup",async(req,res)=>{
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

        await user.save() 

        return res.status(200).json({
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

app.post("/login",async(req,res)=>{
    try {
        
        const {email,password} = req.body 

        const user = await User.findOne({email:email})

        if(!user){
            throw new Error("User Not Found")
        } 

        const comparePassword = await bcrypt.compare(password,user.password) 

        if(!comparePassword){
            throw new Error("invalid credentilas")
        } 

        const token = jwt.sign({id:user._id},"ThisisPrivateKey",{expiresIn:"1d"}) 



        return res.cookie("token",token,{expires:new Date(Date.now() + 1*24*60*60*1000),httpOnly:true}).status(200).json({
            success:true,
            message:`${user.firstName} Login Successfully`
        })



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        
        })
    }
})

app.get("/user",userAuth, async(req,res)=>{
    try {
        
        const users = await User.find()

        if(users.length == 0){
            return res.status(200).json({
                success:true,
                message:"No Users Found",
               
            })  
        }

        return res.status(200).json({
            success:true,
            message:"User List",
            users
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        
        })
    }
})

app.patch("/userUpdate",async (req,res)=>{
    try {
        const userId = req.body.userId 
        const data = req.body

        const allowedTypes = ["userId","firstName","lastName","password","gender","about","skills"]

        const isAllowed = Object.keys(data).every((val) => allowedTypes.includes(val)) 

        if(!isAllowed){
            return res.status(400).json({
                success:false,
                message:"User can not be update",
                
            })
    
        }

        const user = await User.findByIdAndUpdate(userId,data,{new:true,runValidators:true})
        return res.status(200).json({
            success:true,
            message:"User update Successfully",
            data:user
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        
        })
    }
}) 


app.delete("/user",async(req,res)=>{
    try {
        
        const userId = req.body.userId 

        const user = await User.findByIdAndDelete(userId)

        return res.status(200).json({
            success:true,
            message:"User Delete Successfully",
            data:user
        })


    }  catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        
        })
    }
})

dbConnection()
.then(()=>{
    app.listen(3000,()=>{
    console.log("server is listen on port 3000")
}) 
    console.log("Database connected successfully")
})
.catch((err)=>{
    console.log(err)
})

