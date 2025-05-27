
const mongoose = require("mongoose")


const dbConnection  = async() => {
    try {
        const connection = await mongoose.connect("mongodb+srv://s60889355:6kO3skMaRco7DaZs@cluster0.zwttd.mongodb.net/devTinder")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = dbConnection