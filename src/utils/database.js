const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

exports.initDatabase = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err);
    }
};
