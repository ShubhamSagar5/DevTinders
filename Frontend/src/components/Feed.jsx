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
  const user= useSelector((store)=>store.user)
  const feed= useSelector((store)=>store.feed)

  const fetchFeedUsers  = async() => {
    try {
      const res = await axios.get(BASE_URL + "/feed",{withCredentials:true})
      dispatch(addFeedUser(res.data.data ))
    } catch (error) {
        console.log(error.response)
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
  

  if(!feed) return; 

  if(feed.length <= 0 ) return <p className='text-center mt-10'>No New Users Found</p>;

  return (
    <div>
    <div className='flex justify-center my-[5%]'>
      { feed?.length > 0 &&<UserCard data ={feed[0]} /> }
    </div>
     
    </div>
  )
}

export default Feed