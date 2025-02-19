const express = require('express');
const path = require('path');
const sass = require('sass');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Компилируем SASS в CSS
const compileSass = () => {
    const result = sass.compile('src/scss/styles.scss');
    
    // Создаем директорию css, если она не существует
    if (!fs.existsSync('public/css')) {
        fs.mkdirSync('public/css', { recursive: true });
    }
    
    fs.writeFileSync('public/css/styles.css', result.css);
};

// Компилируем SASS при запуске
compileSass();

// Статические файлы
app.use(express.static('public'));

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Обработка 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Что-то пошло не так!');
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
}); 