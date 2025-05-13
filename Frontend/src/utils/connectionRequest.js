import { createSlice } from "@reduxjs/toolkit";


const connectionRequest = createSlice({
    name:"connectionRequest",
    initialState:null,
    reducers:{
        addConnectionRequest:(state,action)=> {
            return action.payload
        },
        removeSingleRequest:(state,action)=>{
            let newArr = state.filter((req) => {
                return req._id !== action.payload
            })
            return newArr
        },
        removeConnectionRequest:(state,action)=>{
            return null
        }
    }
})

export const {addConnectionRequest,removeSingleRequest,removeConnectionRequest} = connectionRequest.actions 
export default connectionRequest.reducer