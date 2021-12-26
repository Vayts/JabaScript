const fs = require('fs') // Обратить внимание на :
const CORS = require('cors')
const multer = require('multer')
const express = require("express")

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, 'server/public/img')
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

// Загрузка картинок НА сервер

app.post('/change-photo*', upload.single('file'), function (req,res) {
    console.log((req.path.split('/'))[2])
    const file = req.file;
    if (!file) {
        console.log('ERROR')
    }
        res.send(file)
})

// Взлетаем

app.listen(3050)
