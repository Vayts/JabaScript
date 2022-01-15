function initRouter() {
    let currentPage = getValueLocalStorage('page')
    if(currentPage === 'false') {
        setValueLocalStorage('page', 'home')
        currentPage = 'home'
    }

    getPage(currentPage)

    addListener('home', 'click', homePage)
    addListener('logo', 'click', homePage)
    addListener('questions', 'click', questionPage)
    addListener('about', 'click', aboutPage)
}

function homePage() {
    setValueLocalStorage('page', 'home')
    removeClass('home-section', 'disabled')
    addClass('questions-section', 'disabled')
    addClass('about-section', 'disabled')
}

function questionPage() {
    setValueLocalStorage('page', 'question')
    addClass('home-section', 'disabled')
    removeClass('questions-section', 'disabled')
    addClass('about-section', 'disabled')
}
function aboutPage() {
    setValueLocalStorage('page', 'about')
    addClass('home-section', 'disabled')
    addClass('questions-section', 'disabled')
    removeClass('about-section', 'disabled')
}

function getPage(value) {
    if (value === 'home') {
        homePage()
    }

    if (value === 'question') {
        questionPage()
    }

    if (value === 'about') {
        aboutPage()
    }
}


