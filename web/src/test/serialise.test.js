const {serialiseCSV, serialiseXML, serialiseYAML} = require('../script/serialise')

describe('serialiseCSV', () => {
    test('0 record', () => {
        expect(serialiseCSV([])).toBe('');
    })
    test('1 record', () => {
        expect(serialiseCSV([{
            id: '1642244413593',
            question: '1',
            theme: 'GIT',
            answer: 'true'
        }])).toBe('id;question;theme;answer\r\n' +
            '1642244413593;1;GIT;true');
    })
    test('2 record', () => {
        expect(serialiseCSV([{
            id: '1642244413593',
            question: '1',
            theme: 'GIT',
            answer: 'true'
        }, {
            id: '1642244413593',
            question: '1',
            theme: 'GIT',
            answer: 'true'
        }])).toBe('id;question;theme;answer\r\n' +
            '1642244413593;1;GIT;true\r\n' +
            '1642244413593;1;GIT;true');
    })
})
describe('serialiseYAML', () => {
    test('0 record', () => {
        expect(serialiseYAML([])).toBe('');
    })
    test('1 record', () => {
        expect(serialiseYAML([{
            id: '1642244413593',
            question: '1',
            theme: 'GIT',
            answer: 'true'
        }])).toBe('0:\r\n' +
            'id:1642244413593\r\n' +
            'question:1\r\n' +
            'theme:GIT\r\n' +
            'answer:true\r\n');
    })
    test('2 record', () => {
        expect(serialiseYAML([{
            id: '1642244413593',
            question: '1',
            theme: 'GIT',
            answer: 'true'
        }, {
            id: '1642244413593',
            question: '1',
            theme: 'GIT',
            answer: 'true'
        }])).toBe('0:\r\n' +
            'id:1642244413593\r\n' +
            'question:1\r\n' +
            'theme:GIT\r\n' +
            'answer:true\r\n' + '' +
            '1:\r\n' +
            'id:1642244413593\r\n' +
            'question:1\r\n' +
            'theme:GIT\r\n' +
            'answer:true\r\n');
    })
})

describe('serialiseXML', () => {
    test('0 record', () => {
        expect(serialiseXML({"questions": {"block": []}})).toBe('<?xml version="1.0"?><questions></questions>');
    })
    test('1 record', () => {
        expect(serialiseXML({
            "questions": {
                "block": [{
                    id: '1642257147369',
                    question: 'fc',
                    theme: 'GIT',
                    answer: 'true'
                }]
            }
        })).toBe('<?xml version="1.0"?><questions><block><id>1642257147369</id><question>fc</question><theme>GIT</theme><answer>true</answer></block></questions>');
    })
    test('2 record', () => {
        expect(serialiseXML({
            "questions": {
                "block": [{
                    id: '1642257147369',
                    question: 'fc',
                    theme: 'GIT',
                    answer: 'true'
                }, {id: '1642257147369', question: 'fc', theme: 'GIT', answer: 'true'}]
            }
        })).toBe('<?xml version="1.0"?><questions><block><id>1642257147369</id><question>fc</question><theme>GIT</theme><answer>true</answer></block><block><id>1642257147369</id><question>fc</question><theme>GIT</theme><answer>true</answer></block></questions>');
    })
})
