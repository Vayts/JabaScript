const {validateImg, validateInputs, fillState,checkEditError} = require('../script/home')

jest.mock('../script/utils.js', () => {
    const originalModule = jest.requireActual('../script/utils.js');

    //Mock the default export and named export 'foo'
    return {
        __esModule: true,
        ...originalModule,

        getInputValue: jest.fn(() => true),
        setInputValue: jest.fn(() => true),
        addListener: jest.fn(() => true),
        removeListener: jest.fn(() => true),
        getFileFromInput: jest.fn(() => ''),
        toggleDisabledClass: jest.fn(() => true),
        setBackgroundImage: jest.fn(() => true),
        getValueLocalStorage: jest.fn(() => true),
        createElement: jest.fn(() => true),
        getNodeChecked: jest.fn(() => true),
        setNodeChecked: jest.fn(() => true),
        clearTempFiles: jest.fn()
    };
});

jest.mock('../script/postData.js', () => {
    const originalModule = jest.requireActual('../script/postData.js');

    //Mock the default export and named export 'foo'
    return {
        __esModule: true,
        ...originalModule,

        postDataDevelopers: jest.fn(),
        postDataPhoto: jest.fn()
    };
});

jest.mock('../script/getData.js', () => {
    const originalModule = jest.requireActual('../script/getData.js');

    //Mock the default export and named export 'foo'
    return {
        __esModule: true,
        ...originalModule,

        getDataDevelopers: jest.fn(),
    };
});

describe('fillState', () => {
    const state = {
        currentProfile: 0,
        lastDeveloperData: [{
            photo: "http://127.0.0.1:3050/photo/1642239457247developerPhoto.jpg",
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 189,
            age: 39,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        }]
    }

    test('state, [1,2,3,4,5,6,7,8,9]', () => {
        expect(fillState(state, [1,2,3,4,5,6,7,8,9])).toEqual({
            currentProfile: 0,
            lastDeveloperData: [{
                photo: "http://127.0.0.1:3050/photo/1642239457247developerPhoto.jpg",
                name: 1,
                position: 2,
                height: 3,
                age: 4,
                eyeColor: 5,
                exp: 6,
                motherTongue: 7,
                placeOfBirth: 8,
                hobby: 9
            }]
        })
    })
})

describe('validateImg', () => {
    test('incorrect file', () => {
        expect(validateImg('test.zip')).toEqual(false)
    })
    test('incorrect file', () => {
        expect(validateImg('test.jpg.zip')).toEqual(false)
    })
    test('incorrect file', () => {
        expect(validateImg(null)).toEqual(false)
    })
    test('incorrect file', () => {
        expect(validateImg('1')).toEqual(false)
    })
    test('correct file', () => {
        expect(validateImg('test.png')).toEqual(true)
    })
    test('correct file', () => {
        expect(validateImg('test.zip.png')).toEqual(true)
    })
})

describe('checkEditError', () => {
    const state = {
        currentProfile: 0,
        lastDeveloperData: [{
            photo: "http://127.0.0.1:3050/photo/1642239457247developerPhoto.jpg",
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 189,
            age: 39,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        }]
    }

    test('error', () => {
        expect(checkEditError(state, {
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 189,
            age: 39,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toBe(true)
    })
    test('error', () => {
        expect(checkEditError(state, {
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 18239,
            age: 39,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toBe(false)
    })
})

