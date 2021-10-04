import React, { useState, useContext, useEffect } from 'react'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

export const Register = props => {
    // Initialize the context
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext);

    // Destruction from context
    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;
    
    useEffect(() => {
        if(isAuthenticated) {
            // Redirect the user to home page
            props.history.push('/');
        }
        if(error === 'User already exists.') { // Check if error from the authContext.
            setAlert(error, 'danger');
            clearErrors(); // clear the errors afterwards
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]) // [error] value is the dependency to useEffect


    // This is a form component, so there is local state
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    // Destruction from state
    const { name, email, password, confirmPassword } = user;

    // onChange
    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // onSubmit
    const onSubmit = e => {
        e.preventDefault();
        if(name === '' || email === '' || password === '') {
            setAlert('Please enter all fields', 'danger');
        } else if(password !== confirmPassword) {
            setAlert('Passwords do not match', 'danger')
        } else {
            // console.log('Registed submit');

            // register takes in the object which is the formData
            register({
                name,
                email,
                password
            }); // Use the register method from authContext to register a new user into the database.
        }        
    }

    return (
        <div className='form-container'>
            <h1>Account <span className="text-primary">Register</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={password} onChange={onChange} minLength='6'/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name='confirmPassword' value={confirmPassword} onChange={onChange} minLength='6' />
                </div>

                <input type="submit" value="Register" className='btn btn-primary btn-block' />
            </form>

        </div>
    )
}
