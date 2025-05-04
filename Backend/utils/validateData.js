const validator = require('validator') 
const bcrypt = require("bcrypt") 


const validateSignUpData = (req) => {

    const {firstName,lastName,email,password} = req.body 

    if(!firstName || !lastName || !email || !password){
        throw new Error("All Fileds are required")
    }
    else if(!validator.isEmail(email)){
        throw new Error("Enter valid email")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password")
    }

} 

const validateUpdateProfile = (req) => {

    const allowedData  = ["firstName","lastName","email","gender","photoUrl","about","skills"]  

    const data = req.body 

    const isAllowed = Object.keys(data).every((keys)=> allowedData.includes(keys)) 
     
    return isAllowed


} 

const validatePassword = (newPassword) => {
console.log(newPassword)


    const isThisStrongPassword = validator.isStrongPassword(newPassword) 

   return isThisStrongPassword


}

module.exports = {
    validateSignUpData,
    validateUpdateProfile,
    validatePassword
}