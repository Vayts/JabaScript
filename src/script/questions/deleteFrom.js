
function deleteFromJSON(objJSON, id) {
    objJSON['01'].forEach((item, i) => {
        if (String(item['id']) === String(id)) {
            objJSON['01'].splice(i, 1);
            postDataJSON(objJSON);
            return true;
        }
    })
    return false;
}


function deleteFromXML(objXML, id) {
    objXML['questions']['block'].forEach((item, i) => {
        if (String(item['id']) === String(id)) {
            objXML['questions']['block'].splice(i, 1);
            postDataXML(objXML);
            return true;
        }
    })
    return false;
}

function deleteFromCSV(objCSV, id) {
    objCSV.forEach((item, i) => {
        if (String(item['id']) === String(id)) {
            objCSV.splice(i, 1);
            postDataCSV(objCSV);
            return true;
        }
    })
    return false;
}

function deleteFromYAML(objYAML, id) {
    objYAML.forEach((item, i) => {
        if (String(item['id']) === String(id)) {
            objYAML.splice(i, 1);
            postDataYAML(objYAML);
            return true;
        }
    })
    return false;
}
