import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnectionRequest } from '../utils/connectionRequest'

const Request = () => {
  
    const [message,setMessage] = useState("")
    const dispatch = useDispatch()  
    const connectionRequest = useSelector((store)=>store.connectionRequest)

    const fetchConnectionRequest = async() => {
        try {
            
            const res = await axios.get(BASE_URL+"/request/recived",{withCredentials:true}) 
            console.log(res)
            if(res.data.success){
                setMessage(res.data.message)
                dispatch(addConnectionRequest(res.data.data))
            }

        } catch (error) {
            console.log(error)
        }
    }

  useEffect(()=>{
    if(!connectionRequest){
        fetchConnectionRequest()
    }
  },[])
  
  if(connectionRequest == null) return <p className='text-lg mt-7 text-center'>{message}</p>;

    return (
     <div className='flex justify-center mt-7'>
    <div className='w-full'>
         <p className='text-lg w-1/2 mx-auto text-center'>Connection Request</p>
        <div className='mt-5 w-1/3 mx-auto'>
            {
                connectionRequest?.map((user)=>{
                    
                    const {firstName,lastName,photoUrl,about,gender,age} = user.fromUserId

                    return (
                        <div className='mt-2 flex gap-4 items-center p-3 m-2 rounded-lg bg-base-300 '>
                        <div className='w-14'><img className='rounded-full' src={photoUrl} alt="" /></div>
                        <div className=''><p className='font-semibold text-xl'>{firstName + " " + lastName}</p>
                           {age && gender && <p>{age+","+gender}</p>} 
                            <p className='text-sm'>{about}</p>
                            </div>
                            <div className='flex gap-3'>
                                 <button className="btn btn-primary ">Accept</button>
      <button className="btn btn-outline btn-error">Reject</button>
                            </div>
                            

                        </div>
                    )
                })
            }
        </div>
    </div> 
       
        
    </div>
  )
}

export default Request