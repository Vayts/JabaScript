
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