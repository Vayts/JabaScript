const homeLink = document.getElementById('home')
const questionLink = document.getElementById('questions')
const aboutLink = document.getElementById('about')

const homeSection = document.getElementById('home-section')
const questionSection = document.getElementById('questions-section')
const aboutSection = document.getElementById('about-section')

homeLink.onclick = function () {
    homeSection.classList.remove('disabled')
    questionSection.classList.add('disabled')
    aboutSection.classList.add('disabled')
}

questionLink.onclick = function () {
    homeSection.classList.add('disabled')
    questionSection.classList.remove('disabled')
    aboutSection.classList.add('disabled')
}

aboutLink.onclick = function () {
    homeSection.classList.add('disabled')
    questionSection.classList.add('disabled')
    aboutSection.classList.remove('disabled')
}
