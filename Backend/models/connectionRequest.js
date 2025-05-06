const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true

    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignore","interested","accepted","rejected"],
            message:`{VALUE} is Incorrected Status Type`
        }
    }
},{
    timestamps:true
})  

connectionRequestSchema.pre('save',function(next){
    const connectionReq = this 

    if(connectionReq.fromUserId.equals(connectionReq.toUserId)){
        throw new Error("You Cannot Send Request To Yourself")
    } 
    next()
})


const ConnectionModel = mongoose.model("connection",connectionRequestSchema) 

module.exports = ConnectionModel