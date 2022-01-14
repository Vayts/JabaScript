
function postDataJSON(objJSON) {
    fetch(urlJSON + '-add', {
        method: 'POST',
        body: JSON.stringify(objJSON)
    }).then()
}

function postDataXML(objXML) {
    fetch(urlXML + '-add', {
        method: 'POST',
        body: serialiseXML(objXML)
    }).then()
}

function postDataCSV(objCSV) {
    fetch(urlCSV + '-add', {
        method: 'POST',
        body: serialiseCSV(objCSV)
    }).then()
}

function postDataYAML(objYAML) {
    fetch(urlYAML + '-add', {
        method: 'POST',
        body: serialiseYAML(objYAML)
    }).then()
}