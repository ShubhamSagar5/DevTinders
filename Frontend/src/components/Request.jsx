import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnectionRequest, removeSingleRequest } from '../utils/connectionRequest'

const Request = () => {
  
    const [message,setMessage] = useState("")
    const dispatch = useDispatch()  
    const connectionRequest = useSelector((store)=>store.connectionRequest)

    const [showTaost,setShowToast] = useState(false)
    const [toastMessage,setToastMessage] = useState("")

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

    const updateRequestStatus = async(status,id) => {
        
        try {
            
            const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+id,{},{withCredentials:true})

            if(res.data.success){
                setToastMessage(status)
                setShowToast(true)
                dispatch(removeSingleRequest(id)) 
                setTimeout(()=>{
                    setShowToast(false)
                    setToastMessage("")
                },2000)
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
                    const id = user._id
                    const {firstName,lastName,photoUrl,about,gender,age} = user.fromUserId

                    return (
                        <div key={id} className='mt-2 flex gap-4 items-center p-3 m-2 rounded-lg bg-base-300 '>
                        <div className='w-14'><img className='rounded-full' src={photoUrl} alt="" /></div>
                        <div className=''><p className='font-semibold text-xl'>{firstName + " " + lastName}</p>
                           {age && gender && <p>{age+","+gender}</p>} 
                            <p className='text-sm'>{about}</p>
                            </div>
                            <div className='flex gap-3'>
                                 <button className="btn btn-primary " onClick={()=>updateRequestStatus("accepted",id)}>Accept</button>
      <button className="btn btn-outline btn-error" onClick={()=>updateRequestStatus("rejected",id)}>Reject</button>
                            </div>
                            
                        </div>
                    )
                })
            }
        </div>
    </div> 
    {showTaost && <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Request {toastMessage} successfully.</span>
  </div>
</div> }
        
    </div>
  )
}

export default Request