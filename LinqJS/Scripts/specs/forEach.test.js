/// <reference path="../linqJs/linq-core.js" />

const linqCoreModule = require('../linqJs/linq-core');

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

test("Applies lambda to each array item", function () {

    let arrayToPopulate = [];
    let mockLambda = jest.fn((indexInArray, valueOfElement) => { arrayToPopulate.push(valueOfElement * 10); });

    _linqCore.forEach(
        _items,
        //function (indexInArray, valueOfElement) { arrayToPopulate.push(valueOfElement * 10); }
        mockLambda
    );

    expect(mockLambda.mock.calls).toHaveLength(_items.length );

    expect(arrayToPopulate.length).toEqual(_items.length);

    for (let idx = 0; idx < _items.length; idx++) {

        expect(_items[idx] * 10).toEqual(arrayToPopulate[idx]);
    }
});

test("Applies lambda to each object property", function () {

    let objToPopulate = {};

    _linqCore.forEach(
        _obj,
        function (property, valueOfProperty) {
            objToPopulate[property] = valueOfProperty * 10;
        });

    for (const property in _obj) {
        expect(_obj[property] * 10).toEqual(objToPopulate[property]);
    }
});

test("Throws an error for a null itemsOrObject parameter", function () {

    expect(function () {

        _linqCore.forEach(
            null,
            function (property, valueOfProperty) { });

    }).toThrowError("itemsOrObject must be an array or an object instance");

});

test("Stops processing when lambda returns false", function () {

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
