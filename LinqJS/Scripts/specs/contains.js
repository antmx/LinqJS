/// <reference path="../_references.js" />

describe("LinqHelper contains", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqHelper();

		items = [1, 2, 3];
	});

	it("Returns false when list does not contain value", function () {

		var result = helper.contains(items, 4);

		expect(result).toBeFalsy();
	});

	it("Returns true when list does contain value", function () {

		var result = helper.contains(items, 2);

		expect(result).toBeTruthy();
	});
});
