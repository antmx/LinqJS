/// <reference path="../_references.js" />

describe("LinqHelper min", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqHelper();

		items = [1, 1, 2, 5, 4, 5, 5, 2, 2];
	});

	it("Returns the minimum value in a list", function () {

		var result = helper.min(items);
		var expected = 1;

		expect(result).toEqual(expected);
	});

});
