const mongoose = require('mongoose');

// const mongoURI = 'mongodb://127.0.0.1:27017/userPref';
const config = require('./config')
const connectToMongo = () => {
    mongoose.connect(config.mongoURI,
     (err) => {
        if (err) {
            console.error('MongoDB connection error:', err);
        } else {
            console.log('Connected to MongoDB successfully');
        }
    });
}


module.exports = connectToMongo;