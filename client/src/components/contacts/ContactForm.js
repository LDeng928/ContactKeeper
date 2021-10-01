import React, { useState, useContext, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext';


export const ContactForm = () => {
    // Initialize the context
    const contactContext = useContext(ContactContext);

    // Destruction from contactContext
    const { addContact, current, clearCurrent, updateContact } = contactContext;

    useEffect(() => {
        if(current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, current]);

    // Since this is a form, there will be component level state
    const [ contact, setContact ] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    }); // Single piece of state called contact which will be an object with all the fields.

    // Destruction
    const { name, email, phone, type } = contact;

    // onChange function
    const onChange = event => setContact({ ...contact, [event.target.name]: event.target.value })

    // onSubmit
    const onSubmit = event => {
        event.preventDefault();      
        // Depends if there is current state, change the functionalities of the onSubmit function
        if(current === null) {
            addContact(contact); // the addContact function will come from the context. Add the local state contact.                    
        } else {
            // Update the contact
            updateContact(contact);
            clearCurrent(); // Clear current object in the form
        }
         // Reset to default once the form is submitted
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }

    // Clear All
    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} />
            <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} />
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onChange} />

            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} /> Personal {' '}
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange}/> Professional {' '}

            <div>
                <input type="submit" value={current ? 'Update Contact' : 'Add Contact'} className="btn btn-primary btn-block" />
            </div>
            {current && <div><button className="btn btn-light btn-block" onClick={clearAll}>Clear</button></div>}
        </form>
    )
}
