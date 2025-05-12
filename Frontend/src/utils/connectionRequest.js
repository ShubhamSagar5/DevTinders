import { createSlice } from "@reduxjs/toolkit";


const connectionRequest = createSlice({
    name:"connectionRequest",
    initialState:null,
    reducers:{
        addConnectionRequest:(state,action)=> {
            return action.payload
        },
        removeConnectionRequest:(state,action)=>{
            return null
        }
    }
})

export const {addConnectionRequest,removeConnectionRequest} = connectionRequest.actions 
export default connectionRequest.reducer