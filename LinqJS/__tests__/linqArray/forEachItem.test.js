/// <reference path="../../Scripts/linqArray/linqArray.js" />

const linqArray = require('../../Scripts/linqArray/linqArray');

/**
 * @type {linqArray}
 */
let _items;

let _obj = {
    a: 1,
    b: 2,
    c: 3,
    d: function () { }
};

beforeEach(function () {
    _items =new linqArray( [1, 2, 3, 4, 5, 6, 7, 8])        ;
});

test("Applies function to each array item", function () {

    let arrayToPopulate = [];
    let runFunc = function (indexInArray, valueOfElement) { arrayToPopulate.push(valueOfElement * 10); };

    _items.forEachItem(runFunc);

    expect(arrayToPopulate.length).toEqual(_items.length);

    for (let idx = 0; idx < _items.length; idx++) {

        expect(_items[idx] * 10).toEqual(arrayToPopulate[idx]);
    }
});

test("Applies mock function to each array item", function () {

    let arrayToPopulate = [];
    let mockRunFunc = jest.fn((indexInArray, valueOfElement) => { arrayToPopulate.push(valueOfElement * 10); });

    _items.forEachItem(mockRunFunc);

    expect(mockRunFunc.mock.calls).toHaveLength(_items.length);

    expect(arrayToPopulate.length).toEqual(_items.length);

    for (let idx = 0; idx < _items.length; idx++) {

        expect(_items[idx] * 10).toEqual(arrayToPopulate[idx]);
    }
});

test("Applies function to each string character", function () {

    let str = "abc";
    let strToPopulate = [];
    let mockRunFunc = jest.fn((idx, valueAtIdx) => {
        strToPopulate[idx] = valueAtIdx.toUpperCase();
    });

    let stringArray = new linqArray(str);

    stringArray.forEachItem(mockRunFunc);

    expect(mockRunFunc.mock.calls).toHaveLength(str.length);

    for (const property in str) {

        expect(str[property].toUpperCase()).toEqual(strToPopulate[property]);
    }
}); 

test("Stops processing when function returns false", function () {

    let arrayToPopulate = [];

    _items.forEachItem(
        function (indexInArray, valueOfElement) {
            if (valueOfElement <= 4) {
                arrayToPopulate.push(valueOfElement * 10);
                return true;
            }

            return false; // To exit forEach early
        });

    expect(arrayToPopulate.length).toEqual(4);

    for (let idx = 0; idx < arrayToPopulate.length; idx++) {

        expect(_items[idx] * 10).toEqual(arrayToPopulate[idx]);
    }
});
