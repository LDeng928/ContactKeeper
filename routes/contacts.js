const express = require('express');
const router = express.Router();

// @route     GET  api/contacts
// @desc      Get all users' contacts
// @access    Private 
router.get('/', (req, res) => {
    res.send('Get users contacts')
})

// @route     POST  api/contacts
// @desc      Add new contact
// @access    Private 
router.post('/', (req, res) => {
    res.send('Add contact')
})

// @route     PUT  api/contacts/:id
// @desc      Update all users' contacts
// @access    Private 
router.put('/:id', (req, res) => {
    res.send('Update contacts')
})

// @route     Delete  api/contacts/:id
// @desc      Get all users' contacts
// @access    Private 
router.delete('/:id', (req, res) => {
    res.send('Delete contacts')
})

module.exports = router; 