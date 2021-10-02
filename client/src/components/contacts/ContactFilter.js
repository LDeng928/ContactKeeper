import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'

export const ContactFilter = () => {
    //Initialize the context
    const contactContext = useContext(ContactContext);

    // Destruction 
    const { filterContacts, clearFilter, filtered } = contactContext;
  
    // Initialize text with the useRef hook
    const text = useRef('')

      // useEffect hook - to make sure when this component mounted, the text value is null.
      useEffect(() => {
        if(filtered === null) {
            text.current.value ='';
        }
    })

    // onChange
    const onChange = e => {
        if(text.current.value !== ''){
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }


    return (
        <form>
            <input type="text" ref={text} placeholder='Filter contacts...' onChange={onChange} />
        </form>
    )
}
