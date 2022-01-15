const {getDataCSV,getDataJSON,getDataXML,getDataYAML,getDataDevelopers} = require('../script/getData')
global.fetch = jest.fn(() =>
    Promise.resolve({
        text: () => '',
        json:()=>''
    })
);
describe('getDataCSV', function () {
    test('promise',function () {
        return getDataCSV({}).then((data)=>{
            expect(data).toBe(true);
        })
    })
})
describe('getDataJSON', function () {
    test('promise',function () {
        return getDataJSON({}).then((data)=>{
            expect(data).toBe(true);
        })
    })
})
describe('getDataXML', function () {
    test('promise',function () {
        return getDataXML({}).then((data)=>{
            expect(data).toBe(true);
        })
    })
})
describe('getDataYAML', function () {
    test('promise',function () {
        return getDataYAML({}).then((data)=>{
            expect(data).toBe(true);
        })
    })
})
