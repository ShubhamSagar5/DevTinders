import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../utils/userSlice'
import BASE_URL from '../utils/constants'

const Login = () => {
  
    const [email,setEmail] = useState("rohit@gmail.com")
    const [password,setPassword] = useState("Rohit@123") 

    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const handleLogin = async() => {
      try {
        
        const res = await axios.post(BASE_URL+"/login",{
          email,
          password
        },{
          withCredentials:true
        })

        dispatch(addUser(res.data.data))
        navigate("/")

      } catch (error) {
        console.log(error.message)
      }
    }
  
  
  
    return (
    <div className='w-full flex justify-center my-[7rem]'>
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
  <legend className="fieldset-legend text-2xl">Login</legend>

  <label className="label text-lg">Email</label>
  <input type="email" className="input" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />

  <label className="label text-lg mt-5">Password</label>
  <input type="text" className="input" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />

  <button className="btn btn-outline btn-primary mt-6" onClick={handleLogin}>Login</button>
</fieldset> 
    </div>

   
  )
}

export default Login