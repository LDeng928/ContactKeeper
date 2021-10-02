import React, { useReducer } from 'react';
import axios from 'axios'
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
    const register = async formData => {
        // Needs to fill in the headers section
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('api/users', formData, config) // The res will be the token when registering a new user.

            // Dispatch the response to the authReducer
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data // The payload is the token.
             })
        } catch (error) {
            // If there are errors, dispatch fail
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg // The payload will be msg from backend.
             })
        }
    }

    // Log in user

    // Logout

    // Clear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

   

    // Return the provider
    return (
        <AuthContext.Provider
            value = {{
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error   ,
                register,
                clearErrors            
            }}>            
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;