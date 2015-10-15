/// <reference path="_references.js" />

describe("LinqHelper all", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Returns true when all match", function () {
		var result = helper.all(
			items,
			function (i) { return i <= 8 });

		var expected = true;

		expect(result).toEqual(expected);
	});

	it("Returns false when not all match", function () {
		var result = helper.all(
			items,
			function (i) { return i <= 7 });

		var expected = false;

		expect(result).toEqual(expected);
	});

});
