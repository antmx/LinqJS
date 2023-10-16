/// <reference path="../_references.js" />

describe("linqCore except", function () {

	var _linqCore;
	var firstItems;
	var secondItems;

	beforeEach(function () {
		_linqCore = new linqJs.linqCore();

		firstItems = [1, 2, 2, 3, 4, 5];
		secondItems = [1, 3, 5, 7];
	});

	it("Produces the set difference of two lists", function () {

		var result = _linqCore.except(firstItems, secondItems);
		var expected = [2, 4, 7];

		expect(result).toEqual(expected);
	});

});
