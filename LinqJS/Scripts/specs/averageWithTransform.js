/// <reference path="../_references.js" />



	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
		_items = [2, 4, 6, 8];
	});

	test("Calculates the average of the items after transforming each", function () {

		var result = _linqCore.averageWithTransform(
			_items,
			function (i) { return i * 10; });

		var expected = 50;

		expect(expected).toEqual(result);
	});
