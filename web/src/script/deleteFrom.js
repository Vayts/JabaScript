//removeIf(production)
const {postDataYAML, postDataCSV, postDataJSON, postDataXML} = require('./postData')

//endRemoveIf(production)

function deleteFromJSON(state, id) {
    for (let i = 0; i < state.objJSON['01'].length; i++) {
        if (String(state.objJSON['01'][i]['id']) === String(id)) {
            state.objJSON['01'].splice(i, 1);
            postDataJSON(state, 'http://localhost:3050/questions.json');
            return true;
        }
    }
    return false;
}


function deleteFromXML(state, id) {
    for (let i = 0; i < state.objXML['questions']['block'].length; i++) {
        if (String(state.objXML['questions']['block'][i]['id']) === String(id)) {
            state.objXML['questions']['block'].splice(i, 1);
            postDataXML(state, 'http://localhost:3050/questions.xml');
            return true;
        }
    }
    return false;
}

function deleteFromCSV(state, id) {
    for (let i = 0; i < state.objCSV.length; i++) {
        if (String(state.objCSV[i]['id']) === String(id)) {
            state.objCSV.splice(i, 1);
            postDataCSV(state, 'http://localhost:3050/questions.csv');
            return true;
        }
    }
    return false;
}

function deleteFromYAML(state, id) {
    for (let i = 0; i < state.objYAML.length; i++) {
        if (String(state.objYAML[i]['id']) === String(id)) {
            state.objYAML.splice(i, 1);
            postDataYAML(state, 'http://localhost:3050/questions.yaml');
            return true;
        }
    }
    return false;
}

//removeIf(production)
module.exports = {deleteFromXML, deleteFromJSON, deleteFromCSV, deleteFromYAML}
//endRemoveIf(production)