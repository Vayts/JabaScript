// // router
//
//
// //
//
// // home-page content
//
// let developersControl = document.querySelector('.developers__control')
// let developersInfo = document.querySelector('.developers__info')
// let developersEdit = document.querySelector('.developers__edit-window')
//
// // Profile
// let developersData;
// let developersControlButtons = document.querySelectorAll('.developers__img-wrapper')
// let position = document.querySelectorAll('.developers__position')
// let name = document.querySelector('.profile-name__text')
// let height = document.querySelector('.profile__height')
// let age = document.querySelector('.profile__age')
// let eyeColor = document.querySelector('.profile__eye-color')
// let exp = document.querySelector('.profile__experience')
// let language = document.querySelector('.profile__language')
// let placeOfBirth = document.querySelector('.profile__place-of-birth')
// let hobby = document.querySelector('.profile-hobby__text')
//
//
// window.onload = function () {
//     loadDevelopersInfo(0)
//     addDevelopersControl()
//     fillDevelopersControlButtons()
// }
//
// function fillDevelopersControlButtons() {
//     fetch('http://localhost:3000/developers')
//         .then((res)=> {
//             return res.json()
//         }).then((data) => {
//             for (let i = 0; i < developersControlButtons.length; i++) {
//                 developersControlButtons[i].style.backgroundImage = 'url(' + data[i].photo + ')'
//                 position[i].innerText = data[i].position
//             }
//         })
// }
//
// function loadDevelopersInfo(profileNum) {
//     fetch('http://localhost:3000/developers')
//         .then((res)=> {
//             return res.json()
//         })
//         .then((data) => fillDeveloperProfile(profileNum, data))
// }
//
// function fillDeveloperProfile(profileNum, data) {
//     position[profileNum].innerText = data[profileNum].position
//     name.innerText = data[profileNum].name
//     height.innerText = data[profileNum].developerStats.height
//     age.innerText = data[profileNum].developerStats.age
//     eyeColor.innerText = data[profileNum].developerStats.eyeColor
//     exp.innerText =  data[profileNum].developerStats.exp
//     language.innerText = data[profileNum].developerStats.motherTongue
//     placeOfBirth.innerText = data[profileNum].developerStats.placeOfBirth
//     hobby.innerText = data[profileNum].hobby
// }
//
// // Переключение между профилями девелоперов
//
// function addDevelopersControl() {
//     for (let i = 0; i < developersControlButtons.length; i++) {
//         developersControlButtons[i].addEventListener('click', () => {
//             developersControlButtons.forEach((el) => el.classList.remove('active'))
//             developersControlButtons[i].classList.add('active')
//             loadDevelopersInfo(i)
//             currentProfile = i;
//         })
//     }
// }
//
// // EDIT-Window
//
// let currentProfile = 0;
// let profileEditButton = document.querySelector('.profile__edit-button')
// let submitProfileEditButton = document.querySelector('.developers__submit-button')
// let cancelProfileEditButton = document.querySelector('.developers__return-button')
// let photoInput = document.querySelector('.developers__photo-input')
// let nameInput = document.querySelector('.developers__name-input')
// let posInput = document.querySelector('.developers__position-input')
// let heightInput = document.querySelector('.developers__height-input')
// let ageInput = document.querySelector('.developers__age-input')
// let eyeColorInput = document.querySelector('.developers__eye-input')
// let expInput = document.querySelector('.developers__exp-input')
// let langInput = document.querySelector('.developers__language-input')
// let placeOfBirthInput = document.querySelector('.developers__place-of-birth-input')
// let hobbyInput = document.querySelector('.developers__hobby-input')
//
// // Open edit window
//
// profileEditButton.onclick = openEditWindow;
//
// function openEditWindow() {
//     developersControl.classList.add('disabled')
//     developersInfo.classList.add('disabled')
//     developersEdit.classList.remove('disabled')
//     fillEditInput()
// }
//
// function fillEditInput() {
//     nameInput.value = name.textContent
//     posInput.value = position[currentProfile].textContent
//     heightInput.value = height.textContent
//     ageInput.value = age.textContent
//     eyeColorInput.value = eyeColor.textContent
//     expInput.value = exp.textContent
//     langInput.value = language.textContent
//     placeOfBirthInput.value = placeOfBirth.textContent
//     hobbyInput.value = hobby.textContent
// }
//
// //Submit edit
//
// submitProfileEditButton.onclick = getDeveloperData;
//
// function getDeveloperData() {
//     fetch('http://localhost:3000/developers')
//         .then((res)=> {
//             return res.json()
//         })
//         .then((data)=> {
//             if(photoInput.value !== '') {
//                 let fileName = photoInput.files[0].name
//                 let stampPath = Date.now()
//                 console.log(fileName)
//                 uploadDeveloperPhoto(photoInput.files, stampPath)
//                 // let nameLength = photoInput.files[0].name.length
//                 // let fileType = (photoInput.files[0].name).toString().slice(nameLength-4, nameLength)
//                 // const pathToImg = `http://localhost:3000/photo/developerPhoto${currentProfile}${fileType}`
//                 // console.log(pathToImg)
//                 let imgPath = `http://localhost:3000/photo/${stampPath}` + fileName
//                 changeDeveloperDataWithImg(data, imgPath)
//                 postDeveloperInfo(data)
//                 fillDeveloperProfile(currentProfile,data)
//                 // restartDevelopersControlButtons(data)
//             } else {
//                 changeDeveloperData(data)
//                 postDeveloperInfo(data)
//                 fillDeveloperProfile(currentProfile,data)
//
//             }
//         }).then((data) => {
//             fillDevelopersControlButtons()
//             returnToHomePage()
//         })
// }
//
// function changeDeveloperData(data) {
//     data[currentProfile].name = nameInput.value;
//     data[currentProfile].position = posInput.value;
//     data[currentProfile].developerStats.age = ageInput.value;
//     data[currentProfile].developerStats.height = heightInput.value;
//     data[currentProfile].developerStats.eyeColor = eyeColorInput.value;
//     data[currentProfile].developerStats.exp = expInput.value;
//     data[currentProfile].developerStats.motherTongue = langInput.value;
//     data[currentProfile].developerStats.placeOfBirth = placeOfBirthInput.value;
//     data[currentProfile].hobby = hobbyInput.value;
// }
//
// function changeDeveloperDataWithImg(data, path) {
//     data[currentProfile].photo = path
//     data[currentProfile].name = nameInput.value;
//     data[currentProfile].position = posInput.value;
//     data[currentProfile].developerStats.age = ageInput.value;
//     data[currentProfile].developerStats.height = heightInput.value;
//     data[currentProfile].developerStats.eyeColor = eyeColorInput.value;
//     data[currentProfile].developerStats.exp = expInput.value;
//     data[currentProfile].developerStats.motherTongue = langInput.value;
//     data[currentProfile].developerStats.placeOfBirth = placeOfBirthInput.value;
//     data[currentProfile].hobby = hobbyInput.value;
// }
//
//
//
//
//
// // profile photo edit
//
// function uploadDeveloperPhoto(value, modifier) {
//     const formData = new FormData();
//     console.log(value[0].name)
//     formData.append('file', value[0]);
//
//     fetch('http://127.0.0.1:3000/change-photo/' + modifier, {
//         method: 'POST',
//         body: formData
//     })
// }
//
//
//
// function postDeveloperInfo(data) {
//     fetch('http://localhost:3000/developers-edit', {
//         method: 'POST',
//         body: JSON.stringify(data)
//     }).then()
// }
//
// // cancel edit
//
// cancelProfileEditButton.onclick = returnToHomePage;
//
// // return user to home page
//
// function returnToHomePage() {
//     developersControl.classList.remove('disabled')
//     developersInfo.classList.remove('disabled')
//     developersEdit.classList.add('disabled')
// }

let cards = document.querySelectorAll('.profile')
const profile = document.querySelectorAll('.profile__img')

for (let i = 0; i < cards.length; i++) {
    cards[i].onclick = function () {
        profile[i].classList.toggle('active')
    }
}
//
//
// data[currentProfile].name = nameInput.value;
// data[currentProfile].position = posInput.value;
// data[currentProfile].developerStats.age = ageInput.value;
// data[currentProfile].developerStats.height = heightInput.value;
// data[currentProfile].developerStats.eyeColor = eyeColorInput.value;
// data[currentProfile].developerStats.exp = expInput.value;
// data[currentProfile].developerStats.motherTongue = langInput.value;
// data[currentProfile].developerStats.placeOfBirth = placeOfBirthInput.value;
// data[currentProfile].hobby = hobbyInput.value;

