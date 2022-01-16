const {clickConfirm,eventClickDeleteQuestion, eventConfirm, eventClickWithoutModal, initQuestions, eventChangeQuestionInput, initLocalStorage, eventClickCreateQuestion, eventClickFilterFormat, allDataSort, addArrayAndFormat, eventClickFilterTheme, deleteByIdFromFormat} = require('../script/questions')

jest.mock('../script/getData', () => {
    const originalModule = jest.requireActual('../script/getData');

    //Mock the default export and named export 'foo'
    return {
        __esModule: true,
        ...originalModule,
        getDataJSON: jest.fn(() => {
            return {'01': []}
        }),
        getDataCSV: jest.fn(() => {
            return []
        }),
        getDataYAML: jest.fn(() => {
            return []
        }),
        getDataXML: jest.fn(() => {
            return {'questions': {'block': []}}
        }),
    };
});

jest.mock('../script/сreateContent', () => {
    const originalModule = jest.requireActual('../script/сreateContent');

    //Mock the default export and named export 'foo'
    return {
        __esModule: true,
        ...originalModule,
        addQuestionsBlock: jest.fn()
    };
});
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(true),
    })
);
jest.mock('../script/utils', () => {
    const originalModule = jest.requireActual('../script/utils');

    //Mock the default export and named export 'foo'
    return {
        __esModule: true,
        ...originalModule,
        getInputValue: jest.fn(() => '')
            .mockReturnValueOnce('33'),
        getValueLocalStorage: jest.fn(() => true)
            .mockReturnValueOnce('JSON')
            .mockReturnValueOnce('JSON'),
        getNodeChecked: jest.fn(() => true).mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false).mockReturnValueOnce(false),
        getNodeSelectedText: jest.fn(() => 'JSON')
            .mockReturnValueOnce('JSON')
            .mockReturnValueOnce('JSON')
            .mockReturnValueOnce('XML')
            .mockReturnValueOnce('ALL')
            .mockReturnValueOnce('JSON')
            .mockReturnValueOnce('CSV')
            .mockReturnValueOnce('YAML')
            .mockReturnValueOnce('ALL')
            .mockReturnValueOnce('JSON')
            .mockReturnValueOnce('CSV')
            .mockReturnValueOnce('YAML')
            .mockReturnValueOnce('ALL')
            .mockReturnValueOnce('JSON')
            .mockReturnValueOnce('CSV')
            .mockReturnValueOnce('YAML'),
    };
})
describe('initQuestions', () => {
    test('initQuestions', () => {
        expect(initQuestions()).toBeUndefined()
    })
})

describe('eventChangeQuestionInput', () => {
    test('eventChangeQuestionInput', () => {
        expect(eventChangeQuestionInput()).toBeUndefined()
    })
    test('eventChangeQuestionInput else', () => {
        expect(eventChangeQuestionInput()).toBeUndefined()
    })
})
describe('initLocalStorage', () => {
    test('initLocalStorage', () => {
        expect(initLocalStorage({})).toBeUndefined()
    })
    test('initLocalStorage else', () => {
        expect(initLocalStorage({})).toBeUndefined()
    })
})

describe('eventClickCreateQuestion', () => {
    test('eventClickCreateQuestion', () => {
        expect(eventClickCreateQuestion({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [],
            objYAML: []
        }, {fileFormat: 'JSON', currentTheme: 'ALL'})).toBeUndefined()
    })
    test('eventClickCreateQuestion', () => {
        expect(eventClickCreateQuestion({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [],
            objYAML: []
        }, {fileFormat: 'JSON', currentTheme: 'ALL'})).toBeUndefined()
    })
})
describe('allDataSort', () => {
    test('allDataSort', () => {
        expect(allDataSort([{
            'item': {
                id: '16422444135993',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            }
        }, {
            'item': {
                id: '16422444993593',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            }
        }])).toBeUndefined()
    })
})

describe('addArrayAndFormat', () => {
    test('addArrayAndFormat', () => {
        expect(addArrayAndFormat([{
            id: '16422444135993',
            question: '1',
            theme: 'GIT',
            answer: 'true'
        }, {
            id: '16422444993593',
            question: '1',
            theme: 'GIT',
            answer: 'true'
        }], [], 'JSON')).toEqual([{
            'item': {
                id: '16422444135993',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            },
            fileFormat: 'JSON'
        }, {
            'item': {
                id: '16422444993593',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            },
            fileFormat: 'JSON'
        }])
    })
})

describe('eventClickFilterFormat', () => {
    test('theme ALL', () => {
        expect(eventClickFilterFormat({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [],
            objYAML: []
        }, {fileFormat: 'JSON', currentTheme: 'ALL'})).toBeUndefined()
    })
    test('theme GIT', () => {
        expect(eventClickFilterFormat({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [],
            objYAML: []
        }, {fileFormat: 'JSON', currentTheme: 'GIT'})).toBeUndefined()
    })
    test('XML', () => {
        expect(eventClickFilterFormat({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [],
            objYAML: []
        }, {fileFormat: 'JSON', currentTheme: 'ALL'})).toBeUndefined()
    })
    test('JSON', () => {
        expect(eventClickFilterFormat({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [],
            objYAML: []
        }, {fileFormat: 'JSON', currentTheme: 'ALL'})).toBeUndefined()
    })
    test('ALL', () => {
        expect(eventClickFilterFormat({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [],
            objYAML: []
        }, {fileFormat: 'JSON', currentTheme: 'ALL'})).toBeUndefined()
    })
    test('ALL ', () => {
        expect(eventClickFilterFormat({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [],
            objYAML: []
        }, {fileFormat: 'JSON', currentTheme: 'ALL'})).toBeUndefined()
    })
})

describe('eventClickFilterTheme', () => {
    test('theme ALL', () => {
        expect(eventClickFilterFormat({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [],
            objYAML: []
        }, {fileFormat: 'JSON', currentTheme: 'ALL'})).toBeUndefined()
    })
    test('theme GIT', () => {
        expect(eventClickFilterTheme({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [],
            objYAML: []
        }, {fileFormat: 'JSON', currentTheme: 'GIT'})).toBeUndefined()
    })
    test('XML', () => {
        expect(eventClickFilterTheme({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [],
            objYAML: []
        }, {fileFormat: 'ALL', currentTheme: 'ALL'})).toBeUndefined()
    })
    test('JSON', () => {
        expect(eventClickFilterTheme({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [],
            objYAML: []
        }, {fileFormat: 'CSV', currentTheme: 'ALL'})).toBeUndefined()
    })
    test('ALL', () => {
        expect(eventClickFilterTheme({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [],
            objYAML: []
        }, {fileFormat: 'YAML', currentTheme: 'ALL'})).toBeUndefined()
    })
    test('ALL ', () => {
        expect(eventClickFilterTheme({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [],
            objYAML: []
        }, {fileFormat: 'XML', currentTheme: 'ALL'})).toBeUndefined()
    })
})

describe('eventClickWithoutModal', () => {
    test('eventClickWithoutModal', () => {
        expect(eventClickWithoutModal('', {
            target: {
                classList: {contains: () => true},
                localName: ''
            }
        })).toBeUndefined();
    })
    test('eventClickWithoutModal while', () => {
        expect(eventClickWithoutModal('', {
            target: {
                classList: {contains: () => false},
                localName: '',
                parentNode: {classList: {contains: () => true}, localName: ''}
            }
        })).toBeUndefined();
    })
    test('eventClickWithoutModal if', () => {
        expect(eventClickWithoutModal('', {
            target: {
                classList: {contains: () => false},
                localName: '',
                parentNode: {classList: {contains: () => false}, localName: 'body'}
            }
        })).toBeUndefined();
    })
})

describe('eventConfirm', () => {
    test('eventConfirm', () => {
        expect(eventConfirm()).toBeUndefined()
    })
})

describe('deleteByIdFromFormat', () => {
    test('CSV', () => {
        expect(deleteByIdFromFormat({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [{
                id: '1642244413593',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            }, {
                id: '1642244413593',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            }],
            objYAML: []
        }, 1642244413593, 'CSV')).toBeUndefined();
    })
    test('JSON', () => {
        expect(deleteByIdFromFormat({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [{
                id: '1642244413593',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            }, {
                id: '1642244413593',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            }],
            objYAML: []
        }, 1642244413593, 'JSON')).toBeUndefined();
    })
    test('XML', () => {
        expect(deleteByIdFromFormat({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [{
                id: '1642244413593',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            }, {
                id: '1642244413593',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            }],
            objYAML: []
        }, 1642244413593, 'XML')).toBeUndefined();
    })
    test('YAML', () => {
        expect(deleteByIdFromFormat({
            objJSON: {'01': []},
            objXML: {'questions': {'block': []}},
            objCSV: [{
                id: '1642244413593',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            }, {
                id: '1642244413593',
                question: '1',
                theme: 'GIT',
                answer: 'true'
            }],
            objYAML: []
        }, 1642244413593, 'YAML')).toBeUndefined();
    })
})

describe('eventClickDeleteQuestion', () => {
    test('eventClickDeleteQuestion', () => {
        expect(eventClickDeleteQuestion({}, {
            target: {
                classList: {
                    contains() {
                        return false
                    }
                }
            }
        })).toBeUndefined()
    })
    test('eventClickDeleteQuestion', () => {
        expect(eventClickDeleteQuestion({}, {
            target: {
                classList: {
                    contains() {
                        return true
                    }
                }, parentNode: {
                    parentNode:
                        {
                            lastChild: {lastChild: {innerText: ''}},
                            getAttribute() {
                                return true;
                            }
                        }
                }
            }
        })).toBeUndefined()
    })
})

describe('clickConfirm',()=>{
    test('clickConfirm',function () {
        expect(clickConfirm({objCSV:[],objYAML:[],objJSON:{'01':[]},objXML:{questions:{block:[]}}}, 1,'CSV')).toBeUndefined()
    })
})
