function parseXML(xmlText) {
    xmlText = xmlText.replace('<?xml version="1.0"?>', '');
    xmlText = xmlText.replace('<questions>', '');
    xmlText = xmlText.replace('</questions>', '');
    xmlText = xmlText.replace('</block>', '');
    xmlText = xmlText.replace('\r\n', '');
    let arrayDataXML = xmlText.split('<block>');

    let result = {"questions": {"block": []}};
    for (let index = 0; index < arrayDataXML.length; index++) {
        let currentRecord = {};
        arrayDataXML[index] = arrayDataXML[index].replace('<theme>', '');
        arrayDataXML[index] = arrayDataXML[index].replace('<question>', '');
        arrayDataXML[index] = arrayDataXML[index].replace('<answer>', '');
        arrayDataXML[index] = arrayDataXML[index].replace('<id>', '');
        const splitLine = arrayDataXML[index].split('</id>');
        currentRecord['id'] = splitLine[0].replace('\r\n', '').trim();
        if (splitLine.length > 1) {
            const splitLine2 = splitLine[1].split('</question>');
            currentRecord['question'] = splitLine2[0].replace('\r\n', '').trim();
            if (splitLine2.length > 1) {
                const splitLine3 = splitLine2[1].split('</theme>');
                currentRecord['theme'] = splitLine3[0].replace('\r\n', '').trim();
                if (splitLine3.length > 1) {
                    currentRecord['answer'] = splitLine3[1].split('</answer>')[0].replace('\r\n', '').trim();
                    result['questions']['block'].push(currentRecord);
                }
            }
        }
        // arrayDataXML[index]=arrayDataXML[index].trim()
    }
    return result;
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