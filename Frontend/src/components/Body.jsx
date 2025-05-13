import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import axios from 'axios'
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"

const Body = () => {
    
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const user = useSelector((store)=>store.user)

    const userProfile = async() => {
        try {

            const user  = await axios.get(BASE_URL+"/profile/view",{withCredentials:true})
            dispatch(addUser(user.data.data))
            navigate("/")
        } catch (error) {
            if(error?.response?.status == 401){
                navigate("/login")
            }
            console.log(error)
        }
    }
    
    useEffect(()=>{
        userProfile()
    },[])
    
    return(
        <div className="">
        <Navbar/>
        <Outlet/>
        <Footer/>
        </div>
    )
}

export default Body