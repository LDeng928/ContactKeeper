import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

export const Navbar = ({ title, icon }) => {
    // Initialize the context
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    // Destruction
    const { isAuthenticated, logout, user } = authContext;
    const { clearContacts } = contactContext;

    const onLogout =() => {
        logout(); // remove all user credentials
        clearContacts(); // remove all user contacts
    }

    // variable for auth links
    const authLinks = (
        <Fragment>
            <li>Hello, { user && user.name }</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i>{' '}<span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    // guest links
    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li> 
        </Fragment>
    )

    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon} style={{ marginRight: "5px"}}></i>{title}
            </h1>
            <ul>
                { isAuthenticated ? authLinks : guestLinks }
                {/* <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li> */}
            </ul>                       
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps= {
    title: "Contact Keeper",
    icon: "fas fa-id-card-alt"
}
