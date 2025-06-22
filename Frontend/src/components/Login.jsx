import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../utils/userSlice'
import {BASE_URL} from '../utils/constants'
import { toast } from 'react-toastify'

const Login = () => {
  
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("") 
    const [error,setError] = useState("")
    const [isLoggedInForm,setIsLoggedinForm] = useState(true) 
    const [firstName,setFirstName]  = useState("") 
    const [lastName,setLastName] = useState("") 
    const [loader,setLoader] = useState(false)
    const  user = useSelector((store)=>store.user)

    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const handleLogin = async() => {
      try {
        setLoader(true)
        const res = await axios.post(BASE_URL+"/login",{
          email,
          password
        },{
          withCredentials:true
        })
        dispatch(addUser(res.data?.data))
       if (res.data.success) {
        navigate("/");
        toast.success(res.data.message);
      }
        

        

      } catch (error) {
        setError(error.response.data.message)
        
      }finally{
        setLoader(false)
      }
    } 

    const handleSignup = async() => {
      try {
        setLoader(true)
        const res = await axios.post(BASE_URL+"/signup",{firstName,lastName,email,password},{withCredentials:true}) 
        if(res.data.success){
          dispatch(addUser(res.data.data)) 
          navigate("/profile")
          toast.success(res.data.message);
        }
      } catch (error) {
        setError(error.response.data.message)
      }finally{
        setLoader(false)
      }
    }
  
    useEffect(()=>{
      if(user){
        navigate("/")
      }
    },[])
  
  
    return (
    <div className='w-full flex justify-center my-[7rem] md:my-4'>
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border md:p-4 p-2">
  <legend className="fieldset-legend text-2xl">{isLoggedInForm ? "Login" : "Signup"}</legend>

{ !isLoggedInForm && <div><label className="label md:mb-1 mb-2 md:text-lg text-2xl">FirstName</label>
  <input type="text" className="input text-2xl md:text-base" value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="FirstName" /> 

   <label className="label mt-3 md:mb-1 mb-2 md:text-lg text-2xl">LastName</label>
  <input type="text" className="input text-2xl md:text-base" value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="LastName" /></div>
}
  <label className="label text-2xl md:text-lg md:mt-3 mt-2 ">Email</label>
  <input type="email" className="input text-2xl md:text-base" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />

  <label className="label text-2xl md:text-lg md:mt-3 mt-2 ">Password</label>
  <input type="text" className="input text-2xl md:text-base" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
 {error && <p className='text-red-500 text-lg md:text-[15px] mt-2 flex justify-center'>{error}</p> } 
  <button className="btn btn-outline btn-primary mt-6 text-xl md:text-base" onClick={isLoggedInForm ? handleLogin : handleSignup}>{loader ? (<span className="loading loading-dots loading-xl"></span>
) : (isLoggedInForm ? "Login" : "Signup")}</button>
<p className='text-center md:text-sm text-lg font-semibold cursor-pointer mt-1' onClick={()=> 
{
  setIsLoggedinForm(!isLoggedInForm)
  setEmail("")
  setPassword("")
  setFirstName("")
  setLastName("")
  }}>{isLoggedInForm ? "New to DevTinder ? Singup " : "Already User ? Please Login"}</p>
</fieldset>  
    </div>

   
  )
}

export default Login