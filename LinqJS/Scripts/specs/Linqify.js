/// <reference path="../_references.js" />

describe("linqify", function () {

    var _items;

    beforeEach(function () {
        _items = [1, 2, 3, 4, 5, 6, 7, 8];
    });

    it("Adds Linq methods to an array", function () {
        debugger;
        linqify(_items);

        expect(_items.where).toBeDefined();
    });

});
