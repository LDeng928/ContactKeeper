import React, { useState } from 'react'

export const Login = () => {
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
        console.log('Log in submit');
    }

    return (
        <div className='form-container'>
            <h1>Account <span className="text-primary">Login</span></h1>
            <form onSubmit={onSubmit}>               
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" email='email' value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={password} onChange={onChange} />
                </div>               
                <input type="submit" value="Login" className='btn btn-primary btn-block' />
            </form>

        </div>
    )
}
