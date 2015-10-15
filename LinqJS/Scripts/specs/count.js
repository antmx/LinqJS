/// <reference path="_references.js" />

describe("LinqHelper count", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();

		items = [1, 2, 3];
	});

	it("Returns correct number of items in list", function () {

		var result = helper.count(items);

		expect(result).toEqual(3);
	});
});
