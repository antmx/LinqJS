/// <reference path="../_references.js" />

describe("linqCore skip", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		_items = [59, 82, 70, 56, 92, 98, 85];
	});

	it("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == -1", function () {

		var result = _linqCore.skip(_items, -1);
		var expected = [];

		expect(result).toEqual(expected);
	});

	it("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == 0.", function () {

		var result = _linqCore.skip(_items, 0);
		var expected = [];

		expect(result).toEqual(expected);
	});

	it("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == 1.", function () {

		var result = _linqCore.skip(_items, 1);
		var expected = [82, 70, 56, 92, 98, 85];

		expect(result).toEqual(expected);
	});

	it("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count > list length.", function () {

		var result = _linqCore.skip(_items, 100);
		var expected = [];

		expect(result).toEqual(expected);
	});

});
