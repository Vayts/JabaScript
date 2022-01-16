//removeIf(production)
const {
    setBackgroundImage,
    getInputValue,
    setInputValue,
    getFileFromInput,
    clearTempFiles,
    toggleDisabledClass,
    addListener,
    removeListener,
    createElement,
    getNodeChecked,
    getNodeSelectedText,
    setNodeChecked,
    setNodeSelectedText,
    setValueLocalStorage,
    getValueLocalStorage,
    setNodeDisable,
    removeNodeClass,
    addNodeClass
} = require('./utils')
const {getDataYAML, getDataXML, getDataJSON, getDataCSV} = require('./getData')
const {addQuestionsBlock} = require('./сreateContent')
const {addToJSON,addToCSV,addToXML,addToYAML} = require('./addTo')
const {deleteFromXML,deleteFromJSON,deleteFromCSV,deleteFromYAML}=require('./deleteFrom')
//endRemoveIf(production)

function initQuestions() {
    const urlJSON = 'http://localhost:3050/questions.json';
    const urlXML = 'http://localhost:3050/questions.xml';
    const urlCSV = 'http://localhost:3050/questions.csv';
    const urlYAML = 'http://localhost:3050/questions.yaml';

    let activeFormat = {fileFormat: 'JSON', currentTheme: 'ALL'};
    initLocalStorage(activeFormat)

    let stateAllFormat = {
        objJSON: {'01':[]},
        objXML: {'questions':{'block':[]}},
        objCSV: [],
        objYAML: []
    }

    const promiseYAML = getDataYAML(stateAllFormat, urlYAML);
    const promiseCSV = getDataCSV(stateAllFormat, urlCSV);
    const promiseXML = getDataXML(stateAllFormat, urlXML);
    const promiseJSON = getDataJSON(stateAllFormat, urlJSON, activeFormat);
    Promise.all([promiseYAML, promiseCSV, promiseXML, promiseJSON]).then(() => {
        eventClickFilterTheme(stateAllFormat, activeFormat);
    }).catch();

    addListener('create_question', 'click', eventClickCreateQuestion.bind(null, stateAllFormat, activeFormat))
    addListener('close_module', 'click', eventClickCloseQuestion)
    addListener('list-questions-add', 'click', eventClickDeleteQuestion.bind(null, stateAllFormat))
    addListener('select_format', 'change', eventClickFilterFormat.bind(null, stateAllFormat, activeFormat))
    addListener('select_theme_filter', 'change', eventClickFilterTheme.bind(null, stateAllFormat, activeFormat))
    addListener('openAlert', 'click', eventClickWithoutModal.bind(null, 'modal__content'))
    addListener('openModal', 'click', eventClickWithoutModal.bind(null, 'modal__content'))
    addListener('question_input', 'change', eventChangeQuestionInput.bind(null, stateAllFormat, activeFormat))
    addListener('closeAlert', 'click', () => {
        setWindowLocationHref('#close');
    })
    addListener('cancel', 'click', () => {
        setWindowLocationHref('#close');
    })
}

function eventChangeQuestionInput(stateAllFormat, activeFormat) {
    if (getInputValue('question_input').length > 0) {
        removeNodeClass('create_question', 'button-custom__item--disabled');
        setNodeDisable('create_question');
    } else {
        addNodeClass('create_question', 'button-custom__item--disabled');
        setNodeDisable('create_question', true);
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
        setNodeSelectedText('select_theme_filter', ['GIT', 'UNIT TESTING', 'CLOSURE', 'OOP', 'DATA STRUCTURES', 'ALL'].indexOf(activeFormat.currentTheme) + 1);
    }
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
    eventClickFilterFormat(state, activeFormat);
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
    setNodeDisable('create_question', true);
}

function eventClickFilterFormat(state, activeFormat) {
    const formatFile = getNodeSelectedText('select_format');
    activeFormat.fileFormat = formatFile;
    if (activeFormat.currentTheme !== 'ALL') {
        eventClickFilterTheme(state, activeFormat);
        return;
    }
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
    };

    addListener('confirm', 'click', clickConfirm)


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


//removeIf(production)
module.exports = {
    initQuestions,
    eventChangeQuestionInput,
    initLocalStorage,
    eventClickCreateQuestion,
    eventClickFilterFormat,
    allDataSort,
    addArrayAndFormat,
    eventClickFilterTheme,
    eventClickWithoutModal,
    eventConfirm,
    deleteByIdFromFormat

}
//endRemoveIf(production)



