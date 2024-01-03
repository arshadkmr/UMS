import {createSlice} from '@reduxjs/toolkit'

const INITIAL_STATE={
    allUserDetails:[]
}

const userDetailsSlice=createSlice({
    name:'userDetails',
    initialState:INITIAL_STATE,
    reducers:{
        addUserDetails:(state,action)=>{
            state.allUserDetails=[]
            state.allUserDetails.push(action.payload)
        }
    }
})

export const {addUserDetails}=userDetailsSlice.actions
export default userDetailsSlice.reducer