const express = require('express') 
const { userAuth } = require('../Middleware/Auth')
const ConnectionModel = require('../models/connectionRequest')

const userRouter = express.Router() 



userRouter.get("/request/recived",userAuth,async(req,res)=>{
    try {
        
        const loggedInUser = req.user._id 

        const recivedReq = await ConnectionModel.find({
            toUserId:loggedInUser,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName"]).select('-toUserId')


        if(!recivedReq.length){
            return res.status(200).json({
                success:true,
                message:"No any request recived"
            })
        }

        return res.status(200).json({
            success:true,
            recivedReq
        })

    } catch (error) {
        
    }
})

userRouter.get("/connection",userAuth,async(req,res)=>{
    try {
        
        const loggedInUser = req.user._id 

        const connection = await ConnectionModel.find({
            $or:[
                {
                    fromUserId:loggedInUser,
                    status:"accepted"
                },
                {
                    toUserId:loggedInUser,
                    status:"accepted"
                }
            ]
        }).populate("fromUserId",["firstName","lastName","gender","photoUrl","about","skills"]).populate("toUserId",["firstName","lastName","gender","photoUrl","about","skills"])

        if(!connection.length){
            return res.status(200).json({
                success:true,
                message:"No any Connection Found !! Please send friend Request"
            })
        }

        const data = connection.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser.toString()){
                return row.toUserId
            }else{
                return row.fromUserId
            }
        })

        return res.status(200).json({
            success:true,
            data
        })


    } catch (error) {
        
    }
})

module.exports = userRouter