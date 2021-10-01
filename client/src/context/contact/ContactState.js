import React, { useReducer } from 'react';
import { v4 } from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer'
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER } from '../types'

const ContactState = props => {
    const initialState = {
        contacts:[
            {
                id: 1,
                name: 'Harry Potter',
                email: 'hpotter@gmail.com',
                phone: '123-456-7897',
                type: 'personal'
            },
            {
                id: 2,
                name: 'Ron Wesley',
                email: 'rwesley@gmail.com',
                phone: '123-456-4567',
                type: 'professional'
            },
            {
                id: 3,
                name: 'Luna Dow',
                email: 'ldow@gmail.com',
                phone: '123-456-9874',
                type: 'personal'
            }
        ],
        current: null
    };

    // Pull out the state and dispatch to the reducer
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // Actions
    // Add contact
    const addContact = contact => {
        // To generate a random id. This is just UI
        contact.id = v4();
        dispatch({ type: ADD_CONTACT, payload: contact });
    }

    // Delete contact
    const deleteContact = id => {      
        dispatch({ type: DELETE_CONTACT, payload: id });
    }

    // Set current contact
    const setCurrent = contact => {       
        dispatch({ type: SET_CURRENT, payload: contact });
    }

    // Clear current contact
    const clearCurrent = () => {       
        dispatch({ type: CLEAR_CURRENT });
    }

    // Update contact
    const updateContact = contact => {       
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    }

    // Filter contacts

    // Clear filtered contacts 

    // Return the provider
    return (
        <ContactContext.Provider
            value = {{
                contacts: state.contacts,
                current: state.current,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact
            }}>            
            {props.children}
        </ContactContext.Provider>
    )
}

export default ContactState;