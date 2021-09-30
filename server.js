const express = require('express');

const app = express();

// Routes - home
app.get('/', (req, res) => res.json({msg: 'Welcome to the Contact Keeper API.'}));

// Define the routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));