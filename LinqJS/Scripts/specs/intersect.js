/// <reference path="_references.js" />

describe("LinqHelper intersect", function () {

	var helper;
	var firstItems;
	var secondItems;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();

		firstItems = [1, 1, 2, 3, 4, 5];
		secondItems = [1, 3, 5, 7];
	});

	it("Produces the set intersection of two lists", function () {

		var result = helper.intersect(firstItems, secondItems);
		var expected = [1, 3, 5];

		expect(result).toEqual(expected);
	});

});
