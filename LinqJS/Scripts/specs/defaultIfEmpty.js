/// <reference path="../_references.js" />

describe("LinqCore defaultIfEmpty", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();

		items = [1, 2, 3];
	});

	it("Returns default value when list is empty", function () {

		var result = helper.defaultIfEmpty([], 1);
		var expected = [1];

		expect(result.length).toEqual(1);
		expect(result).toEqual(expected);
	});

	it("Returns list when list is not empty", function () {

		var result = helper.defaultIfEmpty(items, 1);
		var expected = items;

		expect(result.length).toEqual(3);
		expect(result).toEqual(expected);
	});
});
