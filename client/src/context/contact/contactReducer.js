import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS } from '../types'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch(action.type) {
        case GET_CONTACTS: 
            return {
                ...state,
                contacts: action.payload,
                loading: false
            }
        case ADD_CONTACT: 
            return {
                ...state, // Current state
                contacts:[action.payload, ...state.contacts], // Initial state is an object of contacts. This cannot be changed. So it will stay as an object of contacts. Copy what is already there '...state.contacts.='.
                loading: false
            }
        case CONTACT_ERROR: 
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map((contact) => contact._id === action.payload._id ? action.payload : contact),
                loading: false
            }
        case DELETE_CONTACT: 
            return {
                ...state, // Current state
                contacts: state.contacts.filter((contact) => contact._id !== action.payload), // _id is from MongoDB
                loading: false
            }
        case CLEAR_CONTACTS: 
            return {
                ...state,
                contacts:null,
                current: null,
                filtered: null,
                error: null
            }
        case FILTER_CONTACT:
            return {
                ...state,
                filtered: state.contacts.filter((contact) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                }),
                loading: false                
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
                loading: false
            }
        case SET_CURRENT:
            return {
                ...state, // Current state
                current: action.payload // The entire current object, which is the contact
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }            
        default:
            return state;
    }
}