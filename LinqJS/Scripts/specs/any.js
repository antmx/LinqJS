/// <reference path="~/Scripts/LinqJS/LinqHelper.js" />
/// <reference path="~/lib/jasmine-2.3.4/jasmine.js" />

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

		var expected = true;

		expect(result).toBeTruthy();
	});

	it("Returns false when no matching items", function () {
		var result = helper.any(
			items,
			function (i) { return i > 100 });

		var expected = false;

		expect(result).toBeFalsy();
	});

});
