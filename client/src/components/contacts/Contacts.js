import React, { useContext, Fragment } from 'react'
import ContactContext from '../../context/contact/contactContext';
import { ContactItem } from './ContactItem';

export const Contacts = () => {
    // Initialize the contactContext
    const contactContext = useContext(ContactContext);

    // Destruct the state
    const { contacts } = contactContext;

    return (
        <Fragment>
            {contacts.map(contact => <ContactItem contact={contact} key={contact.id}></ContactItem>)}
        </Fragment>
    )
}
