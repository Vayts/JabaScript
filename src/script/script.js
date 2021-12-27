const developersList = document.getElementById('developers-cards-list');
const developerInfoBlock = document.getElementById('developer-info-block');
const developerEditBlock = document.getElementById('developer-edit-block');
const cancelEditButton = document.getElementById('cancel-developer-edit');
const submitEditButton = document.getElementById('submit-developer-edit');
const editInputs = document.querySelectorAll('.edit-window__input')
const imgInputs = document.getElementById('edit-img-input')
const imgEditHolder = document.getElementById('img-holder')

let lastDeveloperData;
let currentProfile = 0;

window.onload = function () {
    loadDevelopersContent()
}

// Загрузка developers.json

function loadDevelopersContent() {
    fetch('http://localhost:3050/developers')
        .then((res) => {
            return res.json()
        }).then((data) => {
        lastDeveloperData = data;
        fillDevelopersData(data);
    })
}

// Отрисовка карточек девелоперов

function fillDevelopersData(data) {
    while (developersList.firstChild) {
        developersList.removeChild(developersList.firstChild);
    }
    for (let i = 0; i < data.length; i++) {
        let developerCard = createDeveloperCard(data[i]);
        developersList.insertAdjacentHTML('beforeend', developerCard);
    }
    addEventDevelopers()
}

// Функция, которая добавляет события на кнопки в карточках девелоперов

function addEventDevelopers() {
    const developer = document.querySelectorAll('.profile');
    const developerMoreButton = document.querySelectorAll('.info-buttons__more');
    const developerEditButton = document.querySelectorAll('.info-buttons__edit')

    for (let i = 0; i < developer.length; i++) {
        developerMoreButton[i].onclick = () => {
            developer[i].classList.toggle('active')

            if (developer[i].classList.contains('active')) {
                developerMoreButton[i].innerText = 'Hide';
            } else {
                developerMoreButton[i].innerText = 'More';
            }

        }
        developerEditButton[i].onclick = function () {
            startEdit(i)
        };
    }
}

// Эта функция отрабатывает при нажатии кнопки EDIT. Она заполняет инпуты и ставит фотку

function startEdit(num) {
    currentProfile = num;
    editMenu()
    let data = Object.values(lastDeveloperData[num])
    imgEditHolder.style.backgroundImage = `url(${data[0]})`
    for (let m = 1; m < data.length; m++) {
        editInputs[m - 1].value = data[m]
    }
}

// Включает и выключает EDIT меню

function editMenu() {
    developerInfoBlock.classList.toggle('disabled')
    developerEditBlock.classList.toggle('disabled')
    clearTempFiles()
}

// Кнопки для EDIT меню. Подтвердить, закрыть.

cancelEditButton.onclick = editMenu;
submitEditButton.onclick = submitDeveloperEdit;

// Закрывает EDIT меню не изменяет дату

imgInputs.addEventListener('change', () => {
    clearTempFiles()
    uploadPhoto(imgInputs.files[0], true)
})

// Загрузка картинок во временную директорию или постоянную

function uploadPhoto(value, temp) {
    const file = value;
    const stampPath = Date.now()
    const formData = new FormData();
    const fileName = value.name
    formData.append('file', value);
    if (temp) {
        fetch('http://127.0.0.1:3050/uploads/' + stampPath, {
            method: 'POST',
            body: formData
        }).then(() => {
            imgEditHolder.style.backgroundImage = `url(http://127.0.0.1:3050/temp/${stampPath}${fileName}`
        })
    } else {
        lastDeveloperData[currentProfile].photo = `http://127.0.0.1:3050/photo/${stampPath}${fileName}`
        fetch('http://127.0.0.1:3050/change-photo/' + stampPath, {
            method: 'POST',
            body: formData
        })
    }
}

// Подтверждение сабмита

function submitDeveloperEdit() {
    clearTempFiles()
    let data = lastDeveloperData;
    let index = 0;
    for (let key in data[currentProfile]) {

        if (key !== 'photo') {
            data[currentProfile][key] = editInputs[index].value
            index++
        }

    }

    if (imgInputs.value !== '') {
        uploadPhoto(imgInputs.files[0], false)
        postDeveloperInfo(lastDeveloperData)
    } else {
        postDeveloperInfo(lastDeveloperData)
    }
}

// Отправка обновленной информации на сервер

function postDeveloperInfo(data) {
    fetch('http://localhost:3050/developers-edit', {
        method: 'POST',
        body: JSON.stringify(data)
    }).then(() => {
        loadDevelopersContent()
        editMenu()
    })
}

// Очистка временной папки

function clearTempFiles() {
    console.log('aaaaaaaaa')
    fetch('http://localhost:3050/deleteTemp').then()
}

function createDeveloperCard(data) {
    return '<li class="developers-list__item">' +
        '<div class="profile">' +
        '<div class="profile__img" style="background-image: url(' + data.photo + ')"></div>' +
        '<p class="profile__name">' + data.name + '</p>' +
        '<p class="profile__position">' + data.position + '</p>' +
        '<div class="profile__info">' +
        '<ul class="stats-list">' +
        '<li class="stats-list__item stat">' +
        '<p class="stat__title">Height: &nbsp;</p>' +
        '<p class="stat__text">' + data.height + '</p>' +
        '</li>' +
        '<li class="stats-list__item stat">' +
        '<p class="stat__title">Age: &nbsp;</p>' +
        '<p class="stat__text info-holder">' + data.age + '</p>' +
        '</li>' +
        '<li class="stats-list__item stat">' +
        '<p class="stat__title">Eye color: &nbsp;</p>' +
        '<p class="stat__text info-holder">' + data.eyeColor + '</p>' +
        '</li>' +
        '<li class="stats-list__item stat">' +
        '<p class="stat__title">Experience: &nbsp;</p>' +
        '<p class="stat__text info-holder">' + data.exp + '</p>' +
        '</li>' +
        '<li class="stats-list__item stat">' +
        '<p class="stat__title">Mother tongue: &nbsp;</p>' +
        '<p class="stat__text info-holder">' + data.motherTongue + '</p>' +
        '</li>' +
        '<li class="stats-list__item stat">' +
        '<p class="stat__title">Place of birth: &nbsp;</p>' +
        '<p class="stat__text info-holder">' + data.placeOfBirth + '</p>' +
        '</li>' +
        '</ul>' +
        '<div class="hobby">' +
        '<p class="hobby__title">Hobby</p>' +
        '<p class="hobby__text">' + data.hobby + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="profile__buttons info-buttons">' +
        '<button type="button" class="info-buttons__more button">More</button>' +
        '<button type="button" class="info-buttons__edit button">Edit</button>' +
        '</div>' +
        '</div>' +
        '</li>'
}