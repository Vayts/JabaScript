
function addToJSON(question, theme, answer) {
    objJSON['01'].push({'id': Date.now(), 'question': question, 'theme': theme, 'answer': answer});
    postDataJSON(objJSON);
}

function addToXML(question, theme, answer) {
    objXML['questions']['block'].push({'id': Date.now(), 'question': question, 'theme': theme, 'answer': answer});
    postDataXML(objXML);
}

function addToCSV(question, theme, answer) {
    objCSV.push({'id': Date.now(), 'question': question, 'theme': theme, 'answer': answer});
    postDataCSV(objCSV);
}

function addToYAML(question, theme, answer) {
    objYAML.push({'id': Date.now(), 'question': question, 'theme': theme, 'answer': answer});
    postDataYAML(objYAML);
}
