const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Указываем папку для статических файлов
app.use(express.static('public'));

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

// Страница Аналитики
app.get('/analytics', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'analytics.html'));
});

// Обработка ошибок: если маршрут не найден
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
