const urlJSON = 'http://localhost:3050/questions.json';
const urlXML = 'http://localhost:3050/questions.xml';
const urlCSV = 'http://localhost:3050/questions.csv';
const urlYAML = 'http://localhost:3050/questions.yaml';

let objJSON = null;
let objXML = null;
let objCSV = [];
let objYAML = [];
let activeFormat = 'JSON';

function addListener(id, eventType, callback) {
    const node = document.getElementById(id);
    if (node) {
        node.addEventListener(eventType, callback);
    }
}

getDataYAML();
getDataCSV();
getDataXML();
getDataJSON();

function getDataJSON() {
    fetch(urlJSON)
        .then((res) => {
            return res.json()
        }).then((data) => {
        objJSON = data;
        addElement(objJSON['01'], 'JSON');
    })
}

function getDataXML() {
    fetch(urlXML)
        .then((res) => {
            console.log(res);
            return res.text()
        }).then((data) => {
        objXML = parseXML(data);
    })
}

function getDataCSV() {
    fetch(urlCSV)
        .then((res) => {
            return res.text()
        }).then((data) => {
        objCSV = parseCSV(data);
    })
}


function getDataYAML() {
    fetch(urlYAML)
        .then((res) => {
            return res.text()
        }).then((data) => {
        objYAML = parseYAML(data);
    })
}


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

//////////

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

function deleteFromCSV(objCSV,id) {
    objCSV.forEach((item,i)=>{
        if (String(item['id']) === String(id)) {
            objCSV.splice(i, 1);
            postDataCSV(objCSV);
            return true;
        }
    })
    return false;
}

function deleteFromYAML(objYAML,id) {
    objYAML.forEach((item,i)=>{
        if (String(item['id']) === String(id)) {
            objYAML.splice(i, 1);
            postDataYAML(objYAML);
            return true;
        }
    })
    return false;
}


function addElement(objectDataQuestions, format, flag = true) {
    let my_div = document.getElementById("list-questions-add");
    let documentFragment = document.createDocumentFragment();
    if (flag) {
        while (my_div.firstChild) {
            my_div.removeChild(my_div.firstChild);
        }
    }
    if (objectDataQuestions != null) {
        for (let i = 0; i < objectDataQuestions.length; i++) {
            let newDiv = document.createElement("section");
            let newTheme = document.createElement("h3");
            newTheme.innerText = `${objectDataQuestions[i]["theme"]}`;
            let newQuestion = document.createElement("p");
            newQuestion.innerText = `${objectDataQuestions[i]["question"]}`;
            let newAnswer = document.createElement("p");
            newAnswer.innerText = `${objectDataQuestions[i]["answer"]}`;
            let newClose = document.createElement("div");
            newClose.innerText = '×';
            newClose.className += 'modal__close delete';
            let newFormat = document.createElement("div");
            newFormat.innerText = format;
            let newWrap = document.createElement("div");
            let newWrap2 = document.createElement("div");
            newWrap.appendChild(newTheme);
            newWrap.appendChild(newQuestion);
            newWrap.appendChild(newAnswer);
            newWrap2.appendChild(newClose);
            newWrap2.appendChild(newFormat);
            newWrap2.className += 'wrapper__text-block--right';
            newDiv.appendChild(newWrap);
            newDiv.appendChild(newWrap2);
            newDiv.setAttribute('valueId', objectDataQuestions[i]['id'])
            newDiv.className += 'wrapper__text-block--item';
            documentFragment.appendChild(newDiv);
        }
        my_div.appendChild(documentFragment);
    }
}

function parseXML(xml) {
    xml = xml.replace('<?xml version="1.0"?>', '');
    xml = xml.replace('<questions>', '');
    xml = xml.replace('</questions>', '');
    xml = xml.replace('</block>', '');
    xml = xml.replace('\r\n', '');
    let arrayDataXML = xml.split('<block>');
    console.log(arrayDataXML)
    let result = {"questions": {"block": []}};
    for (let index = 0; index < arrayDataXML.length; index++) {
        let object = {};
        arrayDataXML[index] = arrayDataXML[index].replace('<theme>', '');
        arrayDataXML[index] = arrayDataXML[index].replace('<question>', '');
        arrayDataXML[index] = arrayDataXML[index].replace('<answer>', '');
        arrayDataXML[index] = arrayDataXML[index].replace('<id>', '');
        let arrayLine = [];
        const splitLine = arrayDataXML[index].split('</id>');
        object['id'] = splitLine[0].replace('\r\n', '').trim();
        arrayLine.push(splitLine[0]);
        if (splitLine.length > 1) {
            const splitLine2 = splitLine[1].split('</question>');
            object['question'] = splitLine2[0].replace('\r\n', '').trim();
            arrayLine.push(splitLine2[0]);
            if (splitLine2.length > 1) {
                const splitLine3 = splitLine2[1].split('</theme>');
                object['theme'] = splitLine3[0].replace('\r\n', '').trim();
                arrayLine.push(splitLine3[0]);
                if (splitLine3.length > 1) {
                    object['answer'] = splitLine3[1].split('</answer>')[0].replace('\r\n', '').trim();
                    arrayLine.push(splitLine3[1].split('</answer>')[0]);
                    result['questions']['block'].push(object);
                }
            }
        }
        arrayDataXML[index] = arrayLine;
        // arrayDataXML[index]=arrayDataXML[index].trim()
    }
    console.log(result);
    return result;
}


function serialiseXML(objXML, result = '<?xml version="1.0"?>', block = '') {
    const objXMLKey = Object.getOwnPropertyNames(objXML);
    if (!Number.isNaN(Number(objXMLKey[0]))) {
        objXMLKey.pop();
    }
    if (objXMLKey.includes('length')) return '';
    let tempResult = '';
    for (let elem in objXMLKey) {
        if (Number.isNaN(Number(objXMLKey[elem]))) {
            if (Array.isArray(objXML[objXMLKey[elem]])) {
                tempResult = serialiseXML(objXML[objXMLKey[elem]], tempResult, objXMLKey[elem])
            } else {
                if (typeof objXML[objXMLKey[elem]] === "object") {
                    tempResult = `<${objXMLKey[elem]}>${serialiseXML(objXML[objXMLKey[elem]], tempResult)}</${objXMLKey[elem]}>`;
                } else {
                    tempResult += `<${objXMLKey[elem]}>${objXML[objXMLKey[elem]]}</${objXMLKey[elem]}>`;
                }
            }
        } else {

            tempResult += `<${block}>${serialiseXML(objXML[objXMLKey[elem]], result)}</${block}>`;
        }
    }
    return result + tempResult;
}

function parseCSV(csv) {
    let result = [];
    console.log(csv)
    let lineCSV = csv.split('\r\n');
    console.log(lineCSV)
    lineCSV.pop();
    for (let i = 0; i < lineCSV.length; i++) {
        lineCSV[i] = lineCSV[i].split(';');
    }
    for (let i = 1; i < lineCSV.length; i++) {
        let tempResult = {};
        for (let j = 0; j < lineCSV[i].length; j++) {
            tempResult[lineCSV[0][j]] = lineCSV[i][j];
        }
        result.push(tempResult);
    }
    return result;
}

function serialiseCSV(objCSV) {
    let result = '';
    const objCSVKey = Object.getOwnPropertyNames(objCSV);
    if (objCSVKey.length > 0) {
        result = Object.getOwnPropertyNames(objCSV[objCSVKey[0]]).join(';');
        for (let i = 0; i < objCSVKey.length; i++) {
            result = result.concat('\r\n', Object.values(objCSV[objCSVKey[i]]).join(';'))
        }
    }
    return result;
}

function parseYAML(yaml) {
    let result = [];
    let tempResult = {};
    let lineYAML = yaml.split('\r\n');
    lineYAML.pop();
    let key = 0;
    for (let i = 0; i < lineYAML.length; i++) {
        lineYAML[i] = lineYAML[i].split(':');
        if (lineYAML[i][1] === '') {
            if (key !== 0) {
                result[key - 1] = tempResult;
            }
            result[key] = {};
            tempResult = {};
            key = key + 1;
        } else {
            if (lineYAML[i][1])
            tempResult[lineYAML[i][0].trim()] = lineYAML[i][1].trim();
        }

    }
    if (key > 0)
        result[key - 1] = tempResult;
    return result;
}

function serialiseYAML(objYAML) {
    let result = ' ';
    const keyObjYAML = Object.getOwnPropertyNames(objYAML);
    keyObjYAML.pop();
    for (let i = 0; i < keyObjYAML.length; i++) {
        const innerKeyObject = Object.getOwnPropertyNames(objYAML[i]);
        result = result + keyObjYAML[i] + ":\r\n";
        for (let j = 0; j < innerKeyObject.length; j++) {
            result = result + innerKeyObject[j] + `:${objYAML[keyObjYAML[i]][innerKeyObject[j]]}\r\n`;
        }
    }
    return result;
}


function eventClickCreateQuestion() {
    const question = document.getElementById('question_input').value;
    const themeSelect = document.getElementById('select_theme');
    const theme = themeSelect.options[themeSelect.selectedIndex].text;
    const answer = document.getElementById('checkboxTrue').checked;
    const radioCSV = document.getElementById('radioCSV');
    const radioJSON = document.getElementById('radioJSON');
    const radioXML = document.getElementById('radioXML');
    const radioYAML = document.getElementById('radioYAML');

    if (radioJSON.checked) {
        addToJSON(question, theme, answer);
    }
    if (radioCSV.checked) {
        addToCSV(question, theme, answer);
    }
    if (radioXML.checked) {
        addToXML(question, theme, answer);
    }
    if (radioYAML.checked) {
        addToYAML(question, theme, answer);
    }
    eventClickCloseQuestion();
    eventClickFilterFormat();
}

function eventClickCloseQuestion() {
    document.getElementById('question_input').value = '';
    const themeSelect = document.getElementById('select_theme');
    themeSelect.selectedIndex = 0;
    document.getElementById('checkboxTrue').checked = true;
    document.getElementById('radioCSV').checked = false;
    document.getElementById('radioJSON').checked = true;
    document.getElementById('radioXML').checked = false;
    document.getElementById('radioYAML').checked = false;
    window.location.href = '#close';
    console.log('close');
}

function eventClickFilterFormat() {
    const selectFormat = document.getElementById('select_format');
    const formatFile = selectFormat.options[selectFormat.selectedIndex].text;
    let allFormat = [];
    switch (formatFile) {
        case 'JSON':
            activeFormat = 'JSON';
            addElement(objJSON['01'], 'JSON');
            break;
        case 'XML':
            activeFormat = 'XML';
            addElement(objXML['questions']['block'], 'XML');
            break;
        case 'CSV':
            activeFormat = 'CSV';
            addElement(objCSV, 'CSV');
            break;
        case 'YAML':
            activeFormat = 'YAML';
            addElement(objYAML, 'YAML');
            break;
        case 'all':
            activeFormat = 'all';
            addElement(objJSON['01'], 'JSON');
            addElement(objXML['questions']['block'], 'XML', false);
            addElement(objCSV, 'CSV', false);
            addElement(objYAML, 'YAML', false);
            break;
    }
}

function eventClickFilterTheme() {
    const selectThemeFilter = document.getElementById('select_theme_filter');
    const themeFilter = selectThemeFilter.options[selectThemeFilter.selectedIndex].text;
    let filteredArray = [];
    switch (activeFormat) {
        case 'JSON':
            filteredArray = filteredArray.concat(objJSON['01']);
            filteredArray = filteredArray.filter((elem) => elem['theme'] === themeFilter);
            addElement(filteredArray, 'JSON');
            break;
        case 'XML':
            filteredArray = filteredArray.concat(objXML['questions']['block']);
            filteredArray = filteredArray.filter((elem) => elem['theme'] === themeFilter);
            addElement(filteredArray, 'XML');
            break;
        case 'CSV':
            filteredArray = filteredArray.concat(objCSV);
            filteredArray = filteredArray.filter((elem) => elem['theme'] === themeFilter);
            addElement(filteredArray, 'CSV');
            break;
        case 'YAML':
            filteredArray = filteredArray.concat(objYAML);
            filteredArray = filteredArray.filter((elem) => elem['theme'] === themeFilter);
            addElement(filteredArray, 'YAML');
            break;
        case 'all':
            filteredArray = filteredArray.concat(objJSON['01'], objXML['questions']['block'], objCSV, objYAML);
            filteredArray = filteredArray.filter((elem) => elem['theme'] === themeFilter);
            addElement(filteredArray, 'all');
            break;
    }
}

function eventClickDeleteQuestion(event) {
    if (!event.target.classList.contains('delete')) return;
    const formatFile = event.target.parentNode.lastChild.innerText;
    const id = event.target.parentNode.parentNode.getAttribute('valueid');
    deleteByIdFromFormat(id, formatFile);
}

function deleteByIdFromFormat(id, format) {
    switch (format) {
        case 'JSON':
            deleteFromJSON(objJSON, id);
            break;
        case 'XML':
            deleteFromXML(objXML, id)
            break;
        case 'CSV':
            deleteFromCSV(objCSV, id)
            break;
        case 'YAML':
            deleteFromYAML(objYAML, id)
            break;
    }
    eventClickFilterFormat();
}

addListener('create_question', 'click', eventClickCreateQuestion)
addListener('close_module', 'click', eventClickCloseQuestion)
addListener('list-questions-add', 'click', eventClickDeleteQuestion)
addListener('select_format', 'change', eventClickFilterFormat)
addListener('select_theme_filter', 'change', eventClickFilterTheme.bind(null, event))