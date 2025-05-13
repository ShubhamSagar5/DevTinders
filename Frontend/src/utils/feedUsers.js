import { createSlice } from "@reduxjs/toolkit";


const feedUsersSlice = createSlice({
    name:"feedUsers",
    initialState:null,
    reducers:{
        addFeedUser : (state,action) => {
            return action.payload
        },
        removeSingleUser:(state,action) => {
            let newArr = state.filter((user)=>{
                return user._id !== action.payload
            }) 
            return newArr
        },
        removeFeedUser : (state,action) => {
            return null
        }
    }
}) 

export const {addFeedUser,removeSingleUser,removeFeedUser} = feedUsersSlice.actions
export default feedUsersSlice.reducer