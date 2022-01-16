//removeIf(production)
const {parseYAML,parseXML,parseCSV} = require('./parse')
//endRemoveIf(production)

function getDataJSON(state, urlJSON) {
    return new Promise((resolve, reject) => {
        fetch(urlJSON)
            .then((res) => {
                return res.json()
            }).then((data) => {
            state.objJSON = data;
            resolve(true);
        })
    })
}

function getDataXML(state, urlXML) {
    return new Promise((resolve, reject) => {
        fetch(urlXML)
            .then((res) => {
                return res.text()
            }).then((data) => {
            state.objXML = parseXML(data);
            resolve(true);
        })
    })
}

function getDataCSV(state, urlCSV) {
    return new Promise((resolve, reject) => {
        fetch(urlCSV)
            .then((res) => {
                return res.text()
            }).then((data) => {
            state['objCSV'] = parseCSV(data);
            resolve(true);
        })
    })
}


function getDataYAML(state, urlYAML) {
    return new Promise((resolve, reject) => {
        fetch(urlYAML)
            .then((res) => {
                return res.text()
            }).then((data) => {
            state.objYAML = parseYAML(data);
            resolve(true);
        })
    })
}

function getDataDevelopers(state) {
    fetch(`${state.url}/developers`)
        .then((res) => {
            return res.json()
        }).then((data) => {
        state.lastDeveloperData = data;
        fillDevelopersData(state);
    })
}
//removeIf(production)
module.exports = {getDataDevelopers, getDataCSV,getDataJSON,getDataXML,getDataYAML}
//endRemoveIf(production)
