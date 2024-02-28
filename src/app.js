const express = require('express');
const app = express();
require('dotenv').config();
const connectToDatabase = require('./utils/db'); // Import the connection function

// Middleware
app.use(express.json()); // Using express's built-in body parser

// Initialize Database Connection
connectToDatabase().then(() => {
    console.log('Database connection established and app starting...');
    // Define routes here
    app.use('/users', require('./router/UserRouter'));
    app.use('/music', require('./router/MusicRouter'));
    app.use('/albums', require('./router/AlbumRouter'));
    app.use('/playlists', require('./router/PlayListRouter'));

    // Centralized error handling
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    });

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1); // Exit the app if cannot connect to the database
});
