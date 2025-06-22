import React, { useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [photoUrl, setPhotoURL] = useState(user?.photoUrl || '')
  const [about, setAbout] = useState(user?.about || '')
  const [gender, setGender] = useState(user?.gender || '') 
  const [age,setAge] = useState(user?.age || 0)
  const [error,setError] = useState("")

  const dispatch = useDispatch()
  const [loader,setLoader] = useState(false)
  const navigate = useNavigate()
  
  const handleSaveProfile = async () => {
    setError("")
    try {
      setLoader(true)
      const res = await axios.put(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, gender, photoUrl, about,age },
        { withCredentials: true,headers: {
      "Content-Type": "application/json"
    } }
      )

      if (res.data.success) {
        dispatch(addUser(res.data.data)) 
        toast.success("Profile Update Successfully")
        navigate("/")
      }
    } catch (error) {
      setError(error.response.data.message)
      console.error(error)
    }finally{
      setLoader(false)
    }
  }


  return (
    <div className=''>
      <div className="flex gap-10 mb-14 no-scrollbar justify-center ">
        <fieldset className="fieldset   bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-2xl">Edit Profile</legend>

          <label className="label text-[0.9rem] font-semibold">First Name</label>
          <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

          <label className="label text-[0.9rem] font-semibold">Last Name</label>
          <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />

          <fieldset className="fieldset">
  <legend className="fieldset-legend label text-[0.9rem] font-semibold  text-gray-400">Gender</legend>
  <select defaultValue="Pick a browser" className="select" onChange={(e)=>setGender(e.target.value)}>
    <option>Select Gender</option>
    <option value={"Male"}>Male</option>
    <option value={"Female"}>Female</option>
    <option value={"Other"}>Other</option>
  </select>
</fieldset> 

         <label className="label text-[0.9rem] font-semibold">Age</label>
          <input type="number" className="input" value={age} onChange={(e) => setAge(e.target.value)} />
          <label className="label text-[0.9rem] font-semibold">Photo URL</label>
          <input type="text" className="input" value={photoUrl} onChange={(e) => setPhotoURL(e.target.value)} />

          <label className="label text-[0.9rem] font-semibold">About</label>
          <input type="text" className="input" value={about} onChange={(e) => setAbout(e.target.value)} />
          {error && <p className='text-red-500 text-[13px]'>{error} </p>}
          <button className="btn btn-primary mt-2" onClick={handleSaveProfile}>
           {loader ? (<span className="loading loading-spinner loading-xl"></span>):"Save Profile"}  
          </button>
        </fieldset>

        <div>
          <fieldset className="fieldset border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend text-2xl">Preview Profile</legend>
            <UserCard data={{ firstName, lastName, photoUrl, gender, about }} />
          </fieldset>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
