function initQuestions() {
    const urlJSON = 'http://localhost:3050/questions.json';
    const urlXML = 'http://localhost:3050/questions.xml';
    const urlCSV = 'http://localhost:3050/questions.csv';
    const urlYAML = 'http://localhost:3050/questions.yaml';

    let activeFormat = {fileFormat: 'JSON', currentTheme: 'ALL'};
    initLocalStorage(activeFormat)

    let stateAllFormat = {
        objJSON: null,
        objXML: null,
        objCSV: [],
        objYAML: []
    }

    const a = getDataYAML(stateAllFormat, urlYAML);
    const b = getDataCSV(stateAllFormat, urlCSV);
    const c = getDataXML(stateAllFormat, urlXML);
    const d = getDataJSON(stateAllFormat, urlJSON, activeFormat);
    Promise.all([a, b, c, d]).then(() => {
        console.log('values');
        eventClickFilterTheme(stateAllFormat, activeFormat);
    });
    // eventClickFilterFormat(stateAllFormat, activeFormat);
    addListener('close_module', 'click', eventClickCloseQuestion)
    addListener('list-questions-add', 'click', eventClickDeleteQuestion.bind(null, stateAllFormat))
    addListener('list-questions-add', 'mouseover', eventMouseoverAddButtonDelete)
    addListener('list-questions-add', 'mouseout', eventMouseoverAddButtonDelete)
    addListener('select_format', 'change', eventClickFilterFormat.bind(null, stateAllFormat, activeFormat))
    addListener('select_theme_filter', 'change', eventClickFilterTheme.bind(null, stateAllFormat, activeFormat))
    addListener('openAlert', 'click', eventClickWithoutModal.bind(null, 'modal__content'))
    addListener('openModal', 'click', eventClickWithoutModal.bind(null, 'modal__content'))
    addListener('question_input', 'change', eventChangeQuestionInput.bind(null, stateAllFormat, activeFormat))
    addListener('create_question', 'click', eventClickCreateQuestion.bind(null, stateAllFormat, activeFormat))
}

function eventChangeQuestionInput(stateAllFormat, activeFormat) {
    if (getInputValue('question_input').length > 0) {
        removeNodeClass('create_question', 'button-custom__item--disabled');
        setNodeDisable('create_question');
    } else {
        addNodeClass('create_question', 'button-custom__item--disabled');
        setNodeDisable('create_question',true);
    }
}

//////////

function initLocalStorage(activeFormat) {
    const localeStorageValueFileFormat = getValueLocalStorage('fileFormat');
    if (typeof localeStorageValueFileFormat === 'boolean') {
        setValueLocalStorage('fileFormat', 'JSON')
    } else {
        activeFormat.fileFormat = localeStorageValueFileFormat;
        setNodeSelectedText('select_format', ['CSV', 'JSON', 'XML', 'YAML', 'ALL'].indexOf(activeFormat.fileFormat) + 1);
    }
    const localeStorageValue = getValueLocalStorage('currentTheme');
    if (typeof localeStorageValue === 'boolean') {
        setValueLocalStorage('currentTheme', 'ALL')
    } else {
        activeFormat.currentTheme = localeStorageValue;
        setNodeSelectedText('select_theme_filter', ['GIT', 'UNIT TESTING', 'CLOSURE', 'OOP','DATA STRUCTURES', 'ALL'].indexOf(activeFormat.currentTheme) + 1);
    }
}

function addQuestionsBlock(objectDataQuestions, formatFile, isRemoveOldBlock = true) {
    let listQuestionsDiv = document.getElementById("list-questions-add");
    let documentFragment = document.createDocumentFragment();
    if (isRemoveOldBlock) {
        while (listQuestionsDiv.firstChild) {
            listQuestionsDiv.removeChild(listQuestionsDiv.firstChild);
        }
    }
    if (objectDataQuestions != null && (objectDataQuestions.length !== 0)) {
        for (let i = 0; i < objectDataQuestions.length; i++) {
            const recordTheme = objectDataQuestions[i]["theme"] || objectDataQuestions[i]['item']["theme"];
            const recordQuestion = objectDataQuestions[i]["question"] || objectDataQuestions[i]['item']["question"];
            const recordQuestionsPart = recordQuestion.length > 150 ? recordQuestion.slice(0, 130) + '...' : recordQuestion;
            const recordAnswer = objectDataQuestions[i]["answer"] === undefined ? objectDataQuestions[i]['item']["answer"] : objectDataQuestions[i]["answer"];
            const recordId = objectDataQuestions[i]['id'] || objectDataQuestions[i]['item']['id'];
            const fileFormat = formatFile || objectDataQuestions[i]['fileFormat'];
            let blockQuestionBlockElement;
            if (recordQuestion.length > 150) {
                blockQuestionBlockElement = createElement("section", 'wrapper__text-block--item height-200px', '');
            } else {

                blockQuestionBlockElement = createElement("section", 'wrapper__text-block--item', '');
            }

            const blockTheme = createElement("h4", '', `${recordTheme}`);
            const blockQuestionFull = createElement("h2", 'record-text record-text__full', `${recordQuestion}`);
            const blockQuestionPart = createElement("h2", 'record-text record-text__part', `${recordQuestionsPart}`);
            const blockAnswer = createElement("h4", '', `Answer - ${recordAnswer}`);
            const blockDate = createElement('p', 'wrapper__text-block--text', `${new Date(Number(recordId)).toLocaleDateString()} ${new Date(Number(recordId)).toLocaleTimeString()}`);
            const blockClose = createElement("a", 'wrapper__text-block--delete delete delete__disabled', '×');
            const blockFormat = createElement("div", '', fileFormat);
            const leftWrapper = createElement('div', 'wrapper__text-block--left', '');
            const bottomWrapper = createElement('div', 'wrapper__text-block--bottom', '');
            const topWrapper = createElement('div', 'wrapper__text-block--top', '');


            leftWrapper.appendChild(blockQuestionFull);
            leftWrapper.appendChild(blockQuestionPart);
            leftWrapper.appendChild(blockAnswer);
            leftWrapper.appendChild(blockTheme);
            bottomWrapper.appendChild(blockDate);
            bottomWrapper.appendChild(blockFormat);
            topWrapper.appendChild(leftWrapper);
            topWrapper.appendChild(blockClose);
            blockQuestionBlockElement.appendChild(topWrapper);
            blockQuestionBlockElement.appendChild(bottomWrapper);

            blockQuestionBlockElement.setAttribute('valueId', recordId)
            documentFragment.appendChild(blockQuestionBlockElement);
        }
    } else {
        const blockTheme = createElement("h2", 'coming-soon', 'There are no questions');
        documentFragment.appendChild(blockTheme);
    }
    listQuestionsDiv.appendChild(documentFragment);
}

function eventClickCreateQuestion(state, activeFormat) {
    const question = getInputValue('question_input');
    const theme = getNodeSelectedText('select_theme');
    const isAnswer = getNodeChecked('checkboxTrue');
    const checkedRadioCSV = getNodeChecked('radioCSV');
    const checkedRadioJSON = getNodeChecked('radioJSON');
    const checkedRadioXML = getNodeChecked('radioXML');
    const checkedRadioYAML = getNodeChecked('radioYAML');

    if (checkedRadioJSON) {
        addToJSON(state, question, theme, isAnswer);
    }
    if (checkedRadioCSV) {
        addToCSV(state, question, theme, isAnswer);
    }
    if (checkedRadioXML) {
        addToXML(state, question, theme, isAnswer);
    }
    if (checkedRadioYAML) {
        addToYAML(state, question, theme, isAnswer);
    }
    eventClickCloseQuestion();
    eventClickFilterTheme(state, activeFormat);
}

function setWindowLocationHref(href) {
    window.location.href = href;
}

function eventClickCloseQuestion() {
    setInputValue('question_input');
    setNodeSelectedText('select_theme', 0);
    setNodeChecked('checkboxTrue', true);
    setNodeChecked('radioCSV');
    setNodeChecked('radioJSON', true);
    setNodeChecked('radioXML');
    setNodeChecked('radioYAML');
    setWindowLocationHref('#close');
    addNodeClass('create_question', 'button-custom__item--disabled');
    setNodeDisable('create_question',true);
}

function eventClickFilterFormat(state, activeFormat) {
    const formatFile = getNodeSelectedText('select_format');

    switch (formatFile) {
        case 'JSON':
            activeFormat.fileFormat = 'JSON';
            setValueLocalStorage('fileFormat', 'JSON')
            addQuestionsBlock(state.objJSON['01'], 'JSON');
            break;
        case 'XML':
            activeFormat.fileFormat = 'XML';
            setValueLocalStorage('fileFormat', 'XML')
            addQuestionsBlock(state.objXML['questions']['block'], 'XML');
            break;
        case 'CSV':
            activeFormat.fileFormat = 'CSV';
            setValueLocalStorage('fileFormat', 'CSV')
            addQuestionsBlock(state.objCSV, 'CSV');
            break;
        case 'YAML':
            activeFormat.fileFormat = 'YAML';
            setValueLocalStorage('fileFormat', 'YAML')
            addQuestionsBlock(state.objYAML, 'YAML');
            break;
        case 'ALL':
            activeFormat.fileFormat = 'ALL';
            setValueLocalStorage('fileFormat', 'ALL')
            let allData = [];
            allData = addArrayAndFormat(state.objJSON['01'], allData, 'JSON');
            allData = addArrayAndFormat(state.objXML['questions']['block'], allData, 'XML');
            allData = addArrayAndFormat(state.objCSV, allData, 'CSV');
            allData = addArrayAndFormat(state.objYAML, allData, 'YAML');
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

function addArrayAndFormat(fromArray, toArray, fileFormat) {
    fromArray.forEach((item) => {
        toArray.push({'item': item, 'fileFormat': fileFormat})
    })
    return toArray;
}

function eventClickFilterTheme(state, activeFormat) {
    const themeFilter = getNodeSelectedText('select_theme_filter');
    activeFormat.currentTheme = themeFilter;
    setValueLocalStorage('currentTheme', themeFilter)
    let filteredArray = [];
    if (themeFilter === 'ALL') {
        eventClickFilterFormat(state, activeFormat);
        return;
    }
    switch (activeFormat.fileFormat) {
        case 'JSON':
            filteredArray = filteredArray.concat(state.objJSON['01']);
            filteredArray = filteredArray.filter((elem) => elem['theme'] === themeFilter);
            addQuestionsBlock(filteredArray, 'JSON');
            break;
        case 'XML':
            filteredArray = filteredArray.concat(state.objXML['questions']['block']);
            filteredArray = filteredArray.filter((elem) => elem['theme'] === themeFilter);
            addQuestionsBlock(filteredArray, 'XML');
            break;
        case 'CSV':
            filteredArray = filteredArray.concat(state.objCSV);
            filteredArray = filteredArray.filter((elem) => elem['theme'] === themeFilter);
            addQuestionsBlock(filteredArray, 'CSV');
            break;
        case 'YAML':
            filteredArray = filteredArray.concat(state.objYAML);
            filteredArray = filteredArray.filter((elem) => elem['theme'] === themeFilter);
            addQuestionsBlock(filteredArray, 'YAML');
            break;
        case 'ALL':
            let allData = [];
            allData = addArrayAndFormat(state.objJSON['01'], allData, 'JSON');
            allData = addArrayAndFormat(state.objXML['questions']['block'], allData, 'XML');
            allData = addArrayAndFormat(state.objCSV, allData, 'CSV');
            allData = addArrayAndFormat(state.objYAML, allData, 'YAML');
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


function eventConfirm(state, id, formatFile) {
    setWindowLocationHref('#openAlert');

    const clickConfirm = () => {
        setWindowLocationHref('#close');
        deleteByIdFromFormat(state, id, formatFile);
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

function eventClickDeleteQuestion(state, event) {
    if (!event.target.classList.contains('delete')) return;
    const formatFile = event.target.parentNode.parentNode.lastChild.lastChild.innerText;
    const id = event.target.parentNode.parentNode.getAttribute('valueid');
    eventConfirm(state, id, formatFile);
}

function deleteByIdFromFormat(state, id, fileFormat) {
    switch (fileFormat) {
        case 'JSON':
            deleteFromJSON(state, id);
            break;
        case 'XML':
            deleteFromXML(state, id)
            break;
        case 'CSV':
            deleteFromCSV(state, id)
            break;
        case 'YAML':
            deleteFromYAML(state, id)
            break;
    }
    eventClickFilterFormat(state, {fileFormat: fileFormat});
}

function removeClassFormChild() {

    let list = document.getElementById('list-questions-add').childNodes;
    list.forEach((item) => {
        item.childNodes[0].childNodes[1].classList.add('delete__disabled');
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
        if (!rT) return;
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
