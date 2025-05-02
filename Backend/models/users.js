
const mongoose = require('mongoose')
const validator= require('validator')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        minLength:3,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid")
            }
        
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is weak")
            }
        }
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender data is not allowed")
            }
        }
    },
    photoUrl:{
        type:String,
        trim:true,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwOVBmhdc2jcsiq5rULhg2UF06-0_2pq3-4g&s",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Url is not valid")
            }
        }

    },
    about:{
        type:String,
        trim:true,
        default:"This is default description of user"
    },
    skills:{
        type:[String],
        validate(value){
            if(value.length > 10 ){
                throw new Error("Skiils is not allowed more than 10")
            }
        }
    }

},{
    timestamps:true
})

const User = mongoose.model("user",userSchema)

module.exports = User