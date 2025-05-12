import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import feedReducer from "./feedUsers" 
import connectionReducer from "./connection"


const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connection:connectionReducer
    }
}) 

export default appStore