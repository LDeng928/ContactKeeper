import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer'
import {   
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS 
} from '../types'

const AuthState = props => {
    const initialState = {
        user: null,
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null
    };

    // Pull out the state and dispatch to the reducer
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // Actions
    // Load user

    // Register user

    // Log in user

    // Logout

    // Clear errors

   

    // Return the provider
    return (
        <AuthContext.Provider
            value = {{
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error               
            }}>            
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;