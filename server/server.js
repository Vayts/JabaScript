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
        let name = file.originalname
        console.log(name)
        name = name.split('').filter((el) => {
            if (el !== ' ' || el !== '(' || el !== ')') {
                return el
            }
        }).join('')
        cb(null, `${(req.url.split('/'))[2]}developerPhoto${name.slice(name.length-4, name.length)}`)
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

//получение данных из questions.json
app.get("/questions.json", function (req, res) {
    fs.readFile("server/public/questions/questions.json", (error, data) => {
        if (error) {
            throw error
        } else {
            res.end(data.toString())
        }
    })
});


app.post("/questions.json-add", function (req,res) {
    let questionsData = '';
    req.on('data', content => {
        questionsData += content
    })
    req.on('end', () => {
        if (questionsData) {
            fs.writeFile('server/public/questions/questions.json', questionsData, function (err) {
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
//получение данных из questions.xml
app.get("/questions.xml", function (req, res) {
    fs.readFile("server/public/questions/questions.xml", (error, data) => {
        if (error) {
            throw error
        } else {
            console.log(data)
            res.end(data.toString())
        }
    })
});

app.post("/questions.xml-add", function (req,res) {
    let questionsData = '';
    req.on('data', content => {
        questionsData += content
    })
    req.on('end', () => {
        if (questionsData) {
            fs.writeFile('server/public/questions/questions.xml', questionsData, function (err) {
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

//получение данных из questions.csv
app.get("/questions.csv", function (req, res) {
    fs.readFile("server/public/questions/questions.csv", (error, data) => {
        if (error) {
            throw error
        } else {
            console.log(data)
            res.end(data.toString())
        }
    })
});

app.post("/questions.csv-add", function (req,res) {
    let questionsData = '';
    req.on('data', content => {
        questionsData += content
    })
    req.on('end', () => {
        if (questionsData) {
            fs.writeFile('server/public/questions/questions.csv', questionsData, function (err) {
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

//получение данных из questions.yaml
app.get("/questions.yaml", function (req, res) {
    fs.readFile("server/public/questions/questions.yaml", (error, data) => {
        if (error) {
            throw error
        } else {
            console.log(data)
            res.end(data.toString())
        }
    })
});


app.post("/questions.yaml-add", function (req,res) {
    let questionsData = '';
    req.on('data', content => {
        questionsData += content
    })
    req.on('end', () => {
        if (questionsData) {
            fs.writeFile('server/public/questions/questions.yaml', questionsData, function (err) {
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
