
const socket = require('socket.io')



const initalizeSocketCoonection = (server) => {

    const io = socket(server,{
        cors:{
            origin:"http://localhost:5173"
        }
    }) 

    io.on("connection",(socket)=>{

        socket.on("joinChat",({loggedInUserId,targetUserId,firstName})=>{
            const room = [loggedInUserId,targetUserId].sort().join("_")
            socket.join(room)
            // console.log(firstName + "joining room id" +room)
        })
        socket.on("sendMessage",({loggedInUserId,targetUserId,firstName,textMessage})=>{

            const roomId = [loggedInUserId,targetUserId].sort().join("_")
                // console.log(firstName + " " + textMessage)
            io.to(roomId).emit("messageRecived",{firstName,textMessage})
        })
        socket.on("disconnect",()=>{
             
        })
    })
 
}


module.exports = initalizeSocketCoonection