import React, { useContext, Fragment } from 'react'
import ContactContext from '../../context/contact/contactContext';
import { ContactItem } from './ContactItem';

export const Contacts = () => {
    // Initialize the contactContext
    const contactContext = useContext(ContactContext);

    // Destruct the state
    const { contacts, filtered } = contactContext;

    // Check contacts state is empty, if so, return a h4.
    if(contacts.length === 0 ) {
        return <h4>Please add a contact.</h4>
    } 

    // If filtered is not null, map through the filtered array, otherwise map through the contacts array
    return (
        <Fragment>
        {filtered !== null 
        ? filtered.map((contact) => (
            <ContactItem contact={contact} key={contact.id}></ContactItem>)) 
        : contacts.map(contact => (
            <ContactItem contact={contact} key={contact.id}></ContactItem>
            ))}          
        </Fragment>
    )
}
