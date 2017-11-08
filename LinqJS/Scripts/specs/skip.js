/// <reference path="../_references.js" />

describe("LinqHelper skip", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new LinqJS.LinqHelper();

		items = [59, 82, 70, 56, 92, 98, 85];
	});

	it("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == -1", function () {

		var result = helper.skip(items, -1);
		var expected = [];

		expect(result).toEqual(expected);
	});

	it("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == 0.", function () {

		var result = helper.skip(items, 0);
		var expected = [];

		expect(result).toEqual(expected);
	});

	it("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count == 1.", function () {

		var result = helper.skip(items, 1);
		var expected = [82, 70, 56, 92, 98, 85];

		expect(result).toEqual(expected);
	});

	it("Bypasses a specified number of elements in a sequence and then returns the remaining elements - count > list length.", function () {

		var result = helper.skip(items, 100);
		var expected = [];

		expect(result).toEqual(expected);
	});

});
