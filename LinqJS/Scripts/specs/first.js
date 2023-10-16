/// <reference path="../_references.js" />

describe("linqCore first", function () {

	var _linqCore;
	var items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Returns first item", function () {
		var result = _linqCore.first(
			items);

		var expected = 1;

		expect(result).toEqual(expected);
	});

	it("Returns first matching item", function () {
		var result = _linqCore.first(
			items,
			function (i) { return i > 3 });

		var expected = 4;

		expect(result).toEqual(expected);
	});

});
