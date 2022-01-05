const urlJSON = 'http://localhost:3050/questions.json';
const urlXML = 'http://localhost:3050/questions.xml';
const urlCSV = 'http://localhost:3050/questions.csv';
const urlYAML = 'http://localhost:3050/questions.yaml';

let objJSON = null;
let objXML = null;
let objCSV = null;
let objYAML = null;
let allFormat = [];
let activeFormat='JSON';

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
        addElement(objJSON['01']);
    })
}

function getDataXML() {
    fetch(urlXML)
        .then((res) => {
            console.log(res);
            return res.text()
        }).then((data) => {
        objXML = parseXML(data);
        addElement(objXML['questions']['block']);
    })
}

function getDataCSV() {
    fetch(urlCSV)
        .then((res) => {
            return res.text()
        }).then((data) => {
        objCSV = parseCSV(data);
        addElement(objCSV);
    })
}


function getDataYAML() {
    fetch(urlYAML)
        .then((res) => {
            return res.text()
        }).then((data) => {
        objYAML = parseYAML(data);
        console.log(objYAML);
        addElement(objYAML);
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

function addElement(objectDataQuestions) {
    let my_div = document.getElementById("list-questions-add");
    let documentFragment = document.createDocumentFragment();
    while (my_div.firstChild) {
        my_div.removeChild(my_div.firstChild);
    }
    if (objectDataQuestions != null) {
        for (let i = 0; i < objectDataQuestions.length; i++) {
            let newDiv = document.createElement("section");
            let newTheme = document.createElement("h3");
            newTheme.innerText = `${objectDataQuestions[i]["theme"]}`;
            newDiv.appendChild(newTheme);
            let newQuestion = document.createElement("p");
            newQuestion.innerText = `${objectDataQuestions[i]["question"]}`;
            let newAnswer = document.createElement("p");
            newAnswer.innerText = `${objectDataQuestions[i]["answer"]}`;
            newDiv.appendChild(newQuestion);
            newDiv.appendChild(newAnswer);

            newDiv.className += 'wrapper__text-block--item';
            documentFragment.appendChild(newDiv);
        }
        my_div.appendChild(documentFragment);
    }
}

function parseXML(xml) {
    let dom = null;
    if (window.DOMParser) dom = (new DOMParser()).parseFromString(xml, "text/xml");
    else if (window.ActiveXObject) {
        dom = new ActiveXObject('Microsoft.XMLDOM');
        dom.async = false;
        if (!dom.loadXML(xml)) throw dom.parseError.reason + " " + dom.parseError.srcText;
    } else throw new Error("cannot parse xml string!");
    console.log(dom);

    function xmlToObject(xml) {
        let result = {};
        if (xml.children.length > 0) {
            for (let i = 0; i < xml.children.length; i++) {
                let item = xml.children.item(i);
                let nodeName = item.nodeName;
                if (typeof (result[nodeName]) === "undefined") {
                    result[nodeName] = xmlToObject(item);
                } else {
                    if (typeof (result[nodeName].push) === "undefined") {
                        let old = result[nodeName];

                        result[nodeName] = [];
                        result[nodeName].push(old);
                    }
                    result[nodeName].push(xmlToObject(item));
                }

                if (item.attributes)
                    for (let attribute of item.attributes) {
                        if (i) {
                            result[nodeName][i][attribute.nodeName] = attribute.nodeValue;
                        } else {

                            result[nodeName][attribute.nodeName] = attribute.nodeValue;
                        }
                        console.log(Object.keys(result).length, result[nodeName]);
                    }
            }
        } else {
            result = xml.textContent;
        }
        return result;
    }

    return xmlToObject(dom);
}

function serialiseXML(objXML, result = '<?xml version="1.0"?>', block = '') {
    const objXMLKey = Object.getOwnPropertyNames(objXML);
    if (!Number.isNaN(Number(objXMLKey[0]))) {
        objXMLKey.pop();
    }
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
    let lineCSV = csv.split('\r\n');
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
            tempResult[lineYAML[i][0].trim()] = lineYAML[i][1].trim();
        }

    }
    result[key - 1] = tempResult;
    return result;
}

function serialiseYAML(objYAML) {
    let result = '';
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
    console.log('create');
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
    switch (formatFile) {
        case 'JSON':
            activeFormat='JSON';
            addElement(objJSON['01']);
            break;
        case 'XML':
            activeFormat='XML';
            addElement(objXML['questions']['block']);
            break;
        case 'CSV':
            activeFormat='CSV';
            addElement(objCSV);
            break;
        case 'YAML':
            activeFormat='YAML';
            addElement(objYAML);
            break;
        case 'all':
            activeFormat='all';
            allFormat=allFormat.concat(objJSON['01'],objXML['questions']['block'],objCSV,objYAML);
            addElement(allFormat);
            break;
    }
}

function eventClickFilterTheme(){
    const selectThemeFilter = document.getElementById('select_theme_filter');
    const themeFilter = selectThemeFilter.options[selectThemeFilter.selectedIndex].text;
    let filteredArray=[];
    switch (activeFormat) {
        case 'JSON':
            filteredArray=filteredArray.concat(objJSON['01']);
            filteredArray=filteredArray.filter((elem)=>elem['theme']===themeFilter);
            addElement(filteredArray);
            break;
        case 'XML':
            filteredArray=filteredArray.concat(objXML['questions']['block']);
            filteredArray=filteredArray.filter((elem)=>elem['theme']===themeFilter);
            addElement(filteredArray);
            break;
        case 'CSV':
            filteredArray=filteredArray.concat(objCSV);
            filteredArray=filteredArray.filter((elem)=>elem['theme']===themeFilter);
            addElement(filteredArray);
            break;
        case 'YAML':
            filteredArray=filteredArray.concat(objYAML);
            filteredArray=filteredArray.filter((elem)=>elem['theme']===themeFilter);
            addElement(filteredArray);
            break;
        case 'all':
            filteredArray=filteredArray.concat(objJSON['01'],objXML['questions']['block'],objCSV,objYAML);
            filteredArray=filteredArray.filter((elem)=>elem['theme']===themeFilter);
            addElement(filteredArray);
            break;
    }
}


addListener('create_question', 'click', eventClickCreateQuestion)
addListener('close_module', 'click', eventClickCloseQuestion)
addListener('select_format', 'change', eventClickFilterFormat)
addListener('select_theme_filter', 'change', eventClickFilterTheme)