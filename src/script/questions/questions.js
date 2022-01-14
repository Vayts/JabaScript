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


function removeListener(id, eventType, callback) {
    const node = document.getElementById(id);
    if (node) {
        node.removeEventListener(eventType, callback);
    }
}

getDataYAML();
getDataCSV();
getDataXML();
getDataJSON();


//////////

function createElement(tagName, className, text) {
    let newNode = document.createElement(tagName);
    if (newNode) {
        newNode.innerText = text;
        newNode.className += className;
        return newNode;
    }
    return null;
}


function addQuestionsBlock(objectDataQuestions, formatFile, isRemoveOldBlock = true) {
    let listQuestionsDiv = document.getElementById("list-questions-add");
    let documentFragment = document.createDocumentFragment();
    if (isRemoveOldBlock) {
        while (listQuestionsDiv.firstChild) {
            listQuestionsDiv.removeChild(listQuestionsDiv.firstChild);
        }
    }
    if (objectDataQuestions != null && (objectDataQuestions.length!==0 )) {
        for (let i = 0; i < objectDataQuestions.length; i++) {
            const recordTheme = objectDataQuestions[i]["theme"] || objectDataQuestions[i]['item']["theme"];
            const recordQuestion = objectDataQuestions[i]["question"] || objectDataQuestions[i]['item']["question"];
            const recordAnswer = objectDataQuestions[i]["answer"] || objectDataQuestions[i]['item']["answer"];
            const recordId = objectDataQuestions[i]['id'] || objectDataQuestions[i]['item']['id'];
            const fileFormat = formatFile || objectDataQuestions[i]['format'];

            const blockQuestionBlockElement = createElement("section", 'wrapper__text-block--item', '');
            const blockTheme = createElement("h2", '', `${recordTheme}`);
            const blockQuestion = createElement("h4", '', `${recordQuestion}`);
            const blockAnswer = createElement("h4", '', `${recordAnswer}`);
            const blockDate = createElement('p', 'wrapper__text-block--text', `${new Date(Number(recordId)).toLocaleDateString()} ${new Date(Number(recordId)).toLocaleTimeString()}`);
            const blockClose = createElement("a", 'wrapper__text-block--delete delete delete__disabled', '×');
            const blockFormat = createElement("div", '', fileFormat);
            const leftWrapper = createElement('div', 'wrapper__text-block--left', '');
            const bottomWrapper = createElement('div', 'wrapper__text-block--bottom', '');
            const topWrapper = createElement('div', 'wrapper__text-block--top', '');


            leftWrapper.appendChild(blockTheme);
            leftWrapper.appendChild(blockQuestion);
            leftWrapper.appendChild(blockAnswer);
            bottomWrapper.appendChild(blockDate);
            bottomWrapper.appendChild(blockFormat);
            topWrapper.appendChild(leftWrapper);
            topWrapper.appendChild(blockClose);
            blockQuestionBlockElement.appendChild(topWrapper);
            blockQuestionBlockElement.appendChild(bottomWrapper);

            blockQuestionBlockElement.setAttribute('valueId',recordId)
            documentFragment.appendChild(blockQuestionBlockElement);
        }
    } else {
        const blockTheme = createElement("h2", 'coming-soon', 'There are no questions');
        documentFragment.appendChild(blockTheme);
    }
    listQuestionsDiv.appendChild(documentFragment);
}

function getNodeValue(id) {
    const node = document.getElementById(id);
    if (node) {
        return node.value;
    }
    return '';
}

function setNodeValue(id, value='') {
    const node = document.getElementById(id);
    if (node) {
        return node.value=value;
    }
    return false;
}

function getNodeChecked(id) {
    const node = document.getElementById(id);
    if (node) {
        return node.checked;
    }
    return false;
}

function setNodeChecked(id,checked=false) {
    const node = document.getElementById(id);
    if (node) {
        return node.checked = checked;
    }
    return false;
}

function getNodeSelectedText(id) {
    const node = document.getElementById(id);
    if (node) {
        return node.options[node.selectedIndex].text;
    }
    return '';
}

function setNodeSelectedText(id, selectIndex) {
    const node = document.getElementById(id);
    if (node) {
        return node.selectedIndex=selectIndex;
    }
    return '';
}

function eventClickCreateQuestion() {
    const question = getNodeValue('question_input');
    const theme = getNodeSelectedText('select_theme');
    const isAnswer = getNodeChecked('checkboxTrue');
    const checkedRadioCSV = getNodeChecked('radioCSV');
    const checkedRadioJSON = getNodeChecked('radioJSON');
    const checkedRadioXML = getNodeChecked('radioXML');
    const checkedRadioYAML = getNodeChecked('radioYAML');

    if (checkedRadioJSON) {
        addToJSON(question, theme, isAnswer);
    }
    if (checkedRadioCSV) {
        addToCSV(question, theme, isAnswer);
    }
    if (checkedRadioXML) {
        addToXML(question, theme, isAnswer);
    }
    if (checkedRadioYAML) {
        addToYAML(question, theme, isAnswer);
    }
    eventClickCloseQuestion();
    eventClickFilterFormat();
}

function setWindowLocationHref(href) {
    window.location.href = href;
}

function eventClickCloseQuestion() {
    setNodeValue('question_input');
    setNodeSelectedText('select_theme',0);
    setNodeChecked('checkboxTrue', true);
    setNodeChecked('radioCSV');
    setNodeChecked('radioJSON', true);
    setNodeChecked('radioXML');
    setNodeChecked('radioYAML');
    setWindowLocationHref('#close');
}

function eventClickFilterFormat() {
    const formatFile = getNodeSelectedText('select_format');
    let allFormat = [];
    switch (formatFile) {
        case 'JSON':
            activeFormat = 'JSON';
            addQuestionsBlock(objJSON['01'], 'JSON');
            break;
        case 'XML':
            activeFormat = 'XML';
            addQuestionsBlock(objXML['questions']['block'], 'XML');
            break;
        case 'CSV':
            activeFormat = 'CSV';
            addQuestionsBlock(objCSV, 'CSV');
            break;
        case 'YAML':
            activeFormat = 'YAML';
            addQuestionsBlock(objYAML, 'YAML');
            break;
        case 'all':
            activeFormat = 'all';
            let allData = [];
            allData = addArrayAndFormat(objJSON['01'], allData, 'JSON');
            allData = addArrayAndFormat(objXML['questions']['block'], allData, 'XML');
            allData = addArrayAndFormat(objCSV, allData, 'CSV');
            allData = addArrayAndFormat(objYAML, allData, 'YAML');
            allDataSort(allData);
            addQuestionsBlock(allData);
            break;
    }
}

function allDataSort(arrayData) {
    for (let i = 0; i < arrayData.length; i++) {
        for (let j = i; j < arrayData.length; j++) {
            if (Number(arrayData[i]['item']['id']) < Number(arrayData[j]['item']['id'])) {
                [arrayData[i], arrayData[j]] = [arrayData[j], arrayData[i]];
            }
        }
    }
}

function addArrayAndFormat(fromArray, toArray, format) {
    fromArray.forEach((item) => {
        toArray.push({'item': item, 'format': format})
    })
    return toArray;
}

function eventClickFilterTheme() {
    const themeFilter = getNodeSelectedText('select_theme_filter');
    let filteredArray = [];
    switch (activeFormat) {
        case 'JSON':
            filteredArray = filteredArray.concat(objJSON['01']);
            filteredArray = filteredArray.filter((elem) => elem['theme'] === themeFilter);
            addQuestionsBlock(filteredArray, 'JSON');
            break;
        case 'XML':
            filteredArray = filteredArray.concat(objXML['questions']['block']);
            filteredArray = filteredArray.filter((elem) => elem['theme'] === themeFilter);
            addQuestionsBlock(filteredArray, 'XML');
            break;
        case 'CSV':
            filteredArray = filteredArray.concat(objCSV);
            filteredArray = filteredArray.filter((elem) => elem['theme'] === themeFilter);
            addQuestionsBlock(filteredArray, 'CSV');
            break;
        case 'YAML':
            filteredArray = filteredArray.concat(objYAML);
            filteredArray = filteredArray.filter((elem) => elem['theme'] === themeFilter);
            addQuestionsBlock(filteredArray, 'YAML');
            break;
        case 'all':
            let allData = [];
            allData = addArrayAndFormat(objJSON['01'], allData, 'JSON');
            allData = addArrayAndFormat(objXML['questions']['block'], allData, 'XML');
            allData = addArrayAndFormat(objCSV, allData, 'CSV');
            allData = addArrayAndFormat(objYAML, allData, 'YAML');
            allDataSort(allData);
            allData = allData.filter((elem) => elem['item']['theme'] === themeFilter)
            addQuestionsBlock(allData);
            break;
    }
}

function eventClickWithoutModal(className, event) {
    let targetNode = event.target;
    while (!targetNode.classList.contains(className) && targetNode.localName !== 'body') {
        targetNode = targetNode.parentNode;

    }
    if (targetNode.classList.contains(className))
        return;
    setWindowLocationHref('#close');
}


function eventConfirm(id, formatFile) {
    setWindowLocationHref('#openAlert');

    const clickConfirm = () => {
        setWindowLocationHref('#close');
        deleteByIdFromFormat(id, formatFile);
        removeListener('confirm', 'click', clickConfirm)
        removeListener('cancel', 'click', clickCancel)
        removeListener('closeAlert', 'click', clickCancel)
    };
    const clickCancel = () => {
        setWindowLocationHref('#close');
        removeListener('cancel', 'click', clickCancel)
        removeListener('closeAlert', 'click', clickCancel)
        removeListener('confirm', 'click', clickConfirm)
    }

    addListener('confirm', 'click', clickConfirm)
    addListener('cancel', 'click', clickCancel)
    addListener('closeAlert', 'click', clickCancel)


}

function eventClickDeleteQuestion(event) {
    if (!event.target.classList.contains('delete')) return;
    const formatFile = event.target.parentNode.parentNode.lastChild.lastChild.innerText;
    const id = event.target.parentNode.parentNode.getAttribute('valueid');
    eventConfirm(id, formatFile);
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

function removeClassFormChild() {

    let list = document.getElementById('list-questions-add').childNodes;
    list.forEach((item) => {
        item.childNodes[0].childNodes[1].classList.add('delete__disabled');
        console.log(item.childNodes[0].childNodes[1].classList)
    })

}


function eventMouseoverAddButtonDelete(event) {
    if (!event.target.classList.contains('wrapper__text-block--item')) return;
    if (event.type === 'mouseover') {
        // console.log('mouseover', event)
        removeClassFormChild();
        event.target.firstChild.lastChild.classList.remove('delete__disabled');
    } else if (event.type === 'mouseout') {
        let rT = event.relatedTarget;
        while (!rT.classList.contains('wrapper__text-block--item') && rT.localName !== 'body') {
            if (!rT) break;
            if (rT.classList.contains('wrapper__text-block--item'))
                return;
            rT = rT.parentNode;
        }
        if (rT.localName === 'body') {
            event.target.firstChild.lastChild.classList.add('delete__disabled')
        }
        // event.target.firstChild.lastChild.classList.add('delete__disabled');
    }
}

addListener('create_question', 'click', eventClickCreateQuestion)
addListener('close_module', 'click', eventClickCloseQuestion)
addListener('list-questions-add', 'click', eventClickDeleteQuestion)
addListener('list-questions-add', 'mouseover', eventMouseoverAddButtonDelete)
addListener('list-questions-add', 'mouseout', eventMouseoverAddButtonDelete)
addListener('select_format', 'change', eventClickFilterFormat)
addListener('select_theme_filter', 'change', eventClickFilterTheme.bind(null, event))
addListener('openAlert', 'click', eventClickWithoutModal.bind(null, 'modal__content'))
addListener('openModal', 'click', eventClickWithoutModal.bind(null, 'modal__content'))