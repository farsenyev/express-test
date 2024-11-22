const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/favorites', (req, res) => {
    res.json({
        favoriteItems: [
            {
                id: 1,
                img: '/img/pH.svg',
                name: 'pH-метр Mettler-Toledo International, Inc. SevenCompact S220',
                status: 'Свободен',
                notification: '/img/all.svg'
            },
            {
                id: 2,
                img: '/img/spectr.svg',
                name: 'Спектрофотометр Varian, Inc Cary 50 Bio',
                status: 'Свободен',
                notification: '/img/all.svg'
            },
            {
                id: 3,
                img: '/img/titrator.svg',
                name: 'Титратор',
                status: 'Свободен',
                notification: '/img/on.svg'
            },
            {
                id: 4,
                img: '/img/koagulometr.svg',
                name: 'Коагулометр Tcoag, KC 4 Delta',
                status: 'Свободен',
                notification: '/img/mute.svg'
            },
            {
                id: 5,
                img: '/img/koagulometr.svg',
                name: 'Коагулометр Tcoag, KC 4 Delta',
                status: 'Свободен',
                notification: '/img/mute.svg'
            }
        ]
    })
})

app.get('/api/analytics', (req, res) => {
    res.json({
        deviceImg: '/img/unknown-device.svg',
        name: 'pH-метр Mettler-Toledo International, Inc. SevenCompact S220',
        model: 'S1.4.I14-9.001',
        serialNumber: '00-024004',
        workStatus: 'В работе',
        favoriteImg: '/img/favorite.svg',
        dateStart: '2021-10-07T10:55',
        dateEnd: '2021-10-21T10:55',
        table: [
            {
                tableDate: '09.10.2021, 15:46',
                workTypeStatus: 'В работе',
                workTypeSpec: 'Измерение',
                works: ['Образец/серия:', '000100057935_170000010325_0000251849'],
                results: '',
                user: 'morozovava'
            },
            {
                tableDate: '12.10.2021, 12:17',
                workTypeStatus: 'В работе',
                workTypeSpec: 'Калибровка',
                works: [
                    'Номер колонки:', 'Колонка 2',
                    'Образец:', 'Образец 2',
                    'Образец:', 'образец 1',
                    'Метод:', 'метов тестовый',
                    'Номер колонки:', 'Колонка 1',
                ],
                results: 'Промывка с указанием вещества: Вещество \n... Комментарий: тест успешности',
                user: 'morozovava'
            }
        ]
    })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.get('/analytics', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'analytics.html'));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '..', 'public', 'error.html'));
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

module.exports = app;
