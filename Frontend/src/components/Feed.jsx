import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeedUser, removeSingleUser } from '../utils/feedUsers'
import { useNavigate } from 'react-router-dom'
import UserCard from './UserCard'

const Feed = () => {
  
  const dispatch = useDispatch() 
  const navigate = useNavigate()
  const [loader,setLoader] = useState(false)
  const user= useSelector((store)=>store.user)
  const feed= useSelector((store)=>store.feed)

  const fetchFeedUsers  = async() => {
    try {
      setLoader(true)
      const res = await axios.get(BASE_URL + "/feed",{withCredentials:true})
      dispatch(addFeedUser(res.data.data ))
    } catch (error) {
        console.log(error.response)
    }finally{
      setLoader(false)
    }
  }  

  
  

  useEffect(()=>{ 
    if(!feed){
      fetchFeedUsers()
    }
    
    if(!user){
      navigate("/login")
    }
  },[])
    console.log(feed)
    console.log(feed?.length <= 0)
    if(feed?.length <= 0 || feed == null ) return <p className='text-center mt-10'>No New Users Found</p>;
    
    
    
    
    if (loader) {
      return <div className="flex justify-center mt-10"><span className="loading loading-spinner loading-2xl text-5xl"></span></div>;
    }
    if(!feed) return; 
    
  return (
    <div className='mt-30'>
    <div className='flex justify-center my-[5%]'>
      { feed?.length > 0 &&<UserCard data ={feed[0]} /> }
    </div>
     
    </div>
  ) 
}

export default Feed