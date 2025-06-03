const express = require('express')
const  dbConnection  = require("../db/db")
const cookieParser = require('cookie-parser') 
const authRouter = require("../routes/auth") 
const userRouter = require("../routes/user") 
const profileRouter = require("../routes/profile") 
const connectionRouter = require("../routes/connection")
const cors = require('cors')
const http  = require('http')
const initalizeSocketCoonection = require('../utils/socket')
const chatRouter = require('../routes/chat')
require('dotenv').config()


const app = express() 
  
app.use(cors({
    origin:"http://localhost:5173",
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials:true
}))
app.use(express.json()) 
app.use(cookieParser())

app.use("/",authRouter)
app.use("/",userRouter)
app.use("/",profileRouter)
app.use("/",connectionRouter)
app.use("/",chatRouter)


const server = http.createServer(app)
initalizeSocketCoonection(server)

dbConnection()
.then(()=>{
    server.listen(3000,()=>{
    console.log("server is listen on port 3000")
}) 
    console.log("Database connected successfully")
})
.catch((err)=>{
    console.log(err)
})

