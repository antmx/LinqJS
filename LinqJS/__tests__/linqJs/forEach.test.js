/// <reference path="../../Scripts/linqJs/linq-core.js" />

const linqCoreModule = require('../../Scripts/linqJs/linq-core');

/** @type {linqJs.} */
let _linqCore;
let _items;
let _obj = {
    a: 1,
    b: 2,
    c: 3,
    d: function () { }
};

beforeEach(function () {

    _linqCore = new linqCoreModule();
    _items = [1, 2, 3, 4, 5, 6, 7, 8];
});

test("Applies function to each array item", function () {

    let arrayToPopulate = [];
    let runFunc = function (indexInArray, valueOfElement) { arrayToPopulate.push(valueOfElement * 10); };

    _linqCore.forEach(
        _items,
        runFunc
    );

    expect(arrayToPopulate.length).toEqual(_items.length);

    for (let idx = 0; idx < _items.length; idx++) {

        expect(_items[idx] * 10).toEqual(arrayToPopulate[idx]);
    }
});

test("Applies mock function to each array item", function () {

    let arrayToPopulate = [];
    let mockRunFunc = jest.fn((indexInArray, valueOfElement) => { arrayToPopulate.push(valueOfElement * 10); });

    _linqCore.forEach(
        _items,
        mockRunFunc
    );

    expect(mockRunFunc.mock.calls).toHaveLength(_items.length);

    expect(arrayToPopulate.length).toEqual(_items.length);

    for (let idx = 0; idx < _items.length; idx++) {

        expect(_items[idx] * 10).toEqual(arrayToPopulate[idx]);
    }
});

test("Applies function to each object property", function () {

    let objToPopulate = {};
    let mockRunFunc = jest.fn((property, valueOfProperty) => {
        objToPopulate[property] = valueOfProperty * 10;
    });

    _linqCore.forEach(
        _obj,
        mockRunFunc);

    expect(mockRunFunc.mock.calls).toHaveLength(3); // .a, .b & .c, but not .d()

    for (const property in _obj) {

        if (typeof _obj[property] === "function") {
            continue;
        }

        expect(_obj[property] * 10).toEqual(objToPopulate[property]);
    }
});

test("Applies function to each string character", function () {

    let str = "abc";
    let strToPopulate = [];
    let mockRunFunc = jest.fn((idx, valueAtIdx) => {
        strToPopulate[idx] = valueAtIdx.toUpperCase();
    });

    _linqCore.forEach(
        str,
        mockRunFunc);

    expect(mockRunFunc.mock.calls).toHaveLength(str.length);

    for (const property in str) {

        expect(str[property].toUpperCase()).toEqual(strToPopulate[property]);
    }
});

test("Throws an error for a null itemsOrObject parameter", function () {

    expect(function () {

        _linqCore.forEach(
            null,
            function (property, valueOfProperty) { });

    }).toThrowError("itemsOrObject must be an array or an object instance");

});

test("Stops processing when function returns false", function () {

    let arrayToPopulate = [];

    _linqCore.forEach(
        _items,
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
