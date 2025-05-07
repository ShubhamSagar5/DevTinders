const express = require('express') 
const { userAuth } = require('../Middleware/Auth')
const ConnectionModel = require('../models/connectionRequest')
const User = require('../models/users')

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


userRouter.get("/feed",userAuth,async(req,res)=>{
    try {
        
        const loggedInUser = req.user._id 
        const page = parseInt(req.query.page) || 1 
        let limit = parseInt(req.query.limit) || 10 
        limit = limit > 50 ? 50 : limit 
        
        let skip = (page - 1) * limit

       

        const allConnection = await ConnectionModel.find({$or:[
            {
                fromUserId:loggedInUser
            },
            {
                toUserId:loggedInUser
            }
        ]
            
        }).select("fromUserId toUserId")

        const hiddenFromFeed = new Set() 

        allConnection.forEach((val)=>{
            hiddenFromFeed.add(val.fromUserId.toString())
            hiddenFromFeed.add(val.toUserId.toString())
        })

    const finalFeed = await User.find({$and:[
        {
            _id:{$nin:Array.from(hiddenFromFeed)}

        },
        {
            _id:{$ne:loggedInUser}
        }
    ]
    
    }).select("firstName lastName gender photoUrl about skills").skip(skip).limit(limit) 

    if(!finalFeed.length){
        return res.status(200).json({
            success:true,
            message:"Data not Available"
        })
    }

        return res.status(200).json({
            success:true,
            data:finalFeed
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})

module.exports = userRouter