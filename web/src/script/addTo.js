//removeIf(production)
const {postDataCSV,postDataYAML,postDataXML,postDataJSON} = require('../script/postData')
//endRemoveIf(production)

function addToJSON(state,question, theme, answer) {
    state.objJSON['01'].push({'id': Date.now(), 'question': question, 'theme': theme, 'answer': answer});
    postDataJSON(state,'http://localhost:3050/questions.json');
}

function addToXML(state,question, theme, answer) {
    state.objXML['questions']['block'].push({'id': Date.now(), 'question': question, 'theme': theme, 'answer': answer});
    postDataXML(state,'http://localhost:3050/questions.xml');
}

function addToCSV(state,question, theme, answer) {
    state.objCSV.push({'id': Date.now(), 'question': question, 'theme': theme, 'answer': answer});
    postDataCSV(state,'http://localhost:3050/questions.csv');
}

function addToYAML(state,question, theme, answer) {
    state.objYAML.push({'id': Date.now(), 'question': question, 'theme': theme, 'answer': answer});
    postDataYAML(state,'http://localhost:3050/questions.yaml');
}


//removeIf(production)
module.exports = {addToJSON,addToCSV,addToXML,addToYAML}
//endRemoveIf(production)