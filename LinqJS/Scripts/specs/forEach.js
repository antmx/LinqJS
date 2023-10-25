/// <reference path="../_references.js" />

describe("linqCore.forEach", function () {

    var _linqCore;
    var _items;
    var _obj = {
        a: 1,
        b: 2,
        c: 3,
        d: function () { }
    };

    beforeEach(function () {

        _linqCore = new linqJs.linqCore();
        _items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    it("Applies lambda to each array item", function () {

        var arrayToPopulate = [];

        _linqCore.forEach(
            _items,
            function (indexInArray, valueOfElement) { arrayToPopulate.push(valueOfElement * 10); });

        expect(arrayToPopulate.length).toEqual(_items.length);

        for (let idx = 0; idx < _items.length; idx++) {

            expect(_items[idx] * 10).toEqual(arrayToPopulate[idx]);
        }
    });

    it("Applies lambda to each object property", function () {

        var objToPopulate = {};

        _linqCore.forEach(
            _obj,
            function (property, valueOfProperty) {
                objToPopulate[property] = valueOfProperty * 10;
            });

        for (const property in _obj) {
            expect(_obj[property] * 10).toEqual(objToPopulate[property]);
        }
    });

    it("Throws an error for a null itemsOrObject parameter", function () {

        expect(function () {

            _linqCore.forEach(
                null,
                function (property, valueOfProperty) { });

        }).toThrowError("itemsOrObject must be an array or an object instance");

    });

    it("Stops processing when lambda returns false", function () {

        var arrayToPopulate = [];

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

});
