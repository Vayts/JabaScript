document.addEventListener('DOMContentLoaded', function(){
    initHome()
})

function initHome( ) {

    let developersState = {
        currentProfile: 0,
        lastDeveloperData: []
    }

    addListener('cancel-developer-edit', 'click', cancelEdit)
    addListener('submit-developer-edit', 'click', submitDeveloperEdit.bind(null, developersState))
    addListener('edit-img-input', 'change', imgLoad.bind(null, developersState ))

    loadDevelopersContent(developersState)
}

function addListener(id, eventType, cb) {
    const node = document.getElementById(id)

    if (node) {
        node.addEventListener(eventType, cb)
    }
}

// Загрузка developers.json

function loadDevelopersContent(state) {
    fetch('http://localhost:3050/developers')
        .then((res) => {
            return res.json()
        }).then((data) => {
        state.lastDeveloperData = data;
        fillDevelopersData(state);
    })
}

// Отрисовка карточек девелоперов

function fillDevelopersData(state) {
    const developersList = document.getElementById('developers-cards-list');

    while (developersList.firstChild) {
        developersList.removeChild(developersList.firstChild);
    }

    for (let i = 0; i < state.lastDeveloperData.length; i++) {
        let developerCard = createDeveloperCard(state.lastDeveloperData[i]);
        developersList.insertAdjacentHTML('beforeend', developerCard);
    }

    addEventDevelopers(state)
}

// Функция, которая добавляет события на кнопки в карточках девелоперов

function addEventDevelopers(state) {
    const developer = document.querySelectorAll('.profile');
    const developerMoreButton = document.querySelectorAll('.info-buttons__more');
    const developerEditButton = document.querySelectorAll('.info-buttons__edit')

    for (let i = 0; i < developer.length; i++) {
        developerMoreButton[i].onclick = () => {
            developer[i].classList.toggle('active')
            developerEditButton[i].classList.toggle('active')

            if (developer[i].classList.contains('active')) {
                developerMoreButton[i].innerText = 'Hide';
            } else {
                developerMoreButton[i].innerText = 'More';
            }

        }
        developerEditButton[i].onclick = function () {
            startEdit(i, state)
        };
    }
}

// Эта функция отрабатывает при нажатии кнопки EDIT. Она заполняет инпуты и ставит фотку

function startEdit(num, state) {
    const imgEditHolder = document.getElementById('img-holder')
    const editInputs = document.querySelectorAll('.edit-window__input')

    state.currentProfile = num;
    toggleDisabledClass('developer-info-block', 'developer-edit-block')
    let data = Object.values(state.lastDeveloperData[num])
    imgEditHolder.style.backgroundImage = `url(${data[0]})`
    for (let m = 1; m < data.length; m++) {
        editInputs[m - 1].value = data[m]
    }
}

// Подтверждение сабмита

function submitDeveloperEdit(state) {
    clearTempFiles()
    const editInputs = document.querySelectorAll('.edit-window__input')
    const imgInputs = document.getElementById('edit-img-input')

    let index = 0;

    for (let key in state.lastDeveloperData[state.currentProfile]) {

        if (key !== 'photo') {
            state.lastDeveloperData[state.currentProfile][key] = editInputs[index].value
            index++
        }

    }

    if (imgInputs.value !== '') {
        uploadPhoto(state, imgInputs.files[0], false)
        postDeveloperInfo(state)
    } else {
        postDeveloperInfo(state)
    }
}

function toggleDisabledClass(id) {
    for (let i = 0; i < arguments.length; i++) {
        const node = document.getElementById(arguments[i])

        if (node) {
            node.classList.toggle('disabled')
        } else {
            return false
        }
    }
    return true
}

function setInputValue(id, value) {
    const node = document.getElementById(id)

    if (node) {
        node.value = value;
    }
}

// Кнопки для EDIT меню. Подтвердить, закрыть.


function cancelEdit() {
    toggleDisabledClass('developer-info-block', 'developer-edit-block')
    clearTempFiles()
    setInputValue('edit-img-input', '')
}

// Редактирование фотографии (временное и постоянное)

function imgLoad(state) {
    const imgInputs = document.getElementById('edit-img-input')
    if (!imgValidate(imgInputs.files[0].name)) {
        alert('Ты всё сломал');
        setInputValue('edit-img-input', '')
    } else {
        clearTempFiles();
        uploadPhoto(state, imgInputs.files[0], true);
    }
}

function imgValidate(fileName) {
    const allowedFileType = /(\.jpg|\.png|\.gif)$/i;

    if (allowedFileType.exec(fileName)) {
        return true;
    }
    return false;

}

// Загрузка картинок во временную директорию или постоянную

function uploadPhoto(state, value, temp) {

    const imgEditHolder = document.getElementById('img-holder')
    const stampPath = Date.now()
    const formData = new FormData();
    const name = value.name
    const mimeType = name.slice(name.length - 4, name.length)


    formData.append('file', value);
    if (temp) {
        fetch('http://127.0.0.1:3050/uploads/' + stampPath, {
            method: 'POST',
            body: formData
        }).then(() => {
            imgEditHolder.style.backgroundImage = `url(http://127.0.0.1:3050/temp/${stampPath}developerPhoto${mimeType}`
        })
    } else {
        state.lastDeveloperData[state.currentProfile].photo = `http://127.0.0.1:3050/photo/${stampPath}developerPhoto${mimeType}`
        fetch('http://127.0.0.1:3050/change-photo/' + stampPath, {
            method: 'POST',
            body: formData
        })
    }
}

// Отправка обновленной информации на сервер

function postDeveloperInfo(state) {
    fetch('http://localhost:3050/developers-edit', {
        method: 'POST',
        body: JSON.stringify(state.lastDeveloperData)
    }).then(() => {
        loadDevelopersContent(state)
        toggleDisabledClass('developer-info-block', 'developer-edit-block')
    })
}

// Очистка временной папки

function clearTempFiles() {
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
        '<button type="button" class="info-buttons__edit button"><span class="icon-edit"></span></button>' +
        '</div>' +
        '</div>' +
        '</li>'
}