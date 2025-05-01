const express = require('express')
const  dbConnection = require("../config/database")
const User = require('../models/users')
const app = express() 



app.post("/newUSer",async(req,res)=>{
    try {
        
        const user = new User({
            firstName:"hari",
            lastName:"hari",
            email:"hari@gmail.com",
            password:"123",
            gender:"male"
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
            message:error
        
        })
    }
})

app.patch("/userUpdate",async (req,res)=>{
    try {
        
        const user = await User.findByIdAndUpdate("68139c67d56e9f23f9f1ddf7",{password:"pqrstttt"},{new:true})
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

