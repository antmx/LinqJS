/// <reference path="../_references.js" />

describe("linqCore firstOrDefault", function () {

	var _linqCore;
	var items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Returns first item", function () {

		var result = _linqCore.firstOrDefault(items);

		var expected = 1;

		expect(result).toEqual(expected);
	});

    it("Returns first matching item", function () {
        var result = _linqCore.firstOrDefault(
            items,
            function (i) { return i > 3; });

        var expected = 4;

        expect(result).toEqual(expected);
    });

	it("Returns default item", function () {
		var result = _linqCore.firstOrDefault(
			items,
            function (i) { return i > 10; },
			-1);

		var expected = -1;

		expect(result).toEqual(expected);
	});

});
