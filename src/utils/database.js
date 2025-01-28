const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

exports.initDatabase = async () => {
    try {
        await mongoose.connect(mongoURI);
        // eslint-disable-next-line no-console
        console.log('MongoDB connected');
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
    }
};
