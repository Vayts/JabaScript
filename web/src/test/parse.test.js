const {parseCSV,parseXML,parseYAML} = require('../script/parse')

describe('parseXML',()=>{
    test('',()=>{
        expect(parseXML('')).toEqual({"questions": {"block": []}});
    })
    test('1 record',()=>{
        expect(parseXML('<?xml version="1.0"?><questions><block><id>1642257147369</id><question>fc</question><theme>GIT</theme><answer>true</answer></block></questions>')).toEqual({"questions": {"block": [{id: '1642257147369', question: 'fc', theme: 'GIT', answer: 'true'}]}});
    })
    test('0 record - without </theme>',()=>{
        expect(parseXML('<?xml version="1.0"?><questions><block><id>1642257147369</id><question>fc</question><theme>GIT><answer>true</answer></block></questions>')).toEqual({"questions": {"block": []}});
    })
    test('0 record - without </question>',()=>{
        expect(parseXML('<?xml version="1.0"?><questions><block><id>1642257147369</id><question>fc<theme>GIT</theme><answer>true</answer></block></questions>')).toEqual({"questions": {"block": []}});
    })
    test('0 record',()=>{
        expect(parseXML('<?xml version="1.0"?><questions></questions>')).toEqual({"questions": {"block": []}});
    })
    test('2 record',()=>{
        expect(parseXML('<?xml version="1.0"?><questions><block><id>1642257147369</id><question>fc</question><theme>GIT</theme><answer>true</answer></block><block><id>1642257147369</id><question>fc</question><theme>GIT</theme><answer>true</answer></block></questions>')).toEqual({"questions": {"block": [{id: '1642257147369', question: 'fc', theme: 'GIT', answer: 'true'},{id: '1642257147369', question: 'fc', theme: 'GIT', answer: 'true'}]}});
    })
})

describe('parseCSV',()=>{
    test('',()=>{
        expect(parseCSV('')).toEqual([]);
    })
    test('1 record',()=>{
        expect(parseCSV('id;question;theme;answer\r\n' +
            '1642244413593;1;GIT;true\r\n' +
            '\r\n')).toEqual([{id: '1642244413593', question: '1', theme: 'GIT', answer: 'true'}]);
    })
    test('2 record',()=>{
        expect(parseCSV('id;question;theme;answer\r\n' +
            '1642244413593;1;GIT;true\r\n' +
            '1642244413593;1;GIT;true\r\n' +
            '\r\n')).toEqual([{id: '1642244413593', question: '1', theme: 'GIT', answer: 'true'},{id: '1642244413593', question: '1', theme: 'GIT', answer: 'true'}]);
    })
    test('0 record',()=>{
        expect(parseCSV('id;question;theme;answer\r\n' +
            '\r\n')).toEqual([]);
    })
})

describe('parseYAML',()=>{
    test('',()=>{
        expect(parseYAML('')).toEqual([]);
    })
    test('1 record',()=>{
        expect(parseYAML(' 0:\r\n' +
            'id:1642258160656\r\n' +
            'question:assd\r\n' +
            'theme:GIT\r\n' +
            'answer:true\r\n')).toEqual([{id: '1642258160656', question: 'assd', theme: 'GIT', answer: 'true'}]);
    })
    test('2 record',()=>{
        expect(parseYAML(' 0:\r\n' +
            'id:1642258160656\r\n' +
            'question:assd\r\n' +
            'theme:GIT\r\n' +
            'answer:true\r\n '+
            '1:\r\n' +
            'id:1642258160656\r\n' +
            'question:assd\r\n' +
            'theme:GIT\r\n' +
            'answer:true\r\n')).toEqual([{id: '1642258160656', question: 'assd', theme: 'GIT', answer: 'true'},{id: '1642258160656', question: 'assd', theme: 'GIT', answer: 'true'}]);
    })
})
