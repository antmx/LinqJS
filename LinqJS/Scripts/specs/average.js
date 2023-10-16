/// <reference path="../_references.js" />

describe("linqCore average", function () {

	var _linqCore;
	var items;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();
		items = [2, 4, 6, 8];
	});

	it("Calculates the average of the items", function () {

		var result = _linqCore.average(items);

		var expected = 5;

		expect(expected).toEqual(result);
	});

});
