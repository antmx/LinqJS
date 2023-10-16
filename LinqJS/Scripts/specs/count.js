/// <reference path="../_references.js" />

describe("linqCore count", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		_items = [1, 2, 3];
	});

	it("Returns correct number of items in list", function () {

		var result = _linqCore.count(_items);

		expect(result).toEqual(3);
	});
});
