let developersControlButton = document.querySelectorAll('.developers__img-wrapper')
const xhr = new XMLHttpRequest()
//

let developersControl = document.querySelector('.developers__control')
let developersInfo = document.querySelector('.developers__info')
let developersEdit = document.querySelector('.developers__edit-window')

// Profile

let position = document.querySelectorAll('.developers__position')
let name = document.querySelector('.profile__name-text')
let height = document.querySelector('.profile__height')
let age = document.querySelector('.profile__age')
let eyeColor = document.querySelector('.profile__eye-color')
let exp = document.querySelector('.profile__experience')
let language = document.querySelector('.profile__language')
let placeOfBirth = document.querySelector('.profile__place-of-birth')
let hobby = document.querySelector('.profile__hobby-text')

window.onload = function () {
    loadDevelopersInfo(0)
}
for (let i = 0; i < developersControlButton.length; i++) {
    developersControlButton[i].onclick = function () {
        for (let m = 0; m < developersControlButton.length; m++) {
            developersControlButton[m].classList.remove('active')
            loadDevelopersInfo(i)
        }
        developersControlButton[i].classList.add('active')
    }
}

function loadDevelopersInfo(pos) {
    xhr.open('GET', './data/developers.json')
    xhr.addEventListener('load', () => {
        let data = JSON.parse(xhr.responseText)
        fillDevelopersInfo(data, pos)
        console.log(data)
    })
    xhr.send()
}

function fillDevelopersInfo(data, pos) {
    position[pos].innerText = data[pos].position
    name.innerText = data[pos].name
    height.innerText = data[pos].developerStats.height
    age.innerText = data[pos].developerStats.age
    eyeColor.innerText = data[pos].developerStats.eyeColor
    exp.innerText =  data[pos].developerStats.exp
    language.innerText = data[pos].developerStats.motherTongue
    placeOfBirth.innerText = data[pos].developerStats.placeOfBirth
    hobby.innerText = data[pos].hobby
}

// profile edit

let currentProfile = 0;

let editButton = document.querySelector('.profile__edit-button')
let submitEditButton = document.querySelector('.developers__submit-button')
let photoInput = document.querySelector('.developers__photo-input')
let nameInput = document.querySelector('.developers__name-input')
let posInput = document.querySelector('.developers__position-input')
let heightInput = document.querySelector('.developers__height-input')
let ageInput = document.querySelector('.developers__age-input')
let eyeColorInput = document.querySelector('.developers__eye-input')
let expInput = document.querySelector('.developers__exp-input')
let langInput = document.querySelector('.developers__language-input')
let placeOfBirthInput = document.querySelector('.developers__place-of-birth-input')
let hobbyInput = document.querySelector('.developers__hobby-input')
let fileHandle;
editButton.onclick = function () {
    for (let i = 0; i < developersControlButton.length; i++) {
        if(developersControlButton[i].classList.contains('active')) {
            currentProfile = i;
            developersControl.classList.add('disabled');
            developersInfo.classList.add('disabled');
            developersEdit.classList.remove('disabled');
            fillInput(i);
        }
    }
};

// edit save


function fillInput(pos) {
    nameInput.value = name.textContent
    posInput.value = position[pos].textContent
    heightInput.value = height.textContent
    ageInput.value = age.textContent
    eyeColorInput.value = eyeColor.textContent
    expInput.value = exp.textContent
    langInput.value = language.textContent
    placeOfBirthInput.value = placeOfBirth.textContent
    hobbyInput.value = hobby.textContent
}

submitEditButton.onclick = function () {
    xhr.open('GET', '../data/developers.json')
    xhr.addEventListener('load', () => {
        let data = JSON.parse(xhr.responseText)
        data[currentProfile].name = nameInput.value;
        data[currentProfile].position = posInput.value;
        data[currentProfile].developerStats.age = ageInput.value;
        data[currentProfile].developerStats.height = heightInput.value;
        data[currentProfile].developerStats.eyeColor = eyeColorInput.value;
        data[currentProfile].developerStats.exp = expInput.value;
        data[currentProfile].developerStats.motherTongue = langInput.value;
        data[currentProfile].developerStats.placeOfBirth = placeOfBirthInput.value;
        data[currentProfile].hobby = hobbyInput.value;
        data = JSON.stringify(data)
        if (xhr.status === 200 && xhr.readyState === 4) {
            getDevelopersFile(data)
        }
    })
    xhr.send()
}

async function getDevelopersFile(data) {
    [fileHandle] = await window.showOpenFilePicker();
    let fileData = await fileHandle.getFile()
    let result = await fileData.text();
    await save(data)
}

async function save(data) {
   let stream = await fileHandle.createWritable();
   await stream.write(data);
   await stream.close()
}