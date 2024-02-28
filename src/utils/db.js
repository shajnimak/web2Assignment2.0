const mongoose = require('mongoose');
require('dotenv').config();

let database = null;

async function connectToDatabase() {
    if (database) {
        console.log("Database connection already established.");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to database successfully.");
        database = mongoose.connection;
    } catch (error) {
        console.error("Could not connect to database:", error);
        throw error;
    }
}

module.exports = connectToDatabase;
