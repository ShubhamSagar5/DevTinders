import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeSingleUser } from '../utils/feedUsers'

const UserCard = ({data}) => {
  

    const [showToast,setShowToast] = useState(false)
    const [toastMessage,setToastMessage] = useState("")
    const dispatch = useDispatch()
  
    const makeReqOrIngore = async(status,id) => {
      try {
        
        const res = await axios.post(BASE_URL + "/request/send/" +status+"/"+id,{},{withCredentials:true})
        if(res.data.success){
          setShowToast(true)
          setToastMessage(res.data.message)
          dispatch(removeSingleUser(id)) 
          setTimeout(() => {
            setShowToast(false)
                      setToastMessage("")
                  },2000)
        }
      } catch (error) {
        console.log(error)
      }
    }
  
  
  
  return (
    <div className="card bg-base-300 w-85 shadow-sm">
  <figure className='bg-red-200'>
    <img
      src={data.photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
   <p className='text-lg font-semibold'>{data.firstName +" "+ data.lastName}</p>
    <p>{data.about}</p>
    <div className="card-actions justify-center">
      <button className="btn btn-primary" onClick={()=>makeReqOrIngore("ignore",data._id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={()=>makeReqOrIngore("interested",data._id)}>Interested</button>
    </div>
  </div> 


 {showToast && <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>{toastMessage}</span>
  </div>
</div> }

</div>
  )
}

export default UserCard