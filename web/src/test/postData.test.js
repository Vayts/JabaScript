const {postDataDevelopers, postDataPhoto} = require('../script/postData')

jest.mock('../script/getData.js', () => {
    const originalModule = jest.requireActual('../script/getData.js');

    //Mock the default export and named export 'foo'
    return {
        __esModule: true,
        ...originalModule,

        getDataDevelopers: jest.fn()

    };
});

jest.mock('../script/utils.js', () => {
    const originalModule = jest.requireActual('../script/utils.js');

    //Mock the default export and named export 'foo'
    return {
        __esModule: true,
        ...originalModule,

        setBackgroundImage: jest.fn( () => true)

    };
});

global.fetch = jest.fn(() =>
    Promise.resolve({
        text: () => '',
        json: () => ''
    })
);

describe('PostDataDevelopers', () => {
    test('test post method', () => {
        expect(postDataDevelopers({url: 'http://localhost:3050',
            currentProfile: 0,
            lastDeveloperData: []})).toBeUndefined()
    })
})

describe('PostDataPhoto', () => {
    test('test post photo method', () => {
        expect(postDataPhoto({url: 'http://localhost:3050',
            currentProfile: 0,
            lastDeveloperData: [{
            photo: '123'
            }]}, {name: 'img.zip'}, false)).toBeUndefined()
    })
    test('test post photo method wight true temp', () => {
        expect(postDataPhoto({url: 'http://localhost:3050',
            currentProfile: 0,
            lastDeveloperData: [{
                photo: '123'
            }]}, {name: 'img.zip'}, true)).toBeUndefined()
    })
})