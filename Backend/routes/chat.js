const express = require('express')
const { userAuth } = require('../Middleware/Auth')
const Chat = require('../models/chat')
 

const chatRouter = express.Router() 


chatRouter.get("/chat/:targetUserId",userAuth,async(req,res)=>{
    try {
        
        const {targetUserId} = req.params
        const loggedInUserId = req.user._id 

        let chat = await Chat.findOne({
            participants:{$all:[loggedInUserId,targetUserId]}
        }).populate({
            path:"message.senderId",
            select:"firstName lastName"
        })

        if(!chat){
            chat = new Chat({
                participants:[loggedInUserId,targetUserId],
                message:[]
            })
            
            await chat.save()
        }

        return res.status(200).json({
            success:true,
            data:chat
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error
        })
    }
}) 


module.exports = chatRouter