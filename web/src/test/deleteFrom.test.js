const {deleteFromYAML, deleteFromCSV, deleteFromJSON, deleteFromXML} = require('../script/deleteFrom')

jest.mock('../script/postData', () => {
    const originalModule = jest.requireActual('../script/postData');

    return {
        __esModule: true,
        ...originalModule,
    };
});
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(true),
    })
);
describe('deleteFromYAML', () => {
    test('delete true', () => {
        expect(deleteFromYAML({
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
        }, '1642244413544')).toBe(true);
    })
    test('delete false', () => {
        expect(deleteFromYAML({
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
        }, '1642244413511')).toBe(false);
    })
})

describe('deleteFromCSV', () => {
    test('delete true', () => {
        expect(deleteFromCSV({
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
        }, '1642244413544')).toBe(true);
    })
    test('delete false', () => {
        expect(deleteFromCSV({
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
        }, '1642244413511')).toBe(false);
    })
})

describe('deleteFromJSON', () => {
    test('delete true', () => {
        expect(deleteFromJSON({
            objJSON: {
                "01": [{
                    "id": 1642244334746,
                    "question": "яфяфяф",
                    "theme": "CLOSURE",
                    "answer": true
                }]
            }
        }, 1642244334746)).toBe(true)
    })
    test('delete false', () => {
        expect(deleteFromJSON({
            objJSON: {
                "01": [{
                    "id": 1642244334746,
                    "question": "яфяфяф",
                    "theme": "CLOSURE",
                    "answer": true
                }]
            }
        }, 111111111111)).toBe(false)
    })

})

describe('deleteFromXML', () => {
    test('delete true', () => {
        expect(deleteFromXML({
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
        }, '1642257147369')).toBe(true)
    })
    test('delete false', () => {
        expect(deleteFromXML({
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
        }, '111111111111')).toBe(false)
    })

})
