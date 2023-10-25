/// <reference path="../_references.js" />

describe("linqCore.distinct", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		_items = [1, 2, 3, 1, 3, 4, 4, 5];
	});

	it("Returns unique items", function () {

		var result = _linqCore.distinct(_items);
		var expected = [1, 2, 3, 4, 5];

		expect(result.length).toEqual(5);
		expect(result).toEqual(expected);
	});

});
