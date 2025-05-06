const express = require('express') 
const { userAuth } = require('../Middleware/Auth')
const User = require('../models/users')
const ConnectionModel = require('../models/connectionRequest')


const connectionRouter = express.Router() 


connectionRouter.post("/request/send/:status/:userId",userAuth,async(req,res)=>{

    try {
        
        const fromUserId = req.user._id 
        const toUserId = req.params.userId 
        const status = req.params.status 

        if(fromUserId == toUserId){
            throw new Error("both Id Same")
        } 

        const statusAllowed  = ["ignore","interested"] 

        if(!statusAllowed.includes(status)){
            throw new Error("Status Not Allowed")
        } 
        
        const toUserExists = await User.findById(toUserId) 

        if(!toUserExists){
            throw new Error("toUser Not Exits")
        } 

        const existingConnectionRecord = await ConnectionModel.find({$or:[
            {
                fromUserId,
                toUserId
            },
            {
                fromUserId:toUserId,
                toUserId:fromUserId
            }
        ]})

        if(existingConnectionRecord.length){
            return res.status(400).send("You have already connection")
        } 

        const connectionHandler = new ConnectionModel({
            fromUserId,
            toUserId,
            status
        }) 

        const connectionRes = await connectionHandler.save() 

        return res.status(200).json({
            success:true,
            message:`${req.user.firstName} ${status == "interested" ? "interested in" : status } ${toUserExists.firstName} Successfully!!`
        })



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

})
 

connectionRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try {
        
        const loggedInUser = req.user._id 
        const status = req.params.status 
        const requestId = req.params.requestId 

        const statusAllowed = ["accepted","rejected"] 

        if(!statusAllowed.includes(status)){
            throw new Error("This status not allowed")
        } 

        const connectionReq = await ConnectionModel.findOne({
            _id:requestId,
            toUserId:loggedInUser,
            status:"interested"
        })

        if(!connectionReq){
            throw new Error("Request Not Found")
        }

        connectionReq.status = status 
        await connectionReq.save() 
        
        return res.status(200).json({
            success:true,
            message:`you ${status} the request `
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})


module.exports = connectionRouter