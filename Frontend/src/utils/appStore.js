import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import feedReducer from "./feedUsers" 
import connectionReducer from "./connection"
import connectionRequestReducer from "./connectionRequest"

const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connection:connectionReducer,
        connectionRequest : connectionRequestReducer
    }
}) 

export default appStore