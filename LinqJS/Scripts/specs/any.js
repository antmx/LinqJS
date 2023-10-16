/// <reference path="../_references.js" />

describe("linqCore any", function () {

    var _linqCore;
    var _items;

    beforeEach(function () {
        _linqCore = new linqJs.linqCore();
        _items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    it("Returns true when there are matching items", function () {
        var result = _linqCore.any(
            _items,
            function (i) { return i % 3 == 0; });

        expect(result).toBeTruthy();
    });

    it("Returns true when there are any items", function () {
        var result = _linqCore.any(
            _items);

        expect(result).toBeTruthy();
    });

    it("Returns false when there are no matching items", function () {
        var result = _linqCore.any(
            _items,
            function (i) { return i > 100; });

        expect(result).toBeFalsy();
    });

    it("Returns false when there are no items", function () {
        var result = _linqCore.any(
            []);

        expect(result).toBeFalsy();
    });

});
