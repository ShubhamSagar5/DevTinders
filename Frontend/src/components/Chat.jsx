import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Chat = () => {
  
  const {targetUserId}  = useParams()

  const [data,setData] = useState([{message:"Hieelo"},{message:"hello"}])

  const [targetData,setTargetData] = useState()

  const getTargetUser = async() => {
    try {
      
      const res  = await axios.get(BASE_URL+`/profile/view?targetID=${targetUserId}`,{withCredentials:true})
      setTargetData(res.data?.data)
    } catch (error) {
      console.log(error)
    }
  }
  

  useEffect(()=>{
    getTargetUser()
  },[])

  console.log(targetData)
  return (
    <div className='mt-5 '>

      <div className='md:w-1/2 border mx-auto rounded-md'>
        <div className='text-center p-2'><p className='text-2xl'>Chat</p></div>
        <div className='border-t h-[65vh] overflow-y-auto p-2'>
          {
            data.map((mess,index)=>{
              return (
                <div key={index}>
                  <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={targetData?.photoUrl}
      />
    </div>
  </div>
  <div className="chat-bubble">{mess.message}</div>
</div>

                </div>
              )
            })
          }
        </div>
        <div className='border-t flex '>
            <input className='border w-9/12 m-2 p-2' type="text" name="" id="" />
            
            <div className='p-2 w-3/12'>
              <button className='bg-primary w-full p-2'>Send ✔ </button>
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default Chat