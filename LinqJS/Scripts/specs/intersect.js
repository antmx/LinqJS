/// <reference path="../_references.js" />

describe("LinqCore intersect", function () {

	var helper;
	var firstItems;
	var secondItems;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();

		firstItems = [1, 1, 2, 3, 4, 5];
		secondItems = [1, 3, 5, 7];
	});

	it("Produces the set intersection of two lists", function () {

		var result = helper.intersect(firstItems, secondItems);
		var expected = [1, 3, 5];

		expect(result).toEqual(expected);
	});

});
