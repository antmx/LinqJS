/// <reference path="../_references.js" />

describe("linqCore average", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
		_items = [2, 4, 6, 8];
	});

	it("Calculates the average of the items", function () {

		var result = _linqCore.average(_items);

		var expected = 5;

		expect(expected).toEqual(result);
	});

});
