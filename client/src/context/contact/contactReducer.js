import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER } from '../types'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch(action.type) {
        case ADD_CONTACT: 
            return {
                ...state, // Current state
                contacts:[...state.contacts, action.payload] // Initial state is an object of contacts. This cannot be changed. So it will stay as an object of contacts. Copy what is already there '...state.contacts.='.
            }
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map((contact) => contact.id === action.payload.id ? action.payload : contact)
            }
        case DELETE_CONTACT: 
            return {
                ...state, // Current state
                contacts: state.contacts.filter((contact) => contact.id !== action.payload)
            }
        case FILTER_CONTACT:
            return {
                ...state,
                filtered: state.contacts.filter((contact) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex);
                })                
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
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