//removeIf(production)
const {createElement}=require('./utils')
//endRemoveIf(production)


function createDeveloperCard(data) {
    return '<li class="developers-list__item">' +
        '<div class="profile">' +
        '<div class="profile__img-wrapper"><img class="profile__img" src="' + data.photo + '" alt="Developer Photo"></div>' +
        '<p class="profile__name">' + data.name + '</p>' +
        '<p class="profile__position">' + data.position + '</p>' +
        '<div class="profile__info">' +
        '<ul class="stats-list">' +
        '<li class="stats-list__item stat">' +
        '<p class="stat__title">Height: &nbsp;</p>' +
        '<p class="stat__text">' + data.height + '</p>' +
        '</li>' +
        '<li class="stats-list__item stat">' +
        '<p class="stat__title">Age: &nbsp;</p>' +
        '<p class="stat__text info-holder">' + data.age + '</p>' +
        '</li>' +
        '<li class="stats-list__item stat">' +
        '<p class="stat__title">Eye color: &nbsp;</p>' +
        '<p class="stat__text info-holder">' + data.eyeColor + '</p>' +
        '</li>' +
        '<li class="stats-list__item stat">' +
        '<p class="stat__title">Experience: &nbsp;</p>' +
        '<p class="stat__text info-holder">' + data.exp + '</p>' +
        '</li>' +
        '<li class="stats-list__item stat">' +
        '<p class="stat__title">Mother tongue: &nbsp;</p>' +
        '<p class="stat__text info-holder">' + data.motherTongue + '</p>' +
        '</li>' +
        '<li class="stats-list__item stat">' +
        '<p class="stat__title">Place of birth: &nbsp;</p>' +
        '<p class="stat__text info-holder">' + data.placeOfBirth + '</p>' +
        '</li>' +
        '</ul>' +
        '<div class="hobby">' +
        '<p class="hobby__title">Hobby</p>' +
        '<p class="hobby__text">' + data.hobby + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="profile__buttons info-buttons">' +
        '<button type="button" class="info-buttons__more button">More</button>' +
        '<button type="button" class="info-buttons__edit button"><span class="icon-edit"></span></button>' +
        '</div>' +
        '</div>' +
        '</li>'
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
                blockQuestionBlockElement = createElement("section", 'wrapper__text-block--item height-180px', '');
            } else {

                blockQuestionBlockElement = createElement("section", 'wrapper__text-block--item', '');
            }

            const blockTheme = createElement("h4", 'record-text__theme', `${recordTheme}`);
            const blockQuestionFull = createElement("h2", 'record-text__question record-text__question__full', `${recordQuestion}`);
            const blockQuestionPart = createElement("h2", 'record-text__question record-text__question__part', `${recordQuestionsPart}`);
            const blockAnswer = createElement("h4", 'record-text__answer', `Answer - ${recordAnswer}`);
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

//removeIf(production)
module.exports = {addQuestionsBlock, createDeveloperCard}
//endRemoveIf(production)
