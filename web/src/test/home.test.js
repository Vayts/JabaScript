const {initHome,validateImg, validateInputs, fillState,checkEditError, imgLoad, collectInputsValue, startPostProcess, startEdit,cancelEdit} = require('../script/home')
global.alert= jest.fn(() =>
    Promise.resolve(true)
);

jest.mock('../script/utils.js', () => {
    const originalModule = jest.requireActual('../script/utils.js');

    //Mock the default export and named export 'foo'
    return {
        __esModule: true,
        ...originalModule,

        getInputValue: jest.fn(() => ''),
        setInputValue: jest.fn(() => true),
        addListener: jest.fn(() => true),
        removeListener: jest.fn(() => true),
        getFileFromInput: jest.fn('')
            .mockReturnValueOnce('')
            .mockReturnValueOnce('')
            .mockReturnValueOnce('')
            .mockImplementationOnce(() => {return {name:'image.png'}})
            .mockReturnValueOnce('')
            .mockReturnValueOnce('')
            .mockReturnValueOnce('dd'),
        toggleDisabledClass: jest.fn(() => true),
        setSrcValue: jest.fn(() => true),
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

describe('test function validateInputs',()=>{
    test('name length more than 25',() =>{
        expect(validateInputs({
            name: "Pablo Diego José Francisco de Paula Juan Nepomukeno Crispin Crispiano de la Santisima Trinidad Ruiz and Picasso",
            position: "Team Lead",
            height: 182,
            age: 39,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })
    test('name length less than 4',()=>{
        expect(validateInputs({
            name: "Yan",
            position: "Team Lead",
            height: 18239,
            age: 39,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })
    test('name has forbidden characters',()=>{
        expect(validateInputs({
            name: "Tomas&Shellby",
            position: "Team Lead",
            height: 182,
            age: 39,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })

    test('position length more than 20',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Chief Executive Officer Pro Max Ultra 3000 plus",
            height: 182,
            age: 39,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })
    test('position length less than 4',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Pro",
            height: 182,
            age: 39,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })
    test('position has forbidden characters',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team&Lead",
            height: 182,
            age: 39,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })

    test('height more than 240',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 245,
            age: 39,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })
    test('height less than 100',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 99,
            age: 39,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })

    test('age more than 100',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 101,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })
    test('age less than 16',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 15,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })

    test('eyeColor length more than 20',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 39,
            eyeColor: "gray-brown-crimson-yellow-white",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })
    test('eyeColor length less than 3',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 39,
            eyeColor: "bk",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })
    test('eyeColor has forbidden characters',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 39,
            eyeColor: "red&blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })

    test('Age minus Experience less than 16',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 23,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })
    test('Experience less than 0',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 39,
            eyeColor: "red&blue",
            exp: 0,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })

    test('mother Tongue length more than 15',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 39,
            eyeColor: "blue",
            exp: 10,
            motherTongue: "Cocos Islands Malay",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })
    test('mother Tongue length less than 5',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 39,
            eyeColor: "blue",
            exp: 10,
            motherTongue: "ukr",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })
    test('mother Tongue has forbidden characters',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 39,
            eyeColor: "blue",
            exp: 10,
            motherTongue: "russian&ukrainian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })

    test('place Of Birth length more than 30',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 39,
            eyeColor: "blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Azpilicuetagaraycosaroyarenberecolarrea",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })
    test('place Of Birth length less than 3',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 39,
            eyeColor: "blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Kh",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })
    test('place Of Birth has forbidden characters',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 39,
            eyeColor: "blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Vancouver$",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness."
        })).toEqual(false);
    })

    test('hobby length more than 171',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 39,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "My hobby is dancing, as it gives me joy and happiness. My hobby is dancing, as it gives me joy and happiness.My hobby is jumping, as it gives me joy and happiness.My hobby is singing, as it gives me joy and happiness."
        })).toEqual(false);
    })
    test('hobby length less than 3',()=>{
        expect(validateInputs({
            name: "Nikita Bezdelnikov",
            position: "Team Lead",
            height: 182,
            age: 39,
            eyeColor: "Blue",
            exp: 10,
            motherTongue: "Russian",
            placeOfBirth: "Horlivka",
            hobby: "ne"
        })).toEqual(false);
    })
})

describe('ImgLoad', () => {
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
    test('ImgLoad with  empty Input File', () => {
        expect(imgLoad(state)).toBe(false)
    })
    test('ImgLoad with   Input File', () => {
        expect(imgLoad(state)).toBe(true)
    })
})

describe('startPostProcess', () => {
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
    test('Post with empty file', () => {
        expect(startPostProcess(state)).toEqual('Post without photo')
    })
    test('Post with file', () => {
        expect(startPostProcess(state)).toEqual('Post with photo')
    })
})

describe('startPostProcess', () => {
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
    test('Post with empty input file', () => {
        expect(collectInputsValue(state)).toEqual({"age": 0, "exp": 0, "eyeColor": "", "height": 0, "hobby": "", "motherTongue": "", "name": "", "placeOfBirth": "", "position": ""})
    })
})


describe('initHome',()=>{
    test('initHome',()=>{
        expect(initHome()).toBeUndefined();
    })
})

describe('startEdit',()=>{
    test('startEdit',()=>{
        expect(startEdit(0,{
            url: 'http://localhost:3050',
            currentProfile: 0,
            lastDeveloperData: [{}]
        })).toEqual([]);
    })
})

describe('cancelEdit',()=>{
    test('cancelEdit',()=>{
        expect(cancelEdit()).toBeUndefined();
    })
})
