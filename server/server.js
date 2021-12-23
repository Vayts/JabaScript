const port = 3000;
const hostname = '127.0.0.1'
const fs = require('fs')

// multer

const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null, 'server/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${(req.url.split('/'))[2]}${file.originalname}`)
    }
})

const upload = multer({storage: storage})

// node express

const express = require("express")
const path = require("express");
const app = express();

app.get("/developers", function (req, res) {
    disableCORS(res)
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
    disableCORS(res)
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
    disableCORS(res)
    const file = req.file;
    if (!file) {
        console.log('ERROR')
    }
        res.send(file)
})

// Взлетаем

app.listen(3000)

// СORS POLICY

function disableCORS(res) {
    res.setHeader("Access-Control-Allow-Headers", 'append,delete,entries,foreach,get,has,keys,set,values,Authorization')// ЭТО ДЛЯ КОРС ПОЛИТИКИ!!!!!
    res.setHeader("Access-Control-Allow-Origin", '*')// ЭТО ДЛЯ КОРС ПОЛИТИКИ!!!!!
    res.setHeader("Access-Control-Allow-Methods", 'POST, GET, OPTIONS, DELETE, PUT')// ЭТО РЕШАЕТ КОРС ПОЛИТИКУ!!!!!
}
