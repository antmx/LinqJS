/// <reference path="../_references.js" />

describe("LinqCore distinct", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();

		items = [1, 2, 3, 1, 3, 4, 4, 5];
	});

	it("Returns unique items", function () {

		var result = helper.distinct(items);
		var expected = [1, 2, 3, 4, 5];

		expect(result.length).toEqual(5);
		expect(result).toEqual(expected);
	});

});
