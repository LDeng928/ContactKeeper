import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

export const Navbar = ({ title, icon }) => {
    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon} style={{ marginRight: "5px"}}></i>{title}
            </h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
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