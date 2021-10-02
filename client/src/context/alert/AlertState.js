import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import { v4 } from 'uuid'
import {   
    SET_ALERT,
    REMOVE_ALERT
} from '../types'

const AlertState = props => {
    const initialState = []; // An array of alert objects.

    // Pull out the state and dispatch to the reducer
    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Actions
    // Set Alert
    const setAlert = (message, type, timeout = 5000 ) => {
        const id = v4(); // Create a unique id with uuid v4 method

        dispatch({
            type: SET_ALERT,
            payload: { message, type, id } // The payload is an object of message, type and id.
        });

        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)       
    }

   

    // Return the provider
    return (
        <AlertContext.Provider
            value = {{
                 alerts: state,
                 setAlert
            }}>            
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;