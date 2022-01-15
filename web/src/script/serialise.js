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


function serialiseCSV(objCSV) {
    let result = '';
    const objCSVKey = Object.getOwnPropertyNames(objCSV).filter((key)=>key!=='length')
    if (objCSVKey.length > 0) {
        result = Object.getOwnPropertyNames(objCSV[objCSVKey[0]]).join(';');
        for (let i = 0; i < objCSVKey.length; i++) {
            result = result.concat('\r\n', Object.values(objCSV[objCSVKey[i]]).join(';'))
        }
    }
    return result;
}


function serialiseYAML(objYAML) {
    let result = '';
    const keyObjYAML = Object.getOwnPropertyNames(objYAML).filter((key)=>key!=='length');
    for (let i = 0; i < keyObjYAML.length; i++) {
        const innerKeyObject = Object.getOwnPropertyNames(objYAML[i]);
        result = result + keyObjYAML[i] + ":\r\n";
        for (let j = 0; j < innerKeyObject.length; j++) {
            result = result + innerKeyObject[j] + `:${objYAML[keyObjYAML[i]][innerKeyObject[j]]}\r\n`;
        }
    }
    return result;
}
//removeIf(production)
module.exports = {serialiseXML,serialiseCSV,serialiseYAML}
//endRemoveIf(production)