const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const MusicRouter = require('../router/MusicRouter');
const UserRouter = require('../router/UserRouter');
const AlbumRouter = require('../router/AlbumRouter');
const PlayListRouter = require('../router/PlayListRouter');

// Create a new Express application instance for testing
const app = express();
app.use(express.json());
app.use('/music', MusicRouter);
app.use('/users', UserRouter);
app.use('/albums', AlbumRouter);
app.use('/playlists', PlayListRouter);

// Connect to your test database before running tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to Test DB');
});

// Disconnect from the test database after tests are complete
afterAll(async () => {
  await mongoose.connection.close();
  console.log('Disconnected from Test DB');
});

module.exports = app;
