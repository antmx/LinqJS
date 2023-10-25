/// <reference path="../_references.js" />



	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		_items = [1, 1, 2, 5, 4, 5, 5, 2, 2];
	});

	test("Returns the minimum value in a list", function () {

		var result = _linqCore.min(_items);
		var expected = 1;

		expect(result).toEqual(expected);
	});
