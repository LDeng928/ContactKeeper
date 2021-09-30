const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Get the token from header
    const token = req.header('x-auth-token');

    // Check if there is no token
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.'})        
    }

    // If there is a token, verify it
    try {
        // Create a variable to store the decoded token
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        // Extract the User object out from decoded variable and put it in the req user object
        req.user = decoded.user

        next();

    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid.'});
    }
}