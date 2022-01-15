function getDataJSON(state, urlJSON, activeFormat) {
    return new Promise((resolve, reject) => {
        fetch(urlJSON)
            .then((res) => {
                return res.json()
            }).then((data) => {
            state.objJSON = data;
            resolve();
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
            resolve();
        })
    })
}

function getDataCSV(state, urlCSV) {
    return new Promise((resolve, reject) => {
        fetch(urlCSV)
            .then((res) => {
                return res.text()
            }).then((data) => {
            state.objCSV = parseCSV(data);
            resolve();
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
            resolve();
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
