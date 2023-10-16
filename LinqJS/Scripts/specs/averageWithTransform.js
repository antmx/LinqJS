/// <reference path="../_references.js" />

describe("linqCore averageWithTransform", function () {

	var _linqCore;
	var items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
		items = [2, 4, 6, 8];
	});

	it("Calculates the average of the items after transforming each", function () {

		var result = _linqCore.averageWithTransform(
			items,
			function (i) { return i * 10; });

		var expected = 50;

		expect(expected).toEqual(result);
	});

});
