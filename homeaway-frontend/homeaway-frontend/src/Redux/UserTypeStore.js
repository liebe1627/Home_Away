import {configureStore} from '@reduxjs/toolkit'
import UTypeReducer from './UserTypeSlice'

const store=configureStore({
    reducer:{
        utype:UTypeReducer
    }
})

export default store;