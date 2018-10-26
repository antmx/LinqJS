/// <reference path="../_references.js" />

describe("LinqCore any", function () {

    var helper;
    var items;

    beforeEach(function () {
        helper = new LinqJS.LinqCore();
        items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    it("Returns true when there are matching items", function () {
        var result = helper.any(
            items,
            function (i) { return i % 3 == 0; });

        expect(result).toBeTruthy();
    });

    it("Returns true when there are any items", function () {
        var result = helper.any(
            items);

        expect(result).toBeTruthy();
    });

    it("Returns false when there are no matching items", function () {
        var result = helper.any(
            items,
            function (i) { return i > 100; });

        expect(result).toBeFalsy();
    });

    it("Returns false when there are no items", function () {
        var result = helper.any(
            []);

        expect(result).toBeFalsy();
    });

});
