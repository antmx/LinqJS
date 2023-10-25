/// <reference path="../_references.js" />

describe("linqCore.max", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		_items = [1, 1, 2, 5, 4, 5];
	});

	it("Returns the maximum value in a list", function () {

		var result = _linqCore.max(_items);
		var expected = 5;

		expect(result).toEqual(expected);
	});

});
