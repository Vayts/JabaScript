
function getDataJSON(state,urlJSON,activeFormat) {
    fetch(urlJSON)
        .then((res) => {
            return res.json()
        }).then((data) => {
        state.objJSON = data;
        eventClickFilterFormat(state, activeFormat);
    })
}

function getDataXML(state,urlXML) {
    fetch(urlXML)
        .then((res) => {
            return res.text()
        }).then((data) => {
        state.objXML = parseXML(data);
    })
}

function getDataCSV(state,urlCSV) {
    fetch(urlCSV)
        .then((res) => {
            return res.text()
        }).then((data) => {
        state.objCSV = parseCSV(data);
    })
}


function getDataYAML(state,urlYAML) {
    fetch(urlYAML)
        .then((res) => {
            return res.text()
        }).then((data) => {
        state.objYAML = parseYAML(data);
    })
}
