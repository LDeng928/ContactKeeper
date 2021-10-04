import React, { useContext, Fragment, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';
import { ContactItem } from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { Spinner } from '../layout/Spinner';

export const Contacts = () => {
    // Initialize the contactContext
    const contactContext = useContext(ContactContext);

    // Destruct the state
    const { contacts, filtered, getContacts, loading } = contactContext;

    // Initial load of the contacts from the database
    useEffect(() => {
        getContacts();
        //eslint-disable-next-line
    }, [])

    // Check contacts state is empty, if so, return a h4.
    if(contacts !== null && contacts.length === 0 && !loading) {
        return <h4>Please add a contact.</h4>
    } 

    // If filtered is not null, map through the filtered array, otherwise map through the contacts array
    return (
        <Fragment>
        { contacts !== null && !loading ? ( <TransitionGroup>
                {filtered !== null 
                ? filtered.map((contact) => (
                    <CSSTransition key={contact._id} timeout={500} classNames='item'>
                        <ContactItem contact={contact} key={contact._id}></ContactItem>
                    </CSSTransition>
                    )) 
                : contacts.map(contact => (
                    <CSSTransition key={contact._id} timeout={500} classNames='item'>
                        <ContactItem contact={contact} key={contact._id}></ContactItem>
                    </CSSTransition>
                    ))}      
            </TransitionGroup> ) : <Spinner /> }
              
        </Fragment>
    )
}
