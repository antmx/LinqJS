/// <reference path="_references.js" />

describe("LinqHelper union", function () {

	var helper;
	var firstItems;
	var secondItems;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();

		firstItems = [1, 1, 2, 3, 4, 5, 5, 5];
		secondItems = [1, 3, 5, 7, 9, 5, 5, 5, 11, 11, 11, 11, 11];
	});

	it("Produces the set union of two lists, i.e. a list that contains the elements from both lists, excluding duplicates.", function () {

		var result = helper.union(firstItems, secondItems);
		var expected = [1, 2, 3, 4, 5, 7, 9, 11];

		expect(result).toEqual(expected);
	});

});