/// <reference path="../_references.js" />

describe("Linqify", function () {

    var helper;
    var items;

    beforeEach(function () {
        helper = new LinqJS.LinqCore();
        items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    it("Adds Linq methods to an array", function () {

        Linqify(items);

        expect(items.Where).toBeDefined();
    });

    describe("Where", function () {

        it("Returns only the matching items", function () {

            Linqify(items);

            var result = items.Where(function (itm) { return itm % 2 === 0; });
            var expected = [2, 4, 6, 8];

            expect(result.length).toEqual(expected.length);

            helper.forEach(result, function (indexInArray, valueOfElement) {

                expect(valueOfElement).toEqual(expected[indexInArray]);
            });
        });

    });

    describe("Sum", function () {

        it("Correctly adds up the numbers", function () {

            Linqify(items);

            var result = items.Sum();
            var expected = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8;

            expect(result).toEqual(expected);

        });

    });

    describe("Max", function () {

        it("Gets the correct maximum", function () {

            Linqify(items);

            var result = items.Max();
            var expected = 8;

            expect(result).toEqual(expected);

        });

    });

    describe("Min", function () {

        it("Gets the correct minimum", function () {
            
            Linqify(items);

            var result = items.Min();
            var expected = 1;

            expect(result).toEqual(expected);

        });

    });

});
