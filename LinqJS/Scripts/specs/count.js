/// <reference path="../_references.js" />

describe("LinqCore count", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();

		items = [1, 2, 3];
	});

	it("Returns correct number of items in list", function () {

		var result = helper.count(items);

		expect(result).toEqual(3);
	});
});
