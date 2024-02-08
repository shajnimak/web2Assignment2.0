const mongoose = require('mongoose');
require('dotenv').config();

class Database {
    constructor() {
        this.connect();
    }

    connect() {
        mongoose
            .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Connected to MongoDB'))
            .catch((err) => console.error('Error connecting to MongoDB', err));
    }
}

module.exports = new Database();
