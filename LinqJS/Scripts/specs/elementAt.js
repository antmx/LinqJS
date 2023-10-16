/// <reference path="../_references.js" />

describe("linqCore elementAt", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		_items = [1, 2, 3, 4, 5];
	});

	it("Returns the item at the specified index", function () {

		var result = _linqCore.elementAt(_items, 2);
		var expected = 3;

		expect(result).toEqual(expected);
	});

});
