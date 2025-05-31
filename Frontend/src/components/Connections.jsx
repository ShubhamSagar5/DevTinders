import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addConnection } from '../utils/connection'
import { Link } from 'react-router-dom'

const Connections = () => {
  
    const [message,setMessage] = useState("") 

    const connection = useSelector((store)=>store.connection) 
    const dispatch = useDispatch()

    const fetchConnection = async() => {
        try {
            
            const res = await axios.get(BASE_URL+"/connection",{withCredentials:true})
            console.log(res)
            if(res.data.success){
                    setMessage(res?.data?.message)
                
                dispatch(addConnection(res.data.data))
            }

        } catch (error) {
            console.log(error)
        }
    }
  console.log(connection?.length)
    useEffect(()=>{
        if(!connection){
            console.log("print")
            fetchConnection()
        }
        
    },[]) 

 

    if(!connection?.length) return <p className='flex justify-center mt-7'>{message}</p>

    return (
    <div className='flex justify-center mt-7'>
    <div className='w-full'>
         <p className='text-lg w-1/2 mx-auto text-center'>Connection</p>
        <div className='mt-5 w-1/3 mx-auto'>
            {
                connection?.map((user)=>{
                    
                    const {firstName,lastName,photoUrl,about,gender,age} = user

                    return (
                        <div className='mt-2 flex justify-between items-center p-3 m-2 rounded-lg bg-base-300 '>
                        <div className='flex gap-4 items-center'>
                           <div className='w-14'><img className='rounded-full' src={photoUrl} alt="" /></div>
                        <div className=''><p className='font-semibold text-xl'>{firstName + " " + lastName}</p>
                           {age && gender && <p>{age+","+gender}</p>} 
                            <p className='text-sm'>{about}</p>
                            </div>  
                        </div>
                       
                            
                       <Link to={`/chat/${user._id}`}> <button className='rounded px-3 py-2 bg-primary cursor-pointer'>Chat</button></Link>
                        </div>
                    )
                })
            }
        </div>
    </div> 
       
        
    </div>
  )
}

export default Connections