function initRouter() {
    addListener('home', 'click', homePage)
    addListener('logo', 'click', homePage)
    addListener('questions', 'click', questionPage)
    addListener('about', 'click', aboutPage)
}

function homePage() {
    removeClass('home-section', 'disabled')
    addClass('questions-section', 'disabled')
    addClass('about-section', 'disabled')
}

function questionPage() {
    addClass('home-section', 'disabled')
    removeClass('questions-section', 'disabled')
    addClass('about-section', 'disabled')
}
function aboutPage() {
    addClass('home-section', 'disabled')
    addClass('questions-section', 'disabled')
    removeClass('about-section', 'disabled')
}


