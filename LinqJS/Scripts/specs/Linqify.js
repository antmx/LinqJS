/// <reference path="../_references.js" />

describe("linqify", function () {

    var _linqCore;
    var items;

    beforeEach(function () {
        _linqCore = new linqJs.linqCore();
        items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    it("Adds Linq methods to an array", function () {
        debugger;
        linqify(items);

        expect(items.where).toBeDefined();
    });

    //describe("Where", function () {

    //    it("Returns only the matching items", function () {

    //        linqify(items);

    //        var result = items.where(function (itm) { return itm % 2 === 0; });
    //        var expected = [2, 4, 6, 8];

    //        expect(result.length).toEqual(expected.length);

    //        _linqCore.forEach(result, function (indexInArray, valueOfElement) {

    //            expect(valueOfElement).toEqual(expected[indexInArray]);
    //        });
    //    });

    //});

    //describe("Sum", function () {

    //    it("Correctly adds up the numbers", function () {

    //        linqify(items);

    //        var result = items.sum();
    //        var expected = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8;

    //        expect(result).toEqual(expected);

    //    });

    //});

    //describe("Max", function () {

    //    it("Gets the correct maximum", function () {

    //        linqify(items);

    //        var result = items.max();
    //        var expected = 8;

    //        expect(result).toEqual(expected);

    //    });

    //});

    //describe("Min", function () {

    //    it("Gets the correct minimum", function () {
            
    //        linqify(items);

    //        var result = items.min();
    //        var expected = 1;

    //        expect(result).toEqual(expected);

    //    });

    //});

});
