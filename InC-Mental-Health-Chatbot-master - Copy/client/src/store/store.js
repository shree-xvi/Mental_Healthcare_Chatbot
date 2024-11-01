import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../feature/login/loginService'

export default configureStore({
    reducer:{
        auth:authReducer
    }
})