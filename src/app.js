const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

// Подключение к MongoDB
require('./utils/db');

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
