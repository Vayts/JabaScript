document.addEventListener('DOMContentLoaded', function(){
    initHome()
})

function initHome( ) {

    let developersState = {
        url: 'http://localhost:3050',
        currentProfile: 0,
        lastDeveloperData: []
    }

    addListener('cancel-developer-edit', 'click', cancelEdit)
    addListener('submit-developer-edit', 'click', checkDeveloperEdit.bind(null, developersState))
    addListener('edit-img-input', 'change', imgLoad.bind(null, developersState ))

    loadDevelopersContent(developersState)
}

function addListener(id, eventType, cb) {
    const node = document.getElementById(id)

    if (node) {
        node.addEventListener(eventType, cb)
    }
}

function loadDevelopersContent(state) {
    fetch(`${state.url}/developers`)
        .then((res) => {
            return res.json()
        }).then((data) => {
        state.lastDeveloperData = data;
        fillDevelopersData(state);
    })
}

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

function startEdit(num, state) {
    const editInputs = document.querySelectorAll('.edit-window__input')

    state.currentProfile = num;
    toggleDisabledClass('developer-info-block', 'developer-edit-block')
    let data = Object.values(state.lastDeveloperData[num])
    setBackgroundImage('img-holder', `url(${data[0]})`)
    for (let m = 1; m < data.length; m++) {
        editInputs[m - 1].value = data[m]
    }
}

function checkDeveloperEdit(state) {
    clearTempFiles()

    const obj = {
        name: getInputValue('name'),
        position: getInputValue('position'),
        height: Number(getInputValue('height')),
        age: Number(getInputValue('age')),
        eyeColor: getInputValue('eye-color'),
        exp: Number(getInputValue('exp')),
        motherTongue: getInputValue('mother-tongue'),
        placeOfBirth: getInputValue('place-of-birth'),
        hobby: getInputValue('hobby')
    }

    if (validateInputs(obj)) {
        submitDevelopersEdit(state, Object.values(obj))
        return true
    } else {
        alert('Invalid input data')
        return false;
    }
}

function validateInputs(obj) {
    const reg = /^[a-zA-Z\s\-]*$/
    const regExt = /^[a-zA-Z\s\-.,:\/]*$/

    if (obj.name.length > 25 || obj.name.length < 4 || !obj.name.match(reg)) {
        return false;
    }

    if (obj.position.length > 20 || obj.position.length < 4 || !obj.position.match(regExt)) {
        return false;
    }

    if (obj.height > 240 || obj.height < 100) {
        return false;
    }

    if (obj.age > 100 || obj.age < 16) {
        return false;
    }

    if (obj.eyeColor.length > 20 || obj.eyeColor.length < 3 || !obj.eyeColor.match(reg)) {
        return false;
    }

    if (obj.age - obj.exp < 16 || obj.exp < 0) {
        return false;
    }

    if (obj.motherTongue.length > 15 || obj.motherTongue.length < 5 || !obj.motherTongue.match(reg)) {
        return false;
    }

    if (obj.placeOfBirth.length > 30 || obj.placeOfBirth.length < 3 || !obj.placeOfBirth.match(reg)) {
        return false;
    }

    if (obj.hobby.length > 170 || obj.hobby.length < 3) {
        return false;
    }
    return true
}

function submitDevelopersEdit(state, arr) {
    let index = 0;

    for (let key in state.lastDeveloperData[state.currentProfile]) {
        if (key !== 'photo') {
            state.lastDeveloperData[state.currentProfile][key] = arr[index]
            index++
        }
    }

    if (getFileFromInput('edit-img-input') !== '') {
        uploadPhoto(state, getFileFromInput('edit-img-input'), false)
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
    const node = document.getElementById(id);

    if (node) {
        node.value = value;
        return true;
    }
    return false;
}

function getInputValue(id) {
    const node = document.getElementById(id);

    if(node) {
        return node.value;
    }
    return false;
}

function getFileFromInput(id) {
    const node = document.getElementById(id);

    if (node && node.type === 'file') {
        if (node.value === '') {
            return '';
        }
        return node.files[0];
    }
    return false;
}

function setBackgroundImage(id, value) {
    const node = document.getElementById(id)

    if (node) {
        node.style.backgroundImage = value;
        return true;
    }
    return false;
}

function cancelEdit() {
    toggleDisabledClass('developer-info-block', 'developer-edit-block')
    clearTempFiles()
    setInputValue('edit-img-input', '')
}

function imgLoad(state) {

    if (!imgValidate(getFileFromInput('edit-img-input').name)) {
        alert('Ты всё сломал');
        setInputValue('edit-img-input', '')
        return false;
    }

    clearTempFiles();
    uploadPhoto(state, getFileFromInput('edit-img-input'), true);
    return true;
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
    const stampPath = Date.now()
    const formData = new FormData();
    const name = value.name
    const mimeType = name.slice(name.length - 4, name.length)
    formData.append('file', value);

    if (temp) {
        fetch(`${state.url}/uploads/${stampPath}`, {
            method: 'POST',
            body: formData
        }).then(() => {
            setBackgroundImage('img-holder', `url(http://127.0.0.1:3050/temp/${stampPath}developerPhoto${mimeType}`)
        })
    } else {
        state.lastDeveloperData[state.currentProfile].photo = `http://127.0.0.1:3050/photo/${stampPath}developerPhoto${mimeType}`
        fetch(`${state.url}/change-photo/${stampPath}`, {
            method: 'POST',
            body: formData
        })
    }
}

// Отправка обновленной информации на сервер

function postDeveloperInfo(state) {
    fetch(`${state.url}/developers-edit`, {
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