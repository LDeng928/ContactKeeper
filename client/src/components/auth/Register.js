import React, { useState } from 'react'

export const Register = () => {
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
        console.log('Registed submit');
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
                    <input type="email" email='email' value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" name='confirmPassword' value={confirmPassword} onChange={onChange} />
                </div>

                <input type="submit" value="Register" className='btn btn-primary btn-block' />
            </form>

        </div>
    )
}
