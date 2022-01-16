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
    removeNodeClass('home-section', 'disabled')
    addNodeClass('questions-section', 'disabled')
    addNodeClass('about-section', 'disabled')
}

function questionPage() {
    setValueLocalStorage('page', 'question')
    addNodeClass('home-section', 'disabled')
    removeNodeClass('questions-section', 'disabled')
    addNodeClass('about-section', 'disabled')
}
function aboutPage() {
    setValueLocalStorage('page', 'about')
    addNodeClass('home-section', 'disabled')
    addNodeClass('questions-section', 'disabled')
    removeNodeClass('about-section', 'disabled')
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


