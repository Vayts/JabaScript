
function postDataJSON(state,urlJSON) {
    fetch(urlJSON + '-add', {
        method: 'POST',
        body: JSON.stringify(state.objJSON)
    }).then()
}

function postDataXML(state,urlXML) {
    fetch(urlXML + '-add', {
        method: 'POST',
        body: serialiseXML(state.objXML)
    }).then()
}

function postDataCSV(state,urlCSV) {
    fetch(urlCSV + '-add', {
        method: 'POST',
        body: serialiseCSV(state.objCSV)
    }).then()
}

function postDataYAML(state,urlYAML) {
    fetch(urlYAML + '-add', {
        method: 'POST',
        body: serialiseYAML(state.objYAML)
    }).then()
}


function postDataDevelopers(state) {
    fetch(`${state.url}/developers-edit`, {
        method: 'POST',
        body: JSON.stringify(state.lastDeveloperData)
    }).then(() => {
        getDataDevelopers(state)
        toggleDisabledClass('developer-info-block', 'developer-edit-block')
    })
}


function postDataPhoto(state, value, temp) {
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