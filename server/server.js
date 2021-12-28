const fs = require('fs') // нодовский модуль для работы с файловой системой
const CORS = require('cors') // решение корс политики
const multer = require('multer') // легкая загрузка файлов на сервер
const express = require("express") // для всего и сразу
const fsExtra = require('fs-extra') // нужен нам для удаления файлов из папки

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        if (req.url.includes('/uploads')) {
            cb(null, 'server/public/uploads')
        } else {
            cb(null, 'server/public/img')
        }
    },
    filename: (req, file, cb) => {
        cb(null, `${(req.url.split('/'))[2]}${file.originalname}`)
    }
})
const upload = multer({storage: storage})
const app = express();

app.use(CORS())

app.get("/developers", function (req, res) {
    fs.readFile("server/public/developers/developers.json", (error, data) => {
        if (error) {
            throw error
        } else {
            res.end(data.toString())
        }
    })
});

// Редактирование профиля и контента developers.json

app.post("/developers-edit", function (req,res) {
    let developersData = '';
    req.on('data', content => {
        developersData += content
    })
    req.on('end', () => {
        if (developersData) {
            fs.writeFile('server/public/developers/developers.json', developersData, function (err) {
                if (err) {
                    throw err
                } else {
                    console.log('Перезаписано')
                }
            })
        }
        res.end("Данные успешно получены");
    })
})

// А тут мы получаем фотокарточки

app.use("/photo", express.static(__dirname + "/public/img"));
app.use("/temp", express.static(__dirname + "/public/uploads"));

// Загрузка картинок НА сервер

app.post('/change-photo*', upload.single('file'), function (req,res) {
    const file = req.file;
    if (!file) {
        console.log('ERROR')
    }
    res.send(file)
})

app.post('/uploads*', upload.single('file'), function (req,res) {
    const file = req.file;
    if (!file) {
        console.log('ERROR')
    }
    res.send(file)
})

app.get('/deleteTemp', () => {
    fsExtra.emptydir('server/public/uploads')
})

// Взлетаем

app.listen(3050)
