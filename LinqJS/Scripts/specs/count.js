/// <reference path="../_references.js" />

describe("linqCore count", function () {

	var _linqCore;
	var items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		items = [1, 2, 3];
	});

	it("Returns correct number of items in list", function () {

		var result = _linqCore.count(items);

		expect(result).toEqual(3);
	});
});
