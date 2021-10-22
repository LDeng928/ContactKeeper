import React, { useState, useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext'

export const Login = (props) => {
     // Initialize the context
     const alertContext = useContext(AlertContext)
     const authContext = useContext(AuthContext);
 
     // Destruction from context
     const { setAlert } = alertContext;
     const { login, error, clearErrors, isAuthenticated } = authContext;

     useEffect(() => {
        if(isAuthenticated) {
            // Redirect the user to home page
            props.history.push('/');
        }
        if(error === 'Invalid credentials') { // Check if error from the authContext.
            setAlert(error, 'danger');
            clearErrors(); // clear the errors afterwards
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]) // [error] value is the dependency to useEffect

    // This is a form component, so there is local state
    const [user, setUser] = useState({       
        email: '',
        password: ''       
    })

    // Destruction from state
    const { email, password } = user;

    // onChange
    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // onSubmit
    const onSubmit = e => {
        e.preventDefault();
        if(email === '' || password === '') {
            setAlert('Please fill in all fields', 'danger');
        } else {
            login({  // login takes in the object which is the formData
                email,
                password
            });  // Use the login method from authContext to register a new user into the database.
        }
    }

    return (
        <div className='form-container'>
            <h1>Account <span className="text-primary">Login</span></h1>
            <form onSubmit={onSubmit}>               
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={password} onChange={onChange} />
                </div>               
                <input type="submit" value="Login" className='btn btn-primary btn-block' />
            </form>
            <p style={textStyle}>For demonstration purpose, please log in with email: <strong>new@gmail.com</strong> and <strong>password: 123456</strong>.</p>
        </div>
    )
}

const textStyle = {
    color: 'red',
    fontStyle: 'italic'
}
