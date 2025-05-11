import { createSlice } from "@reduxjs/toolkit";


const feedUsersSlice = createSlice({
    name:"feedUsers",
    initialState:null,
    reducers:{
        addFeedUser : (state,action) => {
            return action.payload
        },
        removeFeedUser : (state,action) => {
            return null
        }
    }
}) 

export const {addFeedUser,removeFeedUser} = feedUsersSlice.actions
export default feedUsersSlice.reducer