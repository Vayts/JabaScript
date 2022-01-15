//removeIf(production)
const {setBackgroundImage, getInputValue, setInputValue, getFileFromInput, clearTempFiles, toggleDisabledClass, addListener, removeListener, createElement, getNodeChecked, getNodeSelectedText, setNodeChecked, setNodeSelectedText, setValueLocalStorage, getValueLocalStorage, removeClass, addClass} = require('../script/utils')
const {getDataDevelopers} = require('../script/getData')
const {postDataPhoto, postDataDevelopers} = require('../script/postData')
//endRemoveIf(production)


function initHome() {
    let developersState = {
        url: 'http://localhost:3050',
        currentProfile: 0,
        lastDeveloperData: []
    }

    addListener('cancel-developer-edit', 'click', cancelEdit)
    addListener('submit-developer-edit', 'click', collectInputsValue.bind(null, developersState))
    addListener('edit-img-input', 'change', imgLoad.bind(null, developersState ))

    getDataDevelopers(developersState)
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

    toggleDisabledClass('developer-info-block', 'developer-edit-block')

    state.currentProfile = num;
    const data = Object.values(state.lastDeveloperData[num])
    setBackgroundImage('img-holder', `url(${data[0]})`)
    for (let m = 1; m < data.length; m++) {
        editInputs[m - 1].value = data[m]
    }
}

function collectInputsValue(state) {
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
    checkEditError(state, obj)
}

function checkEditError(state, obj) {
    if (validateInputs(obj)) {
        fillState(state, Object.values(obj))
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

    if (obj.hobby.length > 171 || obj.hobby.length < 3) {
        return false;
    }
    return true
}

function fillState(state, arr) {
    let index = 0;

    for (let key in state.lastDeveloperData[state.currentProfile]) {
        if (key !== 'photo') {
            state.lastDeveloperData[state.currentProfile][key] = arr[index]
            index++
        }
    }
    startPostProcess(state)
    return state
}

function startPostProcess(state) {
    if (getFileFromInput('edit-img-input') !== '') {
        postDataPhoto(state, getFileFromInput('edit-img-input'), false)
        postDataDevelopers(state)
        return 'Post with photo'
    } else {
        postDataDevelopers(state)
        return 'Post without photo'
    }
}


function cancelEdit() {
    toggleDisabledClass('developer-info-block', 'developer-edit-block')
    clearTempFiles()
    setInputValue('edit-img-input', '')
}

function imgLoad(state) {

    if (!validateImg(getFileFromInput('edit-img-input').name)) {
        alert('Ты всё сломал');
        setInputValue('edit-img-input', '')
        return false;
    }

    clearTempFiles();
    postDataPhoto(state, getFileFromInput('edit-img-input'), true);
    return true;
}

function validateImg(fileName) {

    if (typeof fileName !== 'string') {
        return false;
    }

    const allowedFileType = /(\.jpg|\.png|\.gif)$/i;

    if (allowedFileType.exec(fileName)) {
        return true;
    }

    return false;
}

//removeIf(production)
module.exports = {validateInputs, validateImg, fillState, checkEditError}
//endRemoveIf(production)