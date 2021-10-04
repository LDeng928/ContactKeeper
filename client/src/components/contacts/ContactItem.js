import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ContactContext from '../../context/contact/contactContext'

export const ContactItem = ({ contact }) => {
    // Initialize the context
    const contactContext = useContext(ContactContext);

    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    const onDelete = () => {
        deleteContact(_id);
        clearCurrent();
    }

    const onClick = () => {
        setCurrent(contact); // contact got pass in the prop
    }

    const {_id, name, email, phone, type} = contact

    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>{name} {' '}<span style={{float: 'right'}} className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
            </h3>

            <ul className="list">
                {/* Check if email exists */}
                {email && (<li><i className="fas fa-envelope-open"></i>{' '}{email}</li>)}
                {/* Check if phone exists */}
                {phone && (<li><i className="fas fa-phone"></i>{' '}{phone}</li>)}
            </ul>

            <p>
                <button className="btn btn-dark btn-sm" onClick={onClick}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}