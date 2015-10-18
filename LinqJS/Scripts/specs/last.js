/// <reference path="_references.js" />

describe("LinqHelper last", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Returns last item", function () {
		var result = helper.last(
			items);

		var expected = 8;

		expect(result).toEqual(expected);
	});

	it("Returns last matching item", function () {
		var result = helper.last(
			items,
			function (i) { return i < 7 });

		var expected = 6;

		expect(result).toEqual(expected);
	});

});
