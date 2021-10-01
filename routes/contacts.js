const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// @route     GET  api/contacts
// @desc      Get all users' contacts
// @access    Private 
router.get('/', auth, async (req, res) => { // Adding the second parameter auth will make the url protected
    try {
        // Find contacts from database based on the user id
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 }); // req.user from middleware auth
        // Send the contacts out in json format
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// @route     POST  api/contacts
// @desc      Add new contact
// @access    Private 
router.post('/', [ auth, [
    check('name', 'Please enter a name').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    // check if errors are empty from the validationResult
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() }) // if the errors are not empty, send the errors
    }

    // Destruct date from request.body
    const { name, email, type, phone } = req.body;

    try {
        const newContect = new Contact({ 
            name, 
            email, 
            phone, 
            type, 
            user: req.user.id
        })

        // Save contact to the database
        const contact = await newContect.save();

        // send the contact to the client
        res.json(contact);


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.')
    }
})

// @route     PUT  api/contacts/:id
// @desc      Update all users' contacts
// @access    Private 
router.put('/:id', auth, async (req, res) => {
     // Destruct date from request.body
     const { name, email, type, phone } = req.body;

     // Build contact object
     // if there is data from body, save it to the contactFields object
     const contactFields = {};
     if(name) contactFields.name = name; 
     if(email) contactFields.email = email;
     if(type) contactFields.type = type;
     if(phone) contactFields.phone = phone;

     try {
        // Find out if the contact is in the database 
        let contact = await Contact.findById(req.params.id);

        // If contact not found
        if(!contact) {
            return res.status(404).json({ msg: 'Conact not found. '});
        }

        // Make sure user owns the contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized.' });
        }

        // Do the contact update
        contact = await Contact.findByIdAndUpdate(req.params.id, {$set: contactFields}, {new: true}); // new: true if this contact does not exist, just create a new one.
        // send the updated contact
        res.json(contact)
     } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.')
     }
})

// @route     Delete  api/contacts/:id
// @desc      Get all users' contacts
// @access    Private 
router.delete('/:id', auth, async (req, res) => {
    try {
        // Find out if the contact is in the database 
        let contact = await Contact.findById(req.params.id);

        // If contact not found
        if(!contact) {
            return res.status(404).json({ msg: 'Conact not found. '});
        }

        // Make sure user owns the contact
        if(contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized.' });
        }

        await Contact.findByIdAndRemove(req.params.id);
        // send the updated contact
        res.json({ msg: 'Contact removed.'});
     } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error.')
     }
})

module.exports = router; 