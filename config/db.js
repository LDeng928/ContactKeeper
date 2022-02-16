const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');

const connectDB = async () => {
    // Re-factored to async/await
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true
        });

        console.log('MongoDB connected...')
    } catch(err) {
        console.error(err.message); 
        process.exit(1);
    }

    // mongoose.connect(db, {
    //     useNewUrlParser: true
    // })
    // .then(() => console.log('MongoDB Connected'))
    // .catch(err => {
    //     console.error(err.message); 
    //     process.exit(1);
    // });
};

module.exports = connectDB;
