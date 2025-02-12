import {createSlice} from '@reduxjs/toolkit'

const UTypeSlice = createSlice({
    name:'UserType',
    initialState:{value : "USER"},
    reducers:{
        updateUTypeAdmin:(state,action)=>{
            state.value="ADMIN"
        },
        updateUTypeOwner:(state,action)=>{
            state.value="OWNER"
        },
        resetUType:(state,action)=>{
            state.value="USER"
        }
    }
})

export const {updateUTypeAdmin,updateUTypeOwner,resetUType,}=UTypeSlice.actions

export default UTypeSlice.reducer