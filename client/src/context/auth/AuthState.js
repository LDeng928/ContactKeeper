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

import setAuthToken from '../../Utils/setAuthToken';

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
    // LOAD USER (AUTH USER)
    const loadUser = async () => {
        // load token into the global headers
        if(localStorage.token) {
            setAuthToken(localStorage.token)
        }

        try {
            const res = await axios.get('/api/auth');

            // If the result comes back ok
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });

        } catch (error) {
            // If the result comes back wrong
            dispatch({
                type: AUTH_ERROR
            });
        }
    }

    // REGISTER USER
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
             });

            // After the dispatch, load the user
            loadUser();
        } catch (error) {
            // If there are errors, dispatch fail
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg // The payload will be msg from backend.
             });
        }
    }

    // LOGIN USER
    const login = async formData => {
        // Needs to fill in the headers section
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('api/auth', formData, config) // The res will be the token when registering a new user.

            // Dispatch the response to the authReducer
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data // The payload is the token.
             });

            // After the dispatch, load the user
            loadUser();
        } catch (error) {
            // If there are errors, dispatch fail
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg // The payload will be msg from backend.
             });
        }
    }

    // LOGOUT
    const logout = () => dispatch({ type: LOGOUT });

    // CLEAR ERRORS
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

   

    // RETURN THE PROVIDER (CONTEXT)
    return (
        <AuthContext.Provider
            value = {{
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error   ,
                register,
                clearErrors,
                loadUser,
                login,
                logout        
            }}>            
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;