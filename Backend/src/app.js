const express = require('express')
const  dbConnection = require("../config/database")
const User = require('../models/users')
const app = express() 

app.use(express.json())

app.post("/newUSer",async(req,res)=>{
    try {
        
        const data = req.body

        const user = new User(data)

        await user.save() 

        return res.status(200).json({
            success:true,
            message:"User Created Successfully",
            data:user
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error
        
        })
    }
})

app.get("/user",async(req,res)=>{
    try {
        
        const users = await User.find({})

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
            message:error
        
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
            message:error
        
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

