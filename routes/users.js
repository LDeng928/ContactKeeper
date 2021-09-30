const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult, check } = require('express-validator');
const { genSalt } = require('bcryptjs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


// @route     POST  api/users
// @desc      Register a user
// @access    Public 
router.post('/', [
    check('name', 'Please add name.').not().isEmpty(), //check if name is empty
    check('email', 'Please enter a valid email.').isEmail(), //check if the email is valid
    check('password', 'Please enter a password with 6 or more character.').isLength({ min: 6 }) //check if the password if longer than 6 characters
], async (req, res) => {
    const errors = validationResult(req);

    // check if errors are empty from the validationResult
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() }) // if the errors are not empty, send the errors
    }

    // Destruct the data from req.body
    const { name, email, password } = req.body;

    try{
        let user= await User.findOne({ email: email}); // find the user by email using the MongoDB model

        // If the user already exists, send a bad request
        if(user) {
            res.status(400).json({ mag: 'User already exists.' });
        }

        // Otherwise, create a new User instance with the data into MongoDB
        user = new User({
            name,
            email,
            password
        })

        // A variable like a key for determining how security the hashing is.
        const salt = await bcrypt.genSalt(10); // 10 is the default
    
        // Get a hash version of the password
        user.password = await bcrypt.hash(password, salt);

        // Save the new User instance to MongoDB with a hashed password
        await user.save();
        
        // Create the payload to json web token. This is the secure the data from backend to frontend.
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