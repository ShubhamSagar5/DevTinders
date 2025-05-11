const jwt = require('jsonwebtoken') 
const User = require('../models/users')


const userAuth = async(req,res,next) => {
    try {
       
         const {token} = req.cookies 

    
    if(!token){
        return res.status(401).send("Invalid Token!! please Login")
    } 

    const decode = jwt.verify(token,"ThisisPrivateKey") 

    const user = await User.findById(decode.id) 

    if(!user){
        throw new Error("User Not Found Invalid Token Please Login again")
    }
 
    req.user = user

    next() 


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
   
} 

module.exports = {
    userAuth
}