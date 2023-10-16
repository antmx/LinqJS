/// <reference path="../_references.js" />

describe("linqCore intersect", function () {

	var _linqCore;
	var firstItems;
	var secondItems;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		firstItems = [1, 1, 2, 3, 4, 5];
		secondItems = [1, 3, 5, 7];
	});

	it("Produces the set intersection of two lists", function () {

		var result = _linqCore.intersect(firstItems, secondItems);
		var expected = [1, 3, 5];

		expect(result).toEqual(expected);
	});

});
