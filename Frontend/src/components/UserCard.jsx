import axios from 'axios'
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeSingleUser } from '../utils/feedUsers'

const UserCard = ({data}) => {
  

    const [showToast,setShowToast] = useState(false)
    const [toastMessage,setToastMessage] = useState("")
    const dispatch = useDispatch()
  
    const [loaderReq,setLoaderReq] = useState(false)
  const [loaderIng,setLoaderIng] = useState(false)
    const makeReqOrIngore = async(status,id) => {
      try {
        if(status == "ignore"){
          setLoaderIng(true)
        }else{
          setLoaderReq(true)
        }
        
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
      }finally{
        setLoaderIng(false)
        setLoaderReq(false)
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
   <p className='text-2xl md:text-lg font-semibold'>{data.firstName +" "+ data.lastName}</p>
    <p className='text-lg md:text-base'>{data.about}</p>
    <div className="card-actions justify-center mt-6 md:mt-0">
      <button className="btn btn-primary mr-5 md:mr-0" onClick={()=>makeReqOrIngore("ignore",data._id)}>{loaderIng ? (<span className="loading loading-spinner loading-xl"></span>) : "Ignore"}</button>
      <button className="btn btn-secondary" onClick={()=>makeReqOrIngore("interested",data._id)}>{loaderReq ? (<span className="loading loading-spinner loading-xl"></span>): "Interested"}</button>
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