/// <reference path="../_references.js" />

describe("linqCore min", function () {

	var _linqCore;
	var items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		items = [1, 1, 2, 5, 4, 5, 5, 2, 2];
	});

	it("Returns the minimum value in a list", function () {

		var result = _linqCore.min(items);
		var expected = 1;

		expect(result).toEqual(expected);
	});

});
