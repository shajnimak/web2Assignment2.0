const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

// Подключение к MongoDB
mongoose
    .connect('mongodb+srv://shadyman:shadyman2005@cluster0.tmrr93o.mongodb.net/musicLab?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`));


// require('./utils/db');

// Middleware
app.use(bodyParser.json());

// Роуты
app.use('/users', require('./router/UserRouter'));
app.use('/music', require('./router/MusicRouter'));
app.use('/albums', require('./router/AlbumRouter'));
app.use('/playlists', require('./router/PlayListRouter'));

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
