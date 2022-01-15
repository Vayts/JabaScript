
function deleteFromJSON(state, id) {
    state.objJSON['01'].forEach((item, i) => {
        if (String(item['id']) === String(id)) {
            state.objJSON['01'].splice(i, 1);
            postDataJSON(state,'http://localhost:3050/questions.json');
            return true;
        }
    })
    return false;
}


function deleteFromXML(state, id) {
    state.objXML['questions']['block'].forEach((item, i) => {
        if (String(item['id']) === String(id)) {
            state.objXML['questions']['block'].splice(i, 1);
            postDataXML(state,'http://localhost:3050/questions.xml');
            return true;
        }
    })
    return false;
}

function deleteFromCSV(state, id) {
    state.objCSV.forEach((item, i) => {
        if (String(item['id']) === String(id)) {
            state.objCSV.splice(i, 1);
            postDataCSV(state,'http://localhost:3050/questions.csv');
            return true;
        }
    })
    return false;
}

function deleteFromYAML(state, id) {
    state.objYAML.forEach((item, i) => {
        if (String(item['id']) === String(id)) {
            state.objYAML.splice(i, 1);
            postDataYAML(state,'http://localhost:3050/questions.yaml');
            return true;
        }
    })
    return false;
}
