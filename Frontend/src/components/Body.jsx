import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import axios from 'axios'
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {
    
    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const userProfile = async() => {
        try {
            
            const user  = await axios.get(BASE_URL+"/profile/view",{withCredentials:true})
            dispatch(addUser(user.data.data))
        } catch (error) {
            if(error.response.status == 401){
                navigate("/login")
            }
            console.log(error)
        }
    }
    
    useEffect(()=>{
        userProfile()
    },[])
    
    return(
        <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </div>
    )
}

export default Body