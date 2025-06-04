import axios from 'axios'
import React, { useEffect, useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { createSocketConnection } from '../utils/socket'

const Chat = () => {
  
  const {targetUserId}  = useParams()

  const [data,setData] = useState([])

  const [targetData,setTargetData] = useState(null) 

  const [textMessage,setTextMessage] = useState("")


  const loggedInUser = useSelector((store)=>store?.user)

  const loggedInUserId = loggedInUser?._id
  const loggedInUserFirstName = loggedInUser?.firstName
  const loggedInUserLastName = loggedInUser?.lastName

  const getTargetUser = async() => {
    try {
      
      const res  = await axios.get(BASE_URL+`/profile/view?targetID=${targetUserId}`,{withCredentials:true})
      setTargetData(res.data?.data)
    } catch (error) {
      console.log(error)
    }
  }
  
  const handleSendMessage = () => {
    if(!textMessage){
      return ;
    }
    const socket = createSocketConnection() 
    socket.emit("sendMessage",({loggedInUserId,targetUserId,textMessage,firstName:loggedInUserFirstName,lastName:loggedInUserLastName}))
    setTextMessage("")
  }

  const fetchChat = async() => {
    try {
      
      const chat = await axios.get(BASE_URL+"/chat/"+targetUserId,{withCredentials:true}) 

      const messagSet = chat?.data?.data?.message 

      const finalData = messagSet?.map((mess)=>{
        return {
          firstName:mess.senderId.firstName,
          lastName:mess.senderId.lastName,
          message:mess.text

        }
      })
      setData(finalData)

    } catch (error) {
      console.log(error)
    }
  }

    const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [data]);

  useEffect(()=>{
    fetchChat()
  },[])

  useEffect(()=>{
    getTargetUser() 

    if(!loggedInUserId)
    {
      return; 
    }
    
    const socket = createSocketConnection()
    
    socket.emit("joinChat",{loggedInUserId,targetUserId,firstName:loggedInUserFirstName})

    socket.on("messageRecived",({firstName,lastName,textMessage})=>{
      // console.log(firstName + "frontend" + textMessage)
      setData((prev)=>[...prev,{firstName:firstName,lastName:lastName,message:textMessage}])
    })

  

    return () => {
      socket.disconnect()
    }

  },[loggedInUserId,targetUserId])
 

  return (
    <div className='mt-7 p-5 md:mt-2 md:p-0 '>

      <div className='md:w-1/2 border mx-auto rounded-md'>
        <div className='p-2 flex justify-between items-center'><p className='text-2xl'>Chat</p> </div>
        <div className='border-t h-[65vh] overflow-y-auto p-2'>
      {
        data.map((mess, index) => (
          <div key={index}>
            <div className={'chat ' + (loggedInUserFirstName === mess.firstName ? 'chat-end' : 'chat-start')}>
              <div className="chat-header ">
                {mess.firstName + ' ' + mess.lastName}
                
              </div>
              <div className="chat-bubble text-2xl md:text-[1.2rem]">{mess.message}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          </div>
        ))
      }

      {/* This dummy div helps scroll to bottom */}
      <div ref={messagesEndRef} className='bg-red-200' />
    </div>
        <div className='border-t flex '>
            <input className='border w-9/12 m-2 px-0.5 md:p-2 rounded-md bg-base-300 text-2xl md:text-sm' value={textMessage} onChange={(e)=>setTextMessage(e.target.value)} type="text" name="" id="" />
            
            <div className='p-2 w-3/12'>
              <button className='bg-primary w-full p-2 rounded-md' onClick={handleSendMessage}>Send ✔ </button>
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default Chat