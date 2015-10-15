/// <reference path="_references.js" />

describe("LinqHelper first", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Returns first item", function () {
		var result = helper.first(
			items);

		var expected = 1;

		expect(result).toEqual(expected);
	});

	it("Returns first matching item", function () {
		var result = helper.first(
			items,
			function (i) { return i > 3 });

		var expected = 4;

		expect(result).toEqual(expected);
	});

});
