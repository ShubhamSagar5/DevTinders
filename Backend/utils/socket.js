
const socket = require('socket.io')
const Chat = require('../models/chat')



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
        socket.on("sendMessage",async({loggedInUserId,targetUserId,firstName,textMessage,lastName})=>{

            try {
                
                 const roomId = [loggedInUserId,targetUserId].sort().join("_")
                // console.log(firstName + " " + textMessage)

                let chat = await Chat.findOne({
                    participants:{$all:[loggedInUserId,targetUserId]}
                })

                if(!chat){
                    chat = new Chat({
                        participants:[loggedInUserId,targetUserId],
                        message:[]
                    })
                }

                chat.message.push({
                    senderId:loggedInUserId,
                    text:textMessage
                })

                await chat.save()



             io.to(roomId).emit("messageRecived",{firstName,lastName,textMessage})


            } catch (error) {
                console.log(error)
            }

           
        })
        socket.on("disconnect",()=>{
             
        })
    })
 
}


module.exports = initalizeSocketCoonection