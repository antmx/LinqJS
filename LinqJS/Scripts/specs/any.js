/// <reference path="_references.js" />

describe("LinqHelper any", function () {

	var helper;
	var items;

	beforeEach(function () {
		helper = new Netricity.LinqJS.LinqHelper();
		items = [1, 2, 3, 4, 5, 6, 7, 8];
	});

	it("Returns true when are matching items", function () {
		var result = helper.any(
			items,
			function (i) { return i % 3 == 0 });

		expect(result).toBeTruthy();
	});

	it("Returns true when any items", function () {
		var result = helper.any(
			items);

		expect(result).toBeTruthy();
	});

	it("Returns false when no matching items", function () {
		var result = helper.any(
			items,
			function (i) { return i > 100 });

		expect(result).toBeFalsy();
	});

	it("Returns false when no items", function () {
		var result = helper.any(
			[]);

		expect(result).toBeFalsy();
	});

});
