import React, { useContext, useEffect } from 'react'
import { Contacts } from '../contacts/Contacts'
import { ContactForm } from '../contacts/ContactForm'
import { ContactFilter } from '../contacts/ContactFilter'
import AuthContext from '../../context/auth/authContext'

export const Home = () => {
    // Initialize the context
    const authContext = useContext(AuthContext);

    // Destruction from context
    const { loadUser } = authContext;

    // Run the loadUser function when this component loads or when the component reloads.
    useEffect(() => {
        loadUser();
        //eslint-disable-next-line
    }, []) // always loads with []
    return (
        <div className='grid-2'>
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}
