function parseXML(xmlText) {
    xmlText = xmlText.replace('<?xml version="1.0"?>', '');
    xmlText = xmlText.replace('<questions>', '');
    xmlText = xmlText.replace('</questions>', '');
    xmlText = xmlText.replace('</block>', '');
    xmlText = xmlText.replace('\r\n', '');
    const arrayDataXML = xmlText.split('<block>');

    const resultObject = {"questions": {"block": []}};
    for (let index = 0; index < arrayDataXML.length; index++) {
        let currentRecord = {};
        arrayDataXML[index] = arrayDataXML[index].replace('<theme>', '');
        arrayDataXML[index] = arrayDataXML[index].replace('<question>', '');
        arrayDataXML[index] = arrayDataXML[index].replace('<answer>', '');
        arrayDataXML[index] = arrayDataXML[index].replace('<id>', '');
        const currentElementBeforeSplit = arrayDataXML[index].split('</id>');
        currentRecord['id'] = currentElementBeforeSplit[0].replace('\r\n', '').trim();

        if (currentElementBeforeSplit.length > 1) {

            const currentElementBeforeDoubleSplit = currentElementBeforeSplit[1].split('</question>');
            currentRecord['question'] = currentElementBeforeDoubleSplit[0].replace('\r\n', '').trim();

            if (currentElementBeforeDoubleSplit.length > 1) {

                const currentElementBeforeTripleSplit = currentElementBeforeDoubleSplit[1].split('</theme>');
                currentRecord['theme'] = currentElementBeforeTripleSplit[0].replace('\r\n', '').trim();

                if (currentElementBeforeTripleSplit.length > 1) {

                    currentRecord['answer'] = currentElementBeforeTripleSplit[1].split('</answer>')[0].replace('\r\n', '').trim();
                    resultObject['questions']['block'].push(currentRecord);
                }
            }
        }
        // arrayDataXML[index]=arrayDataXML[index].trim()
    }
    return resultObject;
}

function parseCSV(csvText) {
    const resultArray = [];
    const arrayRecordCSV = csvText.split('\r\n');
    for (let i = arrayRecordCSV.length - 1; i >= 0; i--) {
        if (arrayRecordCSV[i].trim() === '') {
            arrayRecordCSV.pop();
        } else {
            break;
        }
    }
    if (arrayRecordCSV.length > 0)
        arrayRecordCSV[0] = arrayRecordCSV[0].split(';');
    for (let i = 1; i < arrayRecordCSV.length; i++) {
        arrayRecordCSV[i] = arrayRecordCSV[i].split(';');
        let currentRecord = {};

        for (let j = 0; j < arrayRecordCSV[i].length; j++) {
            currentRecord[arrayRecordCSV[0][j]] = arrayRecordCSV[i][j];
        }
        resultArray.push(currentRecord);
    }
    return resultArray;
}


function parseYAML(yamlText) {
    const resultArray = [];
    let currentRecord = {};
    const arrayRecordYAML = yamlText.split('\r\n');
    for (let i = arrayRecordYAML.length - 1; i >= 0; i--) {
        if (arrayRecordYAML[i].trim() === '') {
            arrayRecordYAML.pop();
        } else {
            break;
        }
    }
    let currentIndexResult = 0;
    for (let i = 0; i < arrayRecordYAML.length; i++) {
        arrayRecordYAML[i] = arrayRecordYAML[i].split(':');

        if (arrayRecordYAML[i][1] === '') {
            //первый проход currentIndexResult=0
            if (currentIndexResult !== 0) {
                resultArray.push(currentRecord);
            }

            currentRecord = {};
            currentIndexResult++;
        } else {
            const key = arrayRecordYAML[i][0].trim();
            currentRecord[key] = arrayRecordYAML[i][1].trim();

        }

    }
    if (currentIndexResult > 0) {

        resultArray.push(currentRecord);
    }
    return resultArray;
}
//removeIf(production)
module.exports = {parseCSV, parseXML, parseYAML}
//endRemoveIf(production)