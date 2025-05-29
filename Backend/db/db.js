
const mongoose = require("mongoose")


const dbConnection  = async() => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL)
    } catch (error) {
        console.log(error.message)
    }
}
 
module.exports = dbConnection  