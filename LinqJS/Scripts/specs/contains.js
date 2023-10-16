/// <reference path="../_references.js" />

describe("linqCore contains", function () {

	var _linqCore;
	var _items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		_items = [1, 2, 3];
	});

	it("Returns false when list does not contain value", function () {

		var result = _linqCore.contains(_items, 4);

		expect(result).toBeFalsy();
	});

	it("Returns true when list does contain value", function () {

		var result = _linqCore.contains(_items, 2);

		expect(result).toBeTruthy();
	});
});
