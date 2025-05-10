import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addFeedUser } from '../utils/feedUsers'

const Feed = () => {
  
  const dispatch = useDispatch()

  const fetchFeedUsers  = async() => {
    try {
      const res = await axios.get(BASE_URL + "/feed",{withCredentials:true})
      dispatch(addFeedUser(res.data.data))
    } catch (error) {
        console.log(error.response)
    }
  } 

  useEffect(()=>{
    fetchFeedUsers()
  },[])
  
  return (
    <div>Feed</div>
  )
}

export default Feed