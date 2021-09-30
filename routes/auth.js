const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult, check } = require('express-validator');

// Bring in middleware
const auth = require('../middleware/auth');

// @route     GET  api/auth
// @desc      Get log in user
// @access    Private
router.get('/', auth, async (req, res) => {
    try {
        // From the middleware, use the decoded user (req.user) from the jwt token and find the user by the id
        const user = await User.findById(req.user.id).select('-password'); // -password to not have the id send back.
        res.json(user); // put the user data in json format as response
    } catch (err) { 
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
})

// @route     POST  api/auth
// @desc      Auth user and get token
// @access    Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required.').exists()
], async (req, res) => {
    const errors = validationResult(req);

    // check if errors are empty from the validationResult
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() }) // if the errors are not empty, send the errors
    }

    // Destruction
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email }); // find if the user exists in the database 

        // If user is not found by the email. Send back an error message.
        if(!user) {
            return res.status(400).json({ msg: 'Invalid credentials '});
        }

        // Use bcrypt to check if the password is a match.
        const isMatch = await bcrypt.compare(password, user.password); //user.password is the password in the database

        // If not match, send back error msg
        if(!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials'});
        }

        // Otherwise, send the data to jwt
        const payload = {
            user: {
                id: user.id // This is the id created by MongoDB. With the id, you can access all the contacts the user has
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000 // jwt will be destroy in 360000 seconds. 
        }, (err, token) => {
            // callback function
            if(err) throw err;
            // Otherwise, send the token back to the frontend
            res.json({token})
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

})

module.exports = router; 