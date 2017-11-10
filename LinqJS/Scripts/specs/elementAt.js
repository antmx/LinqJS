/// <reference path="../_references.js" />

describe("LinqCore elementAt", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqCore();

		items = [1, 2, 3, 4, 5];
	});

	it("Returns the item at the specified index", function () {

		var result = helper.elementAt(items, 2);
		var expected = 3;

		expect(result).toEqual(expected);
	});

});
