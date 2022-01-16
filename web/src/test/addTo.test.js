const {addToYAML, addToXML, addToCSV, addToJSON} = require('../script/addTo')
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(true),
    })
);
describe('addToYAML', () => {
    test('add', () => {
        expect(addToYAML({
            objYAML: [{
                id: '1642244413593',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            }, {
                id: '1642244413544',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            }]
        }, '', '', '')).toBeUndefined();
    })
})
describe('addToCSV', () => {
    test('add', () => {
        expect(addToCSV({
            objCSV: [{
                id: '1642244413593',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            }, {
                id: '1642244413544',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            }]
        }, '', '', '')).toBeUndefined();
    })
})
describe('addToXML', () => {
    test('add', () => {
        expect(addToXML({
            objXML: {
                "questions": {
                    "block": [{
                        id: '1642257147369',
                        question: 'fc',
                        theme: 'GIT',
                        answer: 'true'
                    }, {id: '1642257147369', question: 'fc', theme: 'GIT', answer: 'true'}]
                }
            }
        }, '', '', '')).toBeUndefined();
    })
})
describe('addToJSON', () => {
    test('add', () => {
        expect(addToJSON({
            objJSON: {
                "01": [{
                    "id": 1642244334746,
                    "question": "яфяфяф",
                    "theme": "CLOSURE",
                    "answer": true
                }]
            }
        }, '', '', '')).toBeUndefined();
    })
})
